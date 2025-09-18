import toast from "react-hot-toast";

import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import {apiConnector} from "../apiConnector"
import {courseEndpoints} from "../apis"


const{
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    DELETE_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    COURSE_CATEGORIES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    COURSE_DETAILS_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints


// add Course Detail
export const addCourseDetails = async(data, token)=>{
    let result 
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })

        // console.log("CREATE COURSE API RESPONSE..............", response)
        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error("Could Not Add Course Detail")
    }
    toast.dismiss(toastId)
    return result
}

//Update Course details
export const editCourseDetails = async(data, token)=>{
    let result = null
    const toastId = toast.loading("...Loading")
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            Authorization : `Bearer ${token}`
        } )

        // console.log("EDIT COURSE API RESPONSE...........", response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        toast.error("Could not Updated Course Detail")
        console.error("EDIT COURSE API ERROR............", error)
    }
    toast.dismiss(toastId)
    return result
}

// delete a Course
export const deleteCourse = async(data, token) =>{
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization : `Bearer ${token}`
        })

        // console.log("DELETE COURSE API RESPONSE.......", response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Course Deleted Successfully")

    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error)
        toast.error("Could not Delete Course, Try Again")
    }
    toast.dismiss(toastId)
}


// Create a section
export const createSection = async(data, token) =>{
    let result
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization : `Bearer ${token}`,
        })

        // console.log("CREATE COURSE API RESPONSE........", response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.success("Section Created Successfully")
        result = response?.data?.updatedCourseDetails
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error)
        toast.error("Could not Create section")
    }
    toast.dismiss(toastId)
    return result
}


// Update Section 
export const updateSection = async(data, token) =>{
    let result
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization : `Bearer ${token}`,
        })

        // console.log("UPDATE COURSE API RESPONSE........", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }

        toast.success("Section Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error("Could not Update section")
    }
    toast.dismiss(toastId)
    return result
}


// create Subsection
export const createSubSection = async(data, token)=>{
    let result
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization : `Bearer ${token}`,
        })
        // console.log("Response subsection", response)

        // console.log("CREATE SUBSECTION API RESPONSE.......", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Lecture Added")
        result = response?.data?.updatedSection
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error)
        toast.error("Could not Add Lecture")
    }
    toast.dismiss(toastId)
    return result
}


// Update SubSection
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      // console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.updatedSection
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error("Could not Update Lectures")
    }
    toast.dismiss(toastId)
    return result
  }


// Delete a Section
export const deleteSection = async(data, token) =>{
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization : `Bearer ${token}`
        })

        // console.log("DELETE SECTION API RESPONSE.........", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Section Deleted Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error)
        toast.error("Could not Delete Section")
    }
    toast.dismiss(toastId)
    return result
}


// delete SubSection
export const deleteSubSection = async (data, token) => {
    let result= null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      // console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error(response.data.message)
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error("Could not Delete Lecture, Try Again")
    }
    toast.dismiss(toastId)
    return result
  }
  


// fetching all courses under a specific instructor
export const fetchInstructorCourses = async(token) =>{
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API,null, {
            Authorization : `Bearer ${token}`
        })

        // console.log("FETCH INSTRUCTOR COURSE API RESPONSE......", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response?.data?.data
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const fetchCourseCategories = async() =>{
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        // console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}


// fetchCourseDetails
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      })
      // console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error?.response
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }


  // get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        console.log("Course Id at API:",courseId);
        const response=await apiConnector("GET",GET_FULL_COURSE_DETAILS_AUTHENTICATED,null,{
            Authorization: `Bearer ${token}`
          },{courseId:courseId});

        // console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }
      result = response?.data?.data
      // console.log("Result :....", result)
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error?.response?.data
    //   toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result
  }


  // create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      // console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }


  // mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      // console.log(
      //   "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      //   response
      // )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }




