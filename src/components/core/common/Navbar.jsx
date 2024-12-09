import React from 'react'
// import { useState, useEffect } from 'react'
import logo  from "../../../assets/Logo/StudyWave Org.png"

import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from "../../../data/navbar-links"

import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'

import { apiConnector } from '../../../services/apiConnector'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import ProfileDropdown from '../Auth/ProfileDropdown'


const Navbar = () => {

    const{token} = useSelector((state) => state.auth)
    const{totalItems} = useSelector((state) => state.cart)
    const{user} = useSelector((state) => state.profile)

    const location = useLocation();

    const matchRoute = (route) =>{
        return matchPath({path: route}, location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            
            {/* Logo */}
            <Link to="/">
                <img src={logo} alt="" width={160} height={42} loading='lazy'/>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:block">
                <ul className="flex gap-x-6 text-richblack-25">
                    {
                        NavbarLinks.map((link, index) => {
                            return(
                                <li key={index}>
                                    {
                                        link?.title === "Catalog" ? 
                                        (
                                            <div className={`group relative flex cursor-pointer items-center gap-1  ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                                <p className='text-richblack-25'>{link?.title}</p>
                                                <BsChevronDown />
                                            </div>
                                        ) : 
                                        (
                                            <Link to ={link?.path} 
                                                className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}
                                            >
                                                <p>{link?.title}</p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>

            {/* Login/Signup/dashboard*/}
            <div className='flex items-center gap-x-4'>
                {
                    user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to ="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className='text-2xl text-richblack-100'/>
                            { totalItems > 0 && (
                                <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )
                }

                {/* Login */}
                {
                    token === null &&(
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 rounded-[8px] px-[12px] py-[8px] text-richblack-100'>Log in</button>
                        </Link>
                    )
                }

                {/* Signup */}
                {
                    token === null &&(
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 rounded-[8px] px-[12px] py-[8px] text-richblack-100'>Sign up</button>
                        </Link>
                    )
                }

                {/* Profile */}
                {token !== null && <ProfileDropdown/>}
            </div>

            <button className="mr-4 md:hidden">
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>
        </div>
    </div>
  )
}

export default Navbar