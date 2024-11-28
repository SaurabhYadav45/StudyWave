import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa';

const InstructorSection = () => {
  return (
    <div className=' flex flex-col lg:flex-row gap-20 items-center w-9/12 content-between'>
        <div className='w-[50%] '>
            <img src={Instructor} alt="" className='shadow-white shadow-[-20px_-20px_0_0]' />
        </div>
        <div className='lg:w-[50%] flex gap-5 flex-col'>
            <h1 className='lg:w-[50%] text-4xl font-semibold'>Become an
                <HighlightText text={"Instructor"}></HighlightText>
            </h1>
            <p className='font-medium text-richblack-300 w-[80%] text-[12px] text-justify'>Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className='w-fit mt-10'>
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex gap-2 items-center'>
                    Start Teaching Today
                    <FaArrowRight></FaArrowRight>
                </div>
            </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection