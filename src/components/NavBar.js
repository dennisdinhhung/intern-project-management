import { async } from '@firebase/util';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { auth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'
import '../static/css/NavBar.scss'
import { useAuth } from '../utils/AuthProvider';

function NavBar() {

  const [user, setUser] = useState({});

  const redirect = useNavigate();

  const {authUser, logout } = useAuth();

  const [test, setTest] = useState();

  //remember the current loged in user
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser)
  // })

  // const logout = async () => {
  //   await signOut(auth)
  // }

  const handleLogOut = async () => {
    try{
      await logout();
      redirect('/')
    }catch{
      console.log('Failed to log out')
    }
  }

  return (
    <div className='NavBar'>
        <div className="title-navbar">
            NotJira
        </div>

        <input type="text" placeholder='Search'/>

        <div className="div-user-menu">
            <img src="" alt="" />
            <div className="username">
              {authUser?.email}
            </div>
        </div>

        <button
        onClick={handleLogOut}>
          Log Out
        </button>
    </div>
  )
}

export default NavBar