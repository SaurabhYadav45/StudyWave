import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'


const Settings = () => {
  return (
    <>
    <h1>Edit Profile</h1>

    {/* change profile picture */}
    <ChangeProfilePicture/>

    {/* Edit prfile */}
    <EditProfile/>

    {/* Update Password */}
    <UpdatePassword/>

    {/* delete Account */}
    <DeleteAccount/>
    </>
  )
}

export default Settings