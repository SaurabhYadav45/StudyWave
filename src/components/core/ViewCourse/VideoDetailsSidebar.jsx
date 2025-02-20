import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"

import IconBtn from "../common/IconBtn"

const VideoDetailsSidebar = ({setReviewModal}) => {

  const{courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
  } = useSelector((state) => state.viewCourse || [])

  const navigate = useNavigate()
  const location = useLocation()

  const[activeStatus, setActiveStatus] = useState("")
  const[videoBarActive, setVideoBarActive] = useState("")
  const{sectionId, subSectionId} = useParams()

  useEffect(() =>{
    ;(async() =>{
      if(!courseSectionData.length) return;
      const currentSectionIdx = courseSectionData.findIndex((section) => section._id === sectionId)

      const currentSubSectionIdx = courseSectionData?.[currentSectionIdx]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData?.[currentSectionIdx]?.subSection?.[currentSubSectionIdx]?._id

      setActiveStatus(courseSectionData?.[currentSectionIdx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseEntireData, courseSectionData, location.pathname])

  return (
    <div className='hidden sm:flex flex-col w-[320px] max-w-[350px] h-[calc(100vh-3.5rem)] border-r-[1px] border-r-richblack-700 bg-richblack-800'>
      <div className='mx-5 justify-between flex flex-col gap-2 gap-y-4 font-bold text-richblack-25 py-5 text-lg border-b border-richblack-600'>
        {/* Back icon & Review Modal */}
        <div className='flex justify-between items-center w-full'>
          <div onClick={() => navigate("/dashboard/enrolled-courses")} title="back"
               className='text-richblack-700 bg-richblack-100 rounded-full flex items-center justify-center w-[35px] h-[35px] hover:scale-90'
            >
            <IoIosArrowBack size={30} />
          </div>
          <IconBtn
            text = "Add Review"
            onclick = {() => setReviewModal(true)}
            customClasses = "ml-auto"
          />
        </div>
        <div className='flex flex-col'>
          <p className=' text-richblack-5 font-bold'>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length/totalNoOfLectures}</p>
        </div>
      </div>

      <div className='h-[calc(100vh-5rem)] overflow-y-auto'>
        {courseSectionData?.map((section, idx) => (
          <div key={idx} className="mt-2 cursor-pointer text-sm text-richblack-5"
          onClick={() => setActiveStatus(activeStatus === section?._id ? null : section?._id)}
          >
            {/* Section */}
            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
              <div className="w-[70%] font-semibold">{section?.sectionName}</div>
              <div className='flex items-center gap-3'>
                <span className={`${activeStatus === section?._id ? "rotate-180" : "rotate-0"} transition-all duration-500`}>
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* SubSection */}
            {activeStatus === section?._id && (
              <div className='transition-[height] ease-in-out duration-500'>
                {section?.subSection.map((topic, idx)  => (
                  <div key={idx}
                    className={`px-5 py-2 gap-3 flex ${
                      videoBarActive === topic._id 
                      ? "bg-yellow-200 text-richblack-800 font-semibold"
                      : "hover:bg-richblack-900"}`}
                    onClick={() => {
                      navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                      setVideoBarActive(topic?._id)
                    }}
                  >
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoDetailsSidebar