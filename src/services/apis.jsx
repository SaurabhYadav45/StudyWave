const BASE_URL = process.env.REACT_APP_BASE_URL   //deployed backend base url

// Auth Endpoints
export const endpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  }

//ContactUs Endpoints
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }

// Settings EndPoints
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API : BASE_URL + "/profile/changepassword",
    DELETE_PASSWORD_API: BASE_URL + "/profile/deleteProfile",
}