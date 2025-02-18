import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

const ChipInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {

  const{course, editCourse} = useSelector((state) => state.course)
  const[chips, setChips] = useState([])

  useEffect(() => {
    if(editCourse){
      setChips(course?.tag)
    }
    register(name, {required:true, validate:(value) => value.length > 0})
  }, [])

  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  const handleKeyDown = (event) =>{
    if(event.key === 'Enter' || event.key === ','){
      event.preventDefault()

      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      // Check if the input value exists and is not already in the chips array
      if(chipValue && !chips.includes(chipValue)){
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  const handleDeleteChip = (chipIndex) =>{
    const updatedChips = chips.filter((_, index) => index !== chipIndex)
    setChips(updatedChips)
  }

  // const handleDeleteChip = (idx) =>{
  //   const updatedChips = [...chips]
  //   updatedChips.splice(idx, 1)
  //   setChips(updatedChips)
  // }

  return (
    <div className='flex flex-col space-y-2'>
      {/* Render the label */}
      <label htmlFor={name} className="text-sm text-richblack-5">{label}<sup className='text-pink-200'>*</sup></label>
      
      {/* Render the Chip value */}
      <div className='flex flex-wrap w-full gap-y-2'>
        {chips.map((chip, idx) => (
          <div key={idx} className='m-1 flex items-center bg-yellow-400 px-2 py-1 text-sm rounded-full text-richblack-5'>
            {chip}
            {/* Render the button to delete the chip value */}
            <button type='button' className='ml-2 focus:outline-none'
            onClick={() => handleDeleteChip(idx)}>
              <MdClose className="text-sm"/>
            </button>
          </div>
        ))}

        {/* Render the input for adding new chips */}
        <input 
        type="text" 
        name={label}
        id={label}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="form-style w-full"
        />
      </div>
      {errors[name] && (
        <span className='ml-2 text-xs tracking-wide text-pink-200'>
          {label} is required
        </span>
      )}
    </div>
  )
}

export default ChipInput