import React, { useEffect, useState } from 'react'
import Error from './Error'

import Course_Slider from '../components/core/Catalog/Course_Slider'

import { categories } from '../services/apis'
import { apiConnector } from '../services/apiConnector'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {getCatalogPageData} from "../services/operations/PageAndComponentData"

import Footer from "../components/core/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'

const Catalog = () => {

    const{catalogName} = useParams()
    const{loading} = useSelector((state)=> state.profile)
    const[categoryId, setCategoryId] = useState("")
    const[active, setActive] = useState(1)
    const[catalogPageData, setCatalogPageData] = useState(null)


    //fetch category id 
    useEffect(()=>{
        (async()=>{
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API)
                // console.log(res)
                const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
                console.log("CategoryId :", category_id)
                setCategoryId(category_id)
            } catch (error) {
                console.log("Could Not Fetch Categories")
            }
        })()
    }, [catalogName])

    useEffect(() =>{
        if(categoryId){
            (async()=>{
                try {
                    const res = await getCatalogPageData(categoryId)
                    setCatalogPageData(res)
                    console.log("CatelogPageData response", res)
                } catch (error) {
                    console.log("Error in fetching CatelogPageData")
                    console.log(error)
                }
            })()
        }
    },[categoryId])

    if(loading || !catalogPageData){
        return(
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if(!loading && !catalogPageData.success){
        return <Error/>
    }

  return (
    <>
    {/* Hero section */}
      <div className='flex items-center justify-center bg-richblack-800'>
        <div className='w-11/12 flex flex-col min-h-[260px] max-w-maxContentTab gap-4 lg:max-w-maxContent justify-center'>
            <p className="text-sm text-richblack-300">
                {`Home/Catalog/`}
                <span className='text-yellow-25'>
                    {catalogPageData?.data?.selectedCategory?.name}
                </span>
            </p>
            {/* Category Name */}
            <p className='text-richblack-5 text-3xl'>{catalogPageData?.data?.selectedCategory?.name}</p>
            {/* category Description */}
            <p className='text-richblack-200 max-w-[870px]'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
      </div>

      {/* Section-1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className='w-11/12 section_heading'> Courses to get you started
            <div className='my-4 flex boredr-b border-b-richblack-600 text-sm'>
                <p className={` py-2 ${
                    active === 1 ? 
                    "text-yellow-25  border-b border-b-yellow-25" :
                     "text-richblack-50"} 
                     cursor-pointer`}
                     onClick={() =>setActive(1)}>Most Popular
                </p>
                <p
                    className={`px-4 py-2 ${
                    active === 2
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(2)}
                >
                    New
                </p>
            </div>
             <div className='my-6' >
                <Course_Slider courses={catalogPageData?.data?.selectedCategory?.courses}/>
            </div>
        </div>
      </div>
      
      {/* Section-2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Similar to {catalogPageData?.data?.selectedCategory?.name}
        </div>
        <div className="py-8">
          <Course_Slider
            courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* section-3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {catalogPageData?.data?.selectedCategory?.courses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>
      {/* <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div> */}
      {/* Footer */}
      <Footer></Footer>
    </>
  )
}

export default Catalog