import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course: null,
    step: 1,
    editCourse: false,
    paymentLoading: false,
}

const courseSlice = createSlice({
    name : "course",
    initialState,
    reducers:{
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false
          },
    }
})

export const{resetCourseState} = courseSlice.actions;
export default courseSlice.reducer;