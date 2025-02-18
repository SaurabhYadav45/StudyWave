import React from "react"
// import { useState } from "react";
import './App.css';
// AxATUgQ4AEHpx1mI


// import { Link } from "react-router-dom";
import {Route, Routes}  from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact"
import Catalog from "./pages/Catalog";
import { useSelector } from "react-redux";

import Navbar from './components/core/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OpenRoute from "./components/core/Auth/OpenRoute"

import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import Dashboard from "./pages/Dashboard";
import { ACCOUNT_TYPE } from "./utils/constants";

import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Cart from "./components/core/Dashboard/Cart"

import MyCourses from "./components/core/Dashboard/MyCourses"
import AddCourse from "./components/core/Dashboard/AddCourse"
import EditCourse from "./components/core/Dashboard/EditCourse"
import CourseDetails from "./pages/CourseDetails"
import ViewCourse from "./pages/ViewCourse"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Instructor from "./components/core/Dashboard/Instructor";


function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className='w-[100%] overflow-x-hidden  min-h-screen bg-richblack-900 flex flex-col font-inter'>
      {/* Navbar */}
      <Navbar></Navbar>

      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        
          <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

          <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
            <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path = "/dashboard/my-courses" element={<MyCourses/>}/>
              <Route path="/dashboard/add-course" element={<AddCourse/>}/>
              <Route path="/dashboard/instructor" element={<Instructor/>} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
                <ViewCourse/>
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails/>}
              />
            </>
          )}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
