import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { useSelector } from 'react-redux'
import Footer from "../components/core/common/Footer"

const Dashboard = () => {

    const { loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)

    if (profileLoading || authLoading) {
        return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
        )
    }

  return (
    <div>
    <div className='flex min-h-[calc(100vh - 3.5rem)]'>
        <Sidebar/>
        <div className='min-h-[calc(100vh-3.5rem) flex-1 overflow-auto'>
            <div className='w-11/12 mx-auto max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Dashboard



// h-[calc(100vh-3.5rem)]: Sets the height of the element to the full viewport height (100vh) minus 3.5rem. This is often used to account for fixed headers or margins.

// flex-1: Allows the element to grow and take up the remaining space within a flex container.

// overflow-auto: Ensures the element becomes scrollable when its content overflows.