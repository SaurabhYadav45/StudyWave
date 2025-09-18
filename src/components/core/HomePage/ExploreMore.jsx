import React, { useState } from 'react'
import HighlightText from './HighlightText'
import CourseCard from "./CourseCard";
import {HomePageExplore} from "../../../data/homepage-explore"


const ExploreMore = () => {

    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",
      ];

      const [currentTab, setCurrentTab] = useState(tabsName[0])
      const[courses, setCourses] = useState(HomePageExplore[0].courses)
      const[currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

      const setMyCards=(value)=>{
        // console.log("Value of SetMyCards :",value)
        setCurrentTab(value)
        const result = HomePageExplore.filter((course) => course.tag === value)
        // console.log("Result : ", result)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
      }

  return (
    <div>
        <div>
            <div className='text-4xl font-semibold text-center my-8'>Unlock the 
                <HighlightText text={"Power of Code"}></HighlightText>
                <p className='className="text-center text-richblack-300 text-sm font-light mt-1'>Learn to build anything you can imagine</p>
            </div>

            <div className='hidden lg:flex gap-5 -mt-5 mb-4 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                {
                    tabsName.map((tab, index) =>{
                        return(
                            <div key={index} onClick={() =>setMyCards(tab)} 
                            className={`text-[16px] flex flex-row items-center gap-2 
                            ${currentTab == tab ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} 
                            px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}>
                                {tab}
                            </div>
                        )
                    })
                }
            </div>

            <div className="hidden lg:block lg:h-[200px]"></div>

            <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                {
                    courses.map((course, index) =>{
                        return(
                            <CourseCard
                            key={index}
                            cardData={course}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                             ></CourseCard>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ExploreMore