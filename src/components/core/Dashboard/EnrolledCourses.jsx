import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProgressBar from "@ramonak/react-progress-bar";

import {getUserEnrolledCourses} from "../../../services/operations/ProfileAPI"

const EnrolledCourses = () => {

  const {token} =useSelector((state)=> state.auth);
  const navigate = useNavigate()

  const[enrolledCourses, setEnrolledCourses] = useState(null);

  useEffect(() => {
    (async ()=>{
      try {
        const response = await getUserEnrolledCourses(token)
        // console.log("enroledCourses Response : ", response)
        //Filter the courses which are published
        const filterPublishCourse = response.filter((course) => course.status !== "Draft")
        setEnrolledCourses(filterPublishCourse)

      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    }) ()
  }, []);

  return (
    <>
    <div>Enrolled Courses</div>
    { !enrolledCourses ? (
      <div>
        <div className='spinner'></div>
      </div>
    ) : enrolledCourses.length === 0 ? (
      <p>You have not enrolled in any course yet.</p>
    ) : (
      <div>
        <div className='text-richblack-5 font-bold flex justify-around'>
          <p>Course Name</p>
          <p>Duration</p>
          <p>Progress</p>
        </div>
        { enrolledCourses.map((course, idx, arr) => {
          return (
            <div key={idx} className={`flex items-center border border-richblack-700 
            ${
                idx === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`}>
              {/* Course name */}
              <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}>
                <img src={course.thumbnail} alt="course_name" className='h-14 w-14 rounded-lg object-cover'/>
                <div className='flex flex-col gap-2'>
                  {/* Name */}
                  <p className='font-semibold text-richblack-25'>{course.courseName}</p>
                  {/* descriuption */}
                  <p className='text-xs text-richblack-100'>{course.courseDescription.length > 50 ? 
                  `${course.courseDescription.slice(0, 50)}...` : course.courseDescription}</p>
                </div>
              </div>

              {/* Course Duration */}
              <div className='w-1/4 px-2 py-3 text-richblack-5'>{course.totalDuration}</div>

              {/* Course Progress */}
              <div className='flex flex-col gap-2 px-2 py-3 w-1/5 text-richblack-25'>
                <p>Progress : {course.progressPercentage || 50}%</p>
                <ProgressBar
                completed = {course.progressPercentage || 50}
                isLabelVisible = {false}
                height = "8px"
                />
              </div>
            </div>
          )
        })}
      </div>
    )}
    </>
  )
}

export default EnrolledCourses