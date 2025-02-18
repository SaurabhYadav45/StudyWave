import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


import {setStep, setCourse, setEditCourse} from "../../../../../slices/courseSlice"
import {createSection, updateSection} from "../../../../../services/operations/courseDetailAPI"
import NestedView from './NestedView'

const CourseBuilderForm = () => {

    const{
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    } = useForm()

    const{token} = useSelector((state) => state.auth)
    const{course} = useSelector((state) => state.course)
    const[editSectionName, setEditSectionName] = useState(null)
    const[loading, setLaoding] = useState(false)
    const dispatch = useDispatch();

    // CancelEditHandler
    const cancelEdit = () =>{
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    // handleChangeEditSectionName
    const handleChangeEditSectionName = (sectionId, sectionName) =>{
        if(editSectionName == sectionId){
            cancelEdit()
            return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

    // Next Button
    const goToNext = () =>{
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one section")
            return
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please add atleast one lecture in each section")
            return
        }
        dispatch(setStep(3))
    }
    
    // Go back button
    const goBack = () =>{
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }

    // OnSubmit Handler
    const onSubmit = async(data) =>{
        setLaoding(true)
        let result 
        if(editSectionName){
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId : editSectionName,
                courseId : course._id,
            }, token)
        }
        else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId: course._id,
            }, token)
        }
        // console.log("Just above setCourse Result :", result)
        if(result){
            // console.log("section result", result)
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue("sectionName", "")
        }
        setLaoding(false)
    }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="sectionName">Section Name<sup className='text-pink-200'>*</sup></label>
                <input 
                type="text" 
                id='sectionName'
                disabled={loading}
                placeholder='Add a section to build your course'
                {...register("sectionName", {required:true})}
                className='form-style w-full'
                />
                {errors.sectionName && (
                    <span className='text-xs ml-2 tracking-wide text-pink-200'>
                        Section name is required
                    </span>
                )}
            </div>

            <div className="flex items-end gap-x-4">
                <IconBtn
                type="submit"
                disabled={loading}
                text={editSectionName ? "Edit Section Name" : "Create Section"}
                outline={true}
                >
                    <IoAddCircleOutline size={20} className="text-yellow-50"/>
                </IconBtn>
                {editSectionName && (
                    <button type='button' onClick={cancelEdit} 
                    className='text-sm text-richblack-300 underline'>Cancel Edit</button>
                )}
            </div>
        </form>
        {/* {console.log("COURSE :", course)} */}
        {course.courseContent.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )}

        {/* Back and Next Button */}
        <div className="flex justify-end gap-x-3">
            <button onClick={goBack} 
            className='flex gap-x-2 rounded-md items-center cursor-pointer text-richblack-900 bg-richblack-300 py-[8px] px-[20px] font-semibold'>
                Back
            </button>
            <IconBtn disabled={loading} text={"Next"} onclick={goToNext}>
                <MdNavigateNext/>
            </IconBtn>
        </div>
    </div>
  )
}

export default CourseBuilderForm