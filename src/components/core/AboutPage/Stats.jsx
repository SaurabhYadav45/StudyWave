import React from 'react'


const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
  ];


const StatsComponent = () => {
  return (
    <div className='bg-richblack-700'>
        <div className='flex flex-wrap lg:w-11/12 justify-around text-white mx-auto px-10 py-10'>
            {
                Stats.map((data, index) => {
                    return(
                        <div index={index} className='flex flex-col items-center justify-center'>
                            <h1 className='text-richblack-5 text-[30px] font-bold'>{data.count}</h1>
                            <h2 className='text-richblack-5  text-[16px]'>{data.label}</h2>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default StatsComponent