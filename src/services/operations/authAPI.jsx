import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints

// SendOTP 
export function sendOtp(email, navigate){
  return async (dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent:true,
      })
      console.log("SEND OTP RESPONSE : ", response);
      console.log(response.data.success);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR");
      toast.error("Could not send OTP")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

// signup
export function signup(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate,
) {
    return async(dispatch) =>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))

      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        })

        console.log("SIGNUP RESPONSE: ", response);
        console.log(response.data.success)

        if(!response.data.success){
          throw new Error(response.data.message)
        }

        toast.success("Signup successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR")
        toast.error("Signup failed")
        navigate("/signup")
      }

      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }

// login
export function login(email, password, navigate){
  return async (dispatch) =>{
    const toastId = toast.loading("Loading....")
    dispatch(setLoading(true));

    try {
      console.log("Just above Login response")
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password
      });
      console.log("Login API Response........... :", response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Login successfully");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/9.x/initials/svg?seed=${response.data.user.firstName}%20${response.data.user.lastName}`

      // console.log("Below UserImage")

      dispatch(setUser({...response.data.user, image : userImage}))

      // console.log("Below setUser")

      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      // console.log("Below setToken.... ")

      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............")
      toast.error("Login failed")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


// getPasswordResetToken
export function getPasswordResetToken (email, setEmailSent){
  return async (dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatchEvent(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})
      console.log("RESETPASSWORD TOKEN RESPONSE............ : ", response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Reset email sent successfully")
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSWORDTOKEN ERRROR..............");
      toast.error("Failed to send reset email")
     }
     toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token , navigate){
  return async(dispatch) =>{
    const toastId = toast.loading("Loading....")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("Reset Password Response..........", response)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............")
      toast.error("Failed to reset password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


export function logout(navigate){
    return (dispatch) =>{
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Loged Out")
      navigate("/")
    }
}