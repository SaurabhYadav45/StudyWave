import React from "react"
// import { useState } from "react";
import './App.css';

// import { Link } from "react-router-dom";
import {Route, Routes}  from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact"
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
        {/*<Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} /> */}

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
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
