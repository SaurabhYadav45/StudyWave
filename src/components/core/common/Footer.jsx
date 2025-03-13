import React from 'react'
import { Link } from 'react-router-dom';
import {FooterLink2} from "../../../data/footer-links"
import { FaTwitter, FaFacebook, FaYoutube, FaGoogle } from 'react-icons/fa';
// Logo
import Logo from "../../../assets/Logo/StudyWave Org.png"

const Footer = () => {

    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]

    const Resources = [
        "Articles",
        "Blogs",
        "Chart Sheet",
        "Code challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces",
    ]

    const Plans = ["Paid memberships", "For students", "Business solutions"];
    const Community = ["Forums", "Chapters", "Events"];
  return (
    <div className='bg-richblack-800'>
      {/* Bottom PART-1 */}
      <div className='flex lg: border-b-richblack-500 lg:flex-row gap-8 justify-center mx-auto py-16 w-11/12'>

        {/* Sectio-1 */}
        <div className='lg:w-[50%] mt-0 flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3'>

          {/* row-1 */}
          <div className='w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0'>
            <img src={Logo} alt=""  className='object-contain'/>
            <h1 className="text-richblack-50 font-semibold text-[16px]" >Company</h1>
            <div className='flex flex-col gap-2 text-richblack-500'>
              {
                ["About", "Careers", "Affiliates"].map((ele, idx) => {
                  return(
                    <div key={idx} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                      <Link to={ele.toLocaleLowerCase()}>{ele}</Link>
                    </div>
                  )
                })
              }
            </div>

            <div className='flex gap-3 text-lg text-richblack-500'>
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
            </div>
          </div>
          
          {/* Row-2 */}
          <div className='flex flex-col' >
            <h1 className='text-richblack-50 font-semibold text-[16px]'>Resources</h1>
            <div className='text-richblack-500'>
              {
                Resources.map((ele, idx) => {
                  return(
                    <div className='text-[14px]  cursor-pointer hover:text-richblack-50 transition-all duration-200 my-2' key={idx}>
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  )
                })
              }
            </div>
            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
            </h1>
            <div className="text-[14px] text-richblack-500 cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
            </div>
          </div>

          {/* Row-3 */}
          <div className=" lg:w-[30%] mb-7 lg:pl-0">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Plans</h1>

            <div  className='flex flex-col gap-2 mt-2 text-richblack-500'>
              {
                Plans.map((element, idx) => {
                  return(
                    <div key={idx} className='text-[14px] text-richblack-500 cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                      {element}
                    <Link to={element.split(" ").join("-").toLowerCase()}></Link>
                    </div>
                  )
                })
              }
            </div>

            <h1 className="text-richblack-50 font-semibold text-[16px]">Community</h1>

            <div className='flex flex-col gap-2 mt-2 text-richblack-500'>
              {
                Community.map((element, idx) => {
                  return(
                    <div key={idx} className='text-[14px] text-richblack-500 cursor-pointer hover:text-richblack-50 transition-all duration-200' >
                      {element}
                      <Link to={element.split(" ").join("-").toLowerCase()}></Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        
        {/* Section-2 */}
        <div className="hidden lg:w-[50%] sm:flex flex-wrap flex-row justify-between pl-3 lg:pl-5 lg:border-r lg:border-b-richblack-500 lg:border-richblack-700 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] text-richblack-500 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
      </div>

      {/* Bottom PART-2 */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="text-center">Made by Saurabh Yadav © 2024 StudyWave</div>
        </div>
      </div>
    </div>
  )
}

export default Footer;