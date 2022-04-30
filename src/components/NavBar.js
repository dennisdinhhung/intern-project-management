import { async } from '@firebase/util';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import '../static/css/NavBar.scss'

function NavBar() {

  const [user, setUser] = useState({});

  const redirect = useNavigate();

  //remember the current loged in user
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const logout = async () => {
    await signOut(auth)
  }

  const handleLogOut = () => {
    logout();

    redirect('/')
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
              {user?.email}
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