import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import { useDispatch, useSelector } from 'react-redux'
// import VideoDetails from '../components/core/ViewCourse/VideoDetails'

import{setCourseSectionData, setEntireCourseData, setCompletedLectures, setTotalNoOfLectures} from "../slices/viewCourseSlice"

import { getFullDetailsOfCourse } from '../services/operations/courseDetailAPI'


const ViewCourse = () => {

    const[reviewModal, setReviewModal] = useState(false)
    const{token} = useSelector((state) => state.auth)
    const {courseId} = useParams()
    const dispatch = useDispatch()

    useEffect(() =>{
        ;(async() =>{
            const courseData = await getFullDetailsOfCourse(courseId, token)
            console.log("CourseData.....viewCourse : ",courseData)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setEntireCourseData(courseData?.courseDetails))
            dispatch(setCompletedLectures(courseData?.setCompletedVideos))

            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) =>{
                lectures += section?.subsection?.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        })()
    }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
      
    </>
  )
}

export default ViewCourse