import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FaRegStar, FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component";
import RatingStars from '../common/RatingStars'

import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course, Height}) => {

  const[avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

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
              <span className='text-yellow-5 text-lg'>{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount}/>
              <span className="text-richblack-200 text-lg">
                {course?.ratingAndReviews?.length || 0} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs.{course?.price}</p>
        </div>
      </Link>
    </>
  )
}

export default Course_Card