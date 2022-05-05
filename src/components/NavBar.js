import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../static/css/NavBar.scss'
import { useAuth } from '../utils/AuthProvider';

import {BsFillCaretDownFill, BsChevronDown} from 'react-icons/bs'

function NavBar() {

  const [dropDown, setDropDown] = useState(false);

  const redirect = useNavigate();

  const { authUser} = useAuth();

  return (
    <div className='NavBar'>
        <div className="title-navbar">
            NotJira
        </div>

        <input 
          type="text" 
          className='input-search'
          placeholder='Search'/>

        <button
          className="div-user-menu"
          onClick={() => setDropDown(!dropDown)}>
            <img src="" alt="" />
            <div className="username">
              {authUser?.email}
            </div>

            <BsChevronDown className='icon-chevron'/>

            {dropDown && <ProfileDropDown/>}
        </button>

        
    </div>
  )
}

function ProfileDropDown() {
  const redirect = useNavigate();
  const {authUser, logout } = useAuth();

  const handleLogOut = async () => {
    try{
      await logout();
      redirect('/')
    }catch{
      console.log('Failed to log out')
    }
  }

  return(
    <div className='profile-drop-down'>
      <button>
        My Profile
      </button>

      <button
          onClick={handleLogOut}>
            Log Out
        </button>
    </div>
  )
}

export default NavBar