import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import { FaRegStar, FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component";

import RatingStars from '../common/RatingStars'

const Course_Card = ({course, Height}) => {

  const[avgReviewCount, setAvgReviewCount] = useState(0)

  

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        {/* Thumbnail  */}
        <div className='rounded-lg transition-transform duration-300 hover:scale-105'>
            <img 
            src={course.thumbnail} 
            alt="" 
            className={`${Height}w-full object-cover rounded-xl`}
            />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 my-6">
            <p className='text-xl text-richblack-5'>{course?.courseName}</p>
            <p className='text-[16px] text-richblack-50'>By  
              <span className='text-[16px] text-yellow-50'>{" "}{course?.instructor?.firstName} {course?.instructor?.lastName}</span>
            </p>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-5 text-lg'>{avgReviewCount || 0}</span>
              <RatingStars review_count={avgReviewCount}/>
              <span className="text-richblack-200 text-lg">
                {course?.ratingAndReviews?.length || 4} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs.{course?.price}</p>
        </div>
      </Link>
    </>
  )
}

export default Course_Card