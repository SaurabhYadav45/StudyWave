import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"


import {deleteSection, deleteSubSection} from "../../../../../services/operations/courseDetailAPI"
import{setCourse} from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../common/ConfirmationModal"
import SubsectionModal from './SubsectionModal'

const NestedView = ({handleChangeEditSectionName}) => {

    const{token} = useSelector((state)=> state.auth)
    const{course} = useSelector((state) => state.course)
    const dispatch = useDispatch();

    // States to keep track of mode of modal [add, view, edit]
    const[addSubSection, setAddSubSection] = useState(null)
    const[viewSubSection, setViewSubSection] = useState(null)
    const[editSubSection, setEditSubSection] = useState(null)

    // to keep track of confirmation modal
    const[confirmationModal, setConfirmationModal] = useState(null)


    const handleDeleteSection = async(sectionId) =>{
        const result = await deleteSection({
            sectionId, 
            courseId : course._id,
            token,
        })

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async(subSectionId, sectionId) =>{
        // console.log("subSectionId---> :", subSectionId)
        // console.log("SectionId---> :", sectionId)
        const result = await deleteSubSection({subSectionId, sectionId, token})
        console.log("handleDeletesubSection result :", result)
        if(result){
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }

  return (
    <>
        <div className='rounded-lg bg-richblack-700 p-6 px-8 ' id='nestedViewContainer'>
        {/* {console.log("Just above ", course)}
        {console.log("Just above section map :", course?.courseContent._id)}
        {console.log("Just above subsection map", course?.courseContent[0]?.subSection[0]?._id)} */}
            {course?.courseContent?.map((section) =>(
                <details key={section._id} open>
                    {console.log("section_IDDDDDD", section._id)}
                    {/* SECTION Detail */}
                    <summary className='flex justify-between items-center cursor-pointer border-b-2 border-b-richblack-600 py-2'>
                        {/* Left part */}
                        <div className="flex items-center gap-x-3">
                            <RxDropdownMenu className={`text-2xl text-richblack-50`}/>
                            <p className='font-semibold text-richblack-50'>{section.sectionName}</p>
                        </div>

                        {/* Right Part */}
                        <div className="flex items-center gap-x-3">
                            {/* Edit button */}
                            <button 
                            onClick={() => 
                            handleChangeEditSectionName(
                                section._id,
                                section.sectionName
                            )}>
                                <MdEdit className="text-xl text-richblack-300" />
                            </button>
                            {/* Delete button */}
                            <button 
                            onClick={() => setConfirmationModal({
                                text1 : "Delete this Section?",
                                text2: "All the lectures in this section will be deleted",
                                btn1Text:"Delete",
                                btn2Text:"Cancel",
                                btn1Handler: () => handleDeleteSection(section._id),
                                btn2Handler: () => setConfirmationModal(null)
                            })}
                            >
                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                            </button>
                            <span className="font-medium text-richblack-300">|</span>
                            <AiFillCaretDown className={`text-xl text-richblack-300`}/>
                        </div>
                    </summary>

                    {/*Section Dropdown Content*/}
                    {/* {console.log("Just above subsection :", section.subSection)} */}
                    <div className='px-6 pb-4'>
                        {/* Render All Sub Sections Within a Section */}

                        {section?.subSection?.map((data) => (
                            <div key={data._id} 
                            onClick={() => setViewSubSection(data)}
                            className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'>
                                {console.log("Data IDDDD", data._id)}
                                {/* left-part */}
                                <div className='flex items-center gap-x-3 py-2'>
                                   <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                   <p className="font-semibold text-richblack-50">{data.title}</p>
                                </div>

                                {/* right part */}
                                <div onClick={(e) => e.stopPropagation()} className='flex gap-x-3 items-center'>
                                    {/* Edit button */}
                                    <button 
                                    onClick={() => setEditSubSection({...data, sectionId: section._id})}>
                                        <MdEdit className="text-xl text-richblack-300" />
                                    </button>
                                    {/*delete button */}
                                    <button onClick={() => setConfirmationModal({
                                        text1:"Delete this Sub-Section?",
                                        text2:"This lecture will be deleted",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=> handleDeleteSubSection(data._id, section._id),
                                        btn2Handler:() => setConfirmationModal(null)
                                    })}>
                                        <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Add New Lecture to Section */}
                        <button
                            onClick={() => setAddSubSection(section._id)}
                            className="mt-3 flex items-center gap-x-1 text-yellow-50"
                        >
                            <FaPlus className="text-lg" />
                            <p>Add Lecture</p>
                        </button>
                    </div>
                </details>
            ))}
        </div>

        {/* Modal Display */}
        {addSubSection ? (
            <SubsectionModal
            modalData ={addSubSection}
            setModalData={setAddSubSection}
            add={true} 
            />
        ) : viewSubSection ? (
            <SubsectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
            />
        ) : editSubSection ? (
            <SubsectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
            />
        ) : (
            <></>
        )}
        {/* Confirmation Modal */}
        {confirmationModal ? (
            <ConfirmationModal modalData={confirmationModal}/>
        ) : (
            <></>
        )}
    </>
  )
}

export default NestedView