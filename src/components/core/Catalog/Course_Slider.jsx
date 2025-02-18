import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper React component
import{Swiper, SwiperSlide} from "swiper/react"


// Import swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'



// Import Required module

import Course_Card from "./Course_Card"

const Course_Slider = ({courses}) => {
  // console.log("COURSES :", courses)
  return (
    <>
      {courses?.length ? (
        <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={25}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ 
          clickable: true,
        }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          1025:{
              slidesPerView:3
          },
        }
        }
        className="max-h-[30rem] "
        >
            {courses?.map((course, idx) => (
                <SwiperSlide key={idx} className='text-white'>
                    <Course_Card course={course} Height={"h-[250px]"} />
                </SwiperSlide>
            ))}
        </Swiper>
      ) : (<p className='text-xl text-richblack-5'>No Courses Found</p>)}
    </>
  )
}

export default Course_Slider