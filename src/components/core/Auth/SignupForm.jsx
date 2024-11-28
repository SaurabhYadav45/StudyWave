import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'



const SignupForm = () => {

  const [formData, setFormData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
  })

  const[showPassword, setShowPassword] = useState(false)
  const[showConfirmPassword, setShowConfirmPassword] = useState(false)
  const[passAlert, setPassAlert] = useState("");

  // const { firstName, lastName, email, password, confirmPassword } = formData

  const onChangeHandler = (e) =>{
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name] : e.target.value,
    }))
    // if(e.target.name === password && e.target.value.length < 8){
    //   setPassAlert("Must be 8")
  }

  // Handle Form Submission
  const onSubmitHandler = (e) => {
    e.preventDefault()
    //const password = {password};
    if(password.length < 8){
      setPassAlert('Password must be of at least eight characters')
      return
    }
    
    // if (password !== confirmPassword) {
    //   toast.error("Passwords Do Not Match")
    //   return
    // }

    // const signupData = {
    //   ...formData,
    //   accountType,
    // }

    // Setting signup data to state
    // To be used after otp verification
    // dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    // dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
     })
    // setAccountType(ACCOUNT_TYPE.STUDENT)
    }

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={onSubmitHandler} className="flex w-full flex-col gap-y-4">
        {/* Name */}
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name <sup className='text-pink-200'>*</sup></p>

            <input
            required 
            type="text"
            name= "firstName"
            value= {FormData.firstName} 
            onChange={onChangeHandler}
            placeholder='Enter first name'
            className="form-style w-full"
            />
          </label>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name<sup className='text-pink-200'>*</sup></p>

            <input 
            required
            type="text"
            name = "lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder='Enter last name'
            className="form-style w-full"
             />
          </label>
        </div>

        {/* Email */}
        <label className='w-full'>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className='text-pink-200'>*</sup></p>

          <input 
          required
          type="text"
          name = "email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder='Enter email address'
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          className="form-style w-full"
           />
        </label>

        {/* Password */}
        <div className="flex gap-x-4">
          {/* Create Password */}
          <label className='relative'>
            <p className= "mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Passwoed<sup className='text-pink-200'>*</sup></p>

            <input 
            required
            type= {showPassword ? "text" : "password"}
            name='password'
            value={formData.password}
            onChange={onChangeHandler}
            placeholder='Enter Password'
            className="form-style w-full !pr-10"
            />

            <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
              {
                showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
              }
            </span>
          </label>

          {/* Confirm Password */}
          <label className='relative'>
            <p className= "mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Passwoed<sup className='text-pink-200'>*</sup></p>

            <input 
            required
            type="text" 
            name='confirmPasword'
            value={formData.confirmPassword}
            onChange={onChangeHandler}
            placeholder='Confirm Password'
            className="form-style w-full !pr-10"
            />

            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
              {
                showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
              }
            </span>
          </label>
        </div>

        {/* Button */}
        <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Create Account</button>

      </form>
    </div>
  )
}

export default SignupForm