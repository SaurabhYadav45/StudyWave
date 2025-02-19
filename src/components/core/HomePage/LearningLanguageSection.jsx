import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-3xl font-semibold mt-4'>
      Your swiss knife for
      <HighlightText text = {"learning any language"}></HighlightText>
      </div>

      <div className='text-richblack-700 text-center font-semibold mx-auto text-sm leading-6 lg:w-[75%] mt-3'>
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className='flex gap-2 justify-center items-center'>
        <img src={know_your_progress} alt="" className='object-contain w-[25%]  '/>

        <img src={compare_with_others} alt="" className='object-contain w-[25%] '/>

        <img src={plan_your_lessons} alt="" className='object-contain w-[25%] '/>
      </div>

      <div>
        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>
      </div>
    </div>
  )
}

export default LearningLanguageSection