import React from 'react'
import { RiEditBoxLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import IconBtn from "../common/IconBtn"
import { useNavigate } from 'react-router-dom'
import { formattedDate } from '../../../utils/dateFormatter'

const MyProfile = () => {

  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate();

  return (
    <>
      {/*Profile  Title : MY profile */}
      <h1 className='mb-14 text-3xl font-medium text-richblack-5'>My Profile</h1>

      {/* User Name, Prfile Picture, Email */}
      <div className='flex items-center flex-col sm:flex-row sm:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8'>
        <div className='flex  items-center gap-x-4'>
          <img src={user?.image} alt={`profile-${user?.firstName}`}
          className='aspect-square w-[50px] lg:w-[78px] object-cover rounded-full'/>

          <div className='space-y-1'>
            <p className='text-lg font-semibold text-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
            <p className='text-sm text-richblack-300 text-wrap'>{user?.email}</p>
          </div>
        </div>

        {/* Edit profile button */}
        <IconBtn text="Edit" onclick={() => {navigate("/dashboard/settings")}}>
          <RiEditBoxLine/>
        </IconBtn>
      </div>

      {/* About */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      
      {/* Personal Details */}
      <div className='my-10 flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 gap-y-10 p-8'>
        {/* heading and Button */}
        <div className='flex   lg:justify-between w-full'>
          <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
          <IconBtn text={"Edit"} onclick={()=> {navigate("/dashboard/settings")}}>
            <RiEditBoxLine/>
          </IconBtn>
        </div>

        {/* Additional Detail */}
        <div className='flex flex-col sm:flex-row max-w-[500px] justify-between'>
          {/* part-1 */}
          <div className='flex flex-col gap-y-5'>
            <div>
              <p className='text-richblack-200 text-sm mb-2'>First Name</p>
              <p className='text-sm font-medium text-richblack-5'>{`${user?.firstName ? user?.firstName : "Student"}`}</p>
            </div>

            <div>
              <p className='text-richblack-200 text-sm mb-2'>Email</p>
              <p className='text-sm font-medium text-richblack-5'>{`${user?.email ? user?.email : "Add Email"}`}</p>
            </div>

            <div>
              <p className='text-richblack-200 text-sm mb-2'>Gender</p>
              <p className='text-sm font-medium text-richblack-5'>{`${user?.additionalDetails?.gender ? user?.additionalDetails?.gender : "Add Gender"}`}</p>
            </div>
          </div>

          {/* Part-2 */}
          <div className='flex flex-col gap-y-5'>
            <div>
              <p className='text-richblack-200 text-sm mb-2'>Last Name</p>
              <p className='text-sm font-medium text-richblack-5'>{`${user?.lastName ? user?.lastName : "Add Last Name"}`}</p>
            </div>

            <div>
              <p className='text-richblack-200 text-sm mb-2'>Phone Number</p>
              <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>

            <div>
              <p className='text-richblack-200 text-sm mb-2'>Date of Birth</p>
              <p className='text-sm font-medium text-richblack-5'>{formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date of Birth"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile