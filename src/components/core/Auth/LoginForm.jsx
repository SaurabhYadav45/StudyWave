import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom"

const LoginForm = () => {

    const[formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    // const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }))
    }

  return (
    <div>
        <form action="">
            {/* Email */}
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className="text-pink-200">*</sup></p>
                <input
                 required
                 type="text"
                 name="email"
                 value={formData.email}
                 onChange={handleOnChange}
                 placeholder='Enter email address'
                 className="form-style w-full"
                 />
            </label>

            {/* Password */}
            <label className="relative">
                <p>Password<sup className="text-pink-200">*</sup></p>
                
                <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10"
                />

                <span onClick={() => setShowPassword((prev) => !prev)}  className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                    {
                        showPassword ? 
                        (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                        (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                    }
                </span>
            </label>

            {/* Button */}
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>
        </form>
    </div>
  )
}

export default LoginForm