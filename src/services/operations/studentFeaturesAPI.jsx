import { toast } from "react-hot-toast"

import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints

// Load the Razorpay SDK from CDN
function loadScript(src){
    return new Promise((resolve, reject) => {
        const script  = document.createElement("script")
        script.src = src
        script.onload = () => resolve(true)
        script.onerror= () => reject(new Error(`Failed to load script: ${src}`))
        document.body.appendChild(script)
    })
}

// Buy the Course
export async function BuyCourse(
    token,
    courses,
    user_details,
    navigate,
    dispatch
){
    const toastId = toast.loading("Loading...")
    try {
        // Loading the script of Razorpay SDK
        // This script loads the Razorpay payment gateway, which is required to process payments.
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            toast.error(
              "Razorpay SDK failed to load. Check your Internet Connection."
            )
            return
        }

        // Initializing the order in Backend
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {courses},
            {Authorization: `Bearer ${token}`}
        )

        if(!orderResponse?.data?.success){
            throw new Error(orderResponse?.data?.message)
        }

        // console.log("PAYMENT RESPONSE FROM BACKEND...........", orderResponse)

        // Opening the Razorpay SDK
        // console.log("KEY", process.env.REACT_APP_RAZORPAY_KEY)
        const options = {
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse?.data?.data?.currency,
            amount: `${orderResponse?.data?.data?.amount}`,
            order_id: orderResponse?.data?.data?.id,
            name:"StudyWave",
            description:"Thank you for Purchasing the Course",
            image:rzpLogo,
            prefill:{
                name:`${user_details?.firstName} ${user_details?.lastName}`,
                email:user_details?.email
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse?.data?.amount, token)
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            },
        }

        const paymentObjet = new window.Razorpay(options)
        paymentObjet.open()
        paymentObjet.on("payment.failed", function(response){
            toast.error("OOPs! Payment Failed.")
            console.log(response.error)
        })
    } catch (error) {
        console.log("PAYMENT API ERROR............", error)
        toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId)
}


// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`
        })

        // console.log("Verify Payment Response From Backend.........", response)

        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        toast.success("Payment Successful. You're Added to the Course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("Payment Verify Error......", error)
        toast.error("Couldn't Verify the Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}


async function sendPaymentSuccessEmail(response, amount, token) {
    try {
      await apiConnector(
        "POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    } catch (error) {
      console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }
  }
  