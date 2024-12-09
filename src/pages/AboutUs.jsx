import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'

import BannerImg1 from "../assets/Images/aboutus1.webp"
import BannerImg2 from "../assets/Images/aboutus2.webp"
import BannerImg3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"

import Quote from '../components/core/AboutPage/Quote'
import StatsComponent from "../components/core/AboutPage/Stats"
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from ".././components/core/common/Footer"

const AboutUs = () => {
  return (
    <div>
        {/* Section-1 */}
        <section className='bg-richblack-700 pt-16 pb-10'>
            <div className='flex flex-col items-center justify-center gap-4 w-11/12 mx-auto max-w-maxContent text-center'>
                {/* Heading */}
                <h1 className='text-4xl font-semibold text-richblack-5 lg: w-[70%]'>Driving Innovation in Online Education for a
                    <HighlightText text={"Brighter Future"}></HighlightText>
                </h1>
                {/* Paragraph */}
                <p className='text-base text-center font-medium text-richblack-300 lg:w-[68%]'> Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

                {/* Images */}
                <div className='flex gap-10 mt-10'>
                    <img src={BannerImg1}alt="" />
                    <img src={BannerImg2} alt="" />
                    <img src={BannerImg3} alt="" />
                </div>
            </div>
        </section>

        {/* Section-2 */}
        <section className='border-b border-b-richblack-700'>
            <div className='w-11/12 flex mx-auto justify-center items-center max-w-maxContent text-center my-16'>
                <Quote/>
            </div>
        </section>

        {/* Section-3 */}
        <section>
            <div className='flex flex-col w-11/12 items-center justify-between mx-auto max-w-maxContent'>
                {/* Part-1 */}
                <div className='flex gap-10 justify-between items-center'>
                    <div className='flex flex-col gap-10 my-24 lg:w-[50%] '>
                        <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>Our Founding Story</h1>

                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div>
                        <img src={FoundingStory} alt="" className="shadow-[0_0_20px_0] shadow-[#FC6767]"/>
                    </div>
                </div>
                {/* part-2 */}
                <div className='flex justify-between items-center gap-10'>
                    <div className='flex flex-col gap-10 my-24 w-[40%]'>
                        <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Vision</h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">With this vision in mind, we set out on a journey to create an
                        e-learning platform that would revolutionize the way people
                        learn. Our team of dedicated experts worked tirelessly to
                        develop a robust and intuitive platform that combines
                        cutting-edge technology with engaging content, fostering a
                        dynamic and interactive learning experience.</p>
                    </div>

                    <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                        <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]'>Our Mission</h1>

                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* StatsComponent */}
        <StatsComponent/>

        {/* Section-4 */}
        <section className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white pb-16'>
            <LearningGrid></LearningGrid>
            <ContactFormSection></ContactFormSection>
        </section>

        {/* Section-5 */}
        <Footer/>
    </div>
  )
}

export default AboutUs