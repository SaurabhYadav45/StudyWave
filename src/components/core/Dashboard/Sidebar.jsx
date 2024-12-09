import React, { useState } from "react"
import {sidebarLinks} from "../../../data/dashboard-links"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SidebarLink from "./SidebarLink"
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from "../common/ConfirmationModal"
import { logout } from "../../../services/operations/authAPI"

const Sidebar = () => {

    const[confirmationModal, setConfirmationModal] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const{loading:authLoading} = useSelector((state) => state.auth)
    const{user, loading:profileLoading}= useSelector((state) =>state.profile)

    if(profileLoading || authLoading){
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
              <div className="spinner"></div>
            </div>
          )
    }

    return(
        <>
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)] min-w-[220px] border-r-1 border-r-richblack-700 bg-richblack-800 py-10">
            {/* Sidebar Link :My profile, Enrolled courses, cart  */}
            <div className="flex flex-col  ">
                {
                    sidebarLinks.map((link) =>{
                        if(link.type && link.type !== user?.accountType) return null;

                        return(
                                <SidebarLink key={link.id} link = {link} iconName ={link.icon}/>
                        )
                    })
                }
            </div>

            {/* horizontal line */}
            <div className="bg-richblack-700 w-10/12 mx-auto mt-6 mb-6 h-[1px]"></div>

            <div className="flex flex-col">
                {/* setting */}
                <SidebarLink link={{name : "Settings", path : "/dashboard/settings"}} iconName="VscSettingsGear"/>

                {/* Logout Button */}
                <button className="px-8 py-2 text-sm font-medium text-richblack-50"
                onClick={() => setConfirmationModal({
                    text1:"Are you sure",
                    text2:"You will be logged out of your account.",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null)
                })} >
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg"/>
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
    )
}

export default Sidebar