import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
import IconBtn from "./IconBtn";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo/StudyWave Org.png"

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

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
      <div
        className={`bg-richblack-800 fixed top-0 right-0 h-full w-48 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg p-5`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <X size={28} />
        </button>
        <div className="mt-12 space-y-6 flex flex-col items-center">
          <IconBtn text="Login"
          onclick={() =>{
            setIsOpen(false)
            navigate("/login")
          }}
          />
          <IconBtn text="Signup"
          onclick={() => {
            setIsOpen(false)
            navigate("/signup")
          }} 
          />
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

              <Link to={"/catalog/web-development"}>
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
