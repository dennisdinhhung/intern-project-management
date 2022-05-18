import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../static/css/NavBar.scss'
import { useAuth } from '../utils/AuthProvider';

import { BsFillCaretDownFill, BsChevronDown, BsFillPersonFill, BsDoorOpenFill } from 'react-icons/bs'

function NavBar() {

  const [dropDown, setDropDown] = useState(false);

  const redirect = useNavigate();

  const { authUser } = useAuth();

  const profileRef = useRef();

  useEffect(() => {
    // click outside function
    let handler = (event) => {
      if (!profileRef.current.contains(event.target)){
        setDropDown(false)
      }
    }

    document.addEventListener("click", handler)

    return () => {
      document.removeEventListener("click", handler)
    }
  })

  return (
    <div className='NavBar'>
      <div className="title-navbar">
        NotJira
      </div>

      <div
        className="div-user-menu"
        ref={profileRef}
        >
        <button
          className={`btn-profile ${dropDown ? 'profile-active' : 'profile-inactive'}`}
          onClick={() => setDropDown(!dropDown)}>
          <img src="" alt="" />
          <div className="username">
            {authUser?.email}
          </div>

          <BsChevronDown className='icon-chevron' />
        </button>

        {dropDown && <ProfileDropDown />}
      </div>


    </div>
  )
}

function ProfileDropDown() {
  const redirect = useNavigate();
  const { logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
      redirect('/')
    } catch {
      console.log('Failed to log out')
    }
  }

  return (
    <div className='profile-drop-down'>
      <button
        onClick={() => redirect('profile')}
      >
        <BsFillPersonFill/>
        My Profile
      </button>

      <button
        onClick={handleLogOut}>
          <BsDoorOpenFill/>
        Log Out
      </button>
    </div>
  )
}

export default NavBar