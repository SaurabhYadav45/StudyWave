import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
// import IconBtn from "./IconBtn";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo/StudyWave Org.png"
import { useSelector } from "react-redux";

import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from 'react-icons/bs'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import ProfileDropdown from '../Auth/ProfileDropdown'
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const{user} = useSelector((state) => state.profile)
  const{token} = useSelector((state) => state.auth)
  const{totalItems} = useSelector((state) => state.cart)

  const sideBarRef = useRef(null)
  useOnClickOutside(sideBarRef, () => setIsOpen(false));

  return (
    <div className="z-[9999] fixed">
      {/* Navbar */}
      <nav className="fixed bg-richblue-800 top-0 left-0 w-full bg-gray-900 p-4 flex justify-between items-center text-white">
      <Link to="/">
        <img src={logo} alt="" width={160} height={42} loading='lazy'/>
      </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      
      {/* Sidebar */}
      <div ref = {sideBarRef}
        className={`bg-richblack-800 fixed top-0 right-0 h-full w-48 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg p-5`}
      >
        <Link
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <X size={28} />
        </Link>
        <div className="mt-12 space-y-6 flex flex-col items-center">

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
                            <button className='border bg-yellow-25 rounded-[8px] px-[12px] py-[8px] text-richblack-900 font-semibold'>Login</button>
                        </Link>
                    )
                }
                

                {/* Signup */}
                {
                    token === null &&(
                        <Link to="/signup" 
                        className='border border-richblack-700 bg-yellow-25 rounded-[8px] px-[12px] py-[8px] text-richblack-900 font-semibold'>
                        Signup
                        </Link>
                    )
                }

                {/* Profile */}
                {token !== null && <ProfileDropdown/>}
            </div>

          <hr className="h-[1px] w-full" />
          <div>
            <h2 className="text-lg font-bold text-yellow-25">Courses</h2>
            <ul className="mt-2 space-y-2">
              <Link to={"/catalog/python"}>
                <li className="hover:text-yellow-25 cursor-pointer ">Python</li>
              </Link>

              <Link to={"/catalog/devops"}>
                <li className="hover:text-yellow-25 cursor-pointer">Devops</li>
              </Link>

              <Link to={"/catalog/web-devlopment"}>
                <li className="hover:text-yellow-25 cursor-pointer">Web Development</li>
              </Link>

              <Link to={"/catalog/blockchain"}>
                <li className="hover:text-yellow-25 cursor-pointer">Blockchain</li>
              </Link>

              <Link to={"/catalog/generative-ai"}>
                <li className="hover:text-yellow-25 cursor-pointer">Generative AI</li>
              </Link>
            </ul>
          </div>
          <hr className="h-[1px] w-full" />
          
          <Link to={"/about"}>
            <h2 onClick={() => setIsOpen(false)} className="text-lg font-bold text-yellow-25">About</h2>
            <p onClick={() => setIsOpen(false)} className="text-sm text-gray-300">Learn more about us.</p>
          </Link>

          <Link to={"/contact"}>
            <h2 onClick={() => setIsOpen(false)} className="text-lg font-bold text-yellow-25">Contact Us</h2>
            <p onClick={() => setIsOpen(false)} className="text-sm text-gray-300">Reach out for more info.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
