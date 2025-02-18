
import React, { useState } from 'react'
import{Chart, registerables} from "chart.js"
import { Pie } from "react-chartjs-2"
Chart.register(...registerables)

const InstructorChart = ({courses}) => {

  const[currChart, setCurrChart] = useState("students")

  // generate Random colors
  const generateRandomColors = (numColors) =>{
    const colors= []
    for(let i=0; i < numColors; i++){
      const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartStudentData = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data:courses?.map((course) => course?.studentsEnrolled?.length),
        backgroundColor: generateRandomColors(courses?.length)
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses?.map((course) => course?.courseName),
    datasets:[
      {
        data:courses?.map((course) => course?.studentsEnrolled?.length * course?.price),
        backgroundColor:generateRandomColors(courses?.length)
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
    plugins: {
      legend: {
        position: "right", // Moves labels to the right side vertically
        labels: {
          boxWidth: 20, // Adjust size of legend color box
          padding: 15, // Add spacing between labels
        },
      },
    },
  };

  return (
    <div className='flex flex-col rounded-md bg-richblack-800 lg:w-[750px] p-6 gap-y-4'>
      <div className='flex justify-between items-center'>
        <p className='text-lg font-bold text-richblack-5'>Visualise</p>
        <div>
          {/* button to switch student chart */}
          <button onClick={() => setCurrChart("students")}
            className={`rounded-sm px-3 p-1 transition-all duration-200 ${
              currChart === "students" 
              ? "bg-richblack-700 text-yellow-25" 
              :"text-richblack-25"
            }`}
          >
            Students
          </button>

          {/* button to swith income chart */}
          <button onClick={() => setCurrChart("income")}
            className={`rounded-sm px-3 p-1 transition-all duration-200 ${
              currChart === "income" 
              ? "bg-richblack-700 text-yellow-50"
              : "text-richblack-25"
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      <div className='aspect-square h-[400px] w-[500px] relative mx-auto'>
        <Pie
          data={currChart === "students" ? chartStudentData : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart