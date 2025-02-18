import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InstructorChart from './InstructorDashboard/InstructorChart'
import { Link } from 'react-router-dom'

import { fetchInstructorCourses } from '../../../services/operations/courseDetailAPI'
import { getInstructorData } from '../../../services/operations/ProfileAPI'

const Instructor = () => {

    const[courses, setCourses] = useState([])
    const[InstructorData, setInstructorData] = useState(null)
    const[loading, setLoading] = useState(false)

    const{token} = useSelector((state) => state.auth)
    const{user} = useSelector((state) => state.profile)

    useEffect(() => {
        ;(async() => {
            setLoading(true)
            const instructorApiData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)

            if(instructorApiData?.length) setInstructorData(instructorApiData)

            if(result){
                setCourses(result)
            }
            setLoading(false)
        })()
    }, [])

    const totalAmount = InstructorData?.reduce(
        (acc, current) => acc + current?.totalAmountGenerated, 0
        )

    const totalStudent = InstructorData?.reduce((acc, current) => acc + current?.totalStudentsEnrolled, 0)

  return (
    <div>
        <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-richblack-5'>
                Hi {user?.firstName} 👋
            </h1>
            <p className="font-medium text-richblack-200">
                Let's start something new
            </p>
        </div>

        {/* Pie Chart and Statistic */}
        {loading ? (
            <div className='spinner'></div>
        ) : courses?.length > 0 ? (
            <div>
                <div className='my-4 flex h-[450px]  space-x-4 '>
                    {totalStudent > 0 || totalAmount > 0 ? (
                        <InstructorChart courses={courses}/>
                    ) : (
                        <div className="flex-1 rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">
                                Visualize
                            </p>
                            <p className="mt-4 text-xl font-medium text-richblack-50">
                                Not Enough Data To Visualize
                            </p>
                        </div>
                    )}

                    {/* Total Statistics */}
                    <div className='bg-richblack-800 rounded-md p-5 min-w-[250px] flex flex-col ' >
                        <p className='text-lg text-richblack-5 font-bold'>Statistics</p>
                        <div className='mt-4 space-y-4'>
                            <div>
                                <p className="text-lg text-richblack-200">Total Courses</p>
                                <p className="text-3xl font-semibold text-richblack-50">{courses?.length}</p>
                            </div>
                            <div>
                                <p className="text-lg text-richblack-200">Total Students</p>
                                <p className="text-3xl font-semibold text-richblack-50">{totalStudent}</p>
                            </div>
                            <div>
                                <p className="text-lg text-richblack-200">Total Earnings</p>
                                <p className="text-3xl font-semibold text-richblack-50">{totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='rounded-md bg-richblack-800 p-5'>
                    <div className='flex items-center justify-between p-2'>
                        <p className='text-lg font-bold text-richblack-5'>Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p className='text-yellow-50 text-xs font-semibold'>View All</p>
                        </Link>
                    </div>
                    <div className="my-4 flex items-start space-x-6"> 
                        {courses?.slice(0, 3)?.map((course, idx) => (
                            <div className='w-1/3'>
                                <img src={course?.thumbnail} alt={course?.courseName}
                                className='h-[201px] rounded-md object-cover w-full'
                                />
                                <div className='mt-3 w-full'>
                                    <p className='font-semibold text-sm text-richblack-50'>{course?.courseName}</p>
                                    <div className='flex space-x-2 items-center mt-1'>
                                        <p className='text-xs text-richblack-200 font-medium'>{course?.studentsEnrolled?.length} Students</p>
                                        <p className='text-xs text-richblack-200 font-medium'>|</p>
                                        <p className='text-xs text-richblack-200 font-medium'>Rs. {course?.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        ) : (
            <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                <p className="text-center text-2xl font-bold text-richblack-5">
                    You have not created any courses yet
                </p>
                <Link to="/dashboard/add-course">
                    <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                    Create a course
                    </p>
                </Link>
            </div>
        )}
    </div>
  )
}

export default Instructor