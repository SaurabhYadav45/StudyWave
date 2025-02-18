import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RequirementsField = ({name, label, register, errors, setValue, getValues}) => {

  const{course, editCourse} = useSelector((state) => state.course)
  const[requirement, setRequirement] = useState("")
  const[requirementsList, setRequirementsList] = useState([])

  useEffect(()=>{
    if(editCourse){
      setRequirementsList(course?.instructions)
    }
    register(name, {required:true, validate:(value) => value.length > 0})
  }, [])

  useEffect(()=>{
    setValue(name, requirementsList)
  }, [requirementsList])

  const handleAddRequirement = () =>{
    if(requirement){
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (idx) =>{
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(idx, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={name} className="text-sm text-richblack-5">{label}<sup className='text-pink-200'>*</sup></label>
      <div className='flex flex-col space-y-2 items-start'>
        <input 
        type="text"
        id={name}
        value={requirement}
        className="form-style w-full"
        onChange={(e) => setRequirement(e.target.value)}
        />
        <button type='button' onClick={handleAddRequirement} 
        className="font-semibold text-yellow-50">
          Add
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className='mt-2 list-inside list-disc'>
          
          {requirementsList.map((requirement, idx) =>(
            <li key={idx} className='flex items-center text-richblack-5'>
              <span>{requirement}</span>
              <button type = "button" onClick={() =>handleRemoveRequirement(idx)} 
               className="ml-2 text-xs text-pure-greys-300 ">
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className='text-xs text-pink-200 tracking-wide ml-2'>{label} is required</span>
      )}
    </div>
  )
}

export default RequirementsField