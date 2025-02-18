import React, { useEffect } from 'react'
import {RxCross2} from "react-icons/rx"
import IconBtn from "../common/IconBtn"
import { useSelector } from 'react-redux'
// import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';

import {createRating} from "../../../services/operations/courseDetailAPI"


import { useForm } from 'react-hook-form'

const CourseReviewModal = ({setReviewModal}) => {

  const{token} = useSelector((state) => state.auth)
  const{user} = useSelector((state) => state.profile)
  const{courseEntireData} = useSelector((state) => state.viewCourse)

  const{
    register,
    handleSubmit,
    watch,
    setValue,
    formState:{errors},
  } = useForm()


  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [])


  function ratingChanged(newRating) {
    setValue("courseRating", newRating);
  }

  const onSubmit = async(data)=>{
    await createRating(
      {
        courseId: courseEntireData?._id,
        rating: data.courseRating,
        review: data.courseExperience, 
      },
      token
    )

    setReviewModal(false)
  }

  return (
    <div className='z-[1000] inset-0 bg-white backdrop-blur-sm bg-opacity-10 grid h-screen w-screen place-items-center'>
      <div className='my-10 w-11/12 max-w-[700px] bg-richblak-800 rounded-lg border border-richblack-400'>
        {/* Modal Header */}
        <div className='flex items-center justify-between bg-richblack-700 p-5 rounded-t-lg'>
          <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-6'>
          <div className='flex justify-center items-center gap-x-4'>
            <img src={user?.image} alt={user?.firstName + "profile"} 
            className='aspect-square w-[50px] rounded-full object-cover'/>
            <div>
              <p className='font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</p>
              <p className='text-sm text-richblack-5'>Posting Publicly</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col items-center">
            <StarRatings
              rating={watch("courseRating") || 0}
              starRatedColor="#ffd700"
              changeRating={ratingChanged}
              numberOfStars={5}
              starDimension="24px"
              starSpacing="2px"
              name="rating"
            />

            <div className="flex w-11/12 flex-col space-y-2">
              <label htmlFor="courseExperience" className='text-richblack-5 text-sm'>
                Add Your Experience <span className='text-pink-200'>*</span>
              </label>
              <textarea 
              name="courseExperience" 
              id="courseExperience"
              {...register("courseExperience", {required: true})}
              className="form-style resize-x-none min-h-[130px] w-full"
              ></textarea>
              {
                errors.courseExperience && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">Please Add Your Experience</span>
                )
              }
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button onClick={() => setReviewModal(false)}
              className='flex items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] text-richblack-900 cursor-pointer font-semibold'>
                Cancel
              </button>
              <IconBtn text="submit"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal