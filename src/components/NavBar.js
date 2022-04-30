import React from 'react'
import '../static/css/NavBar.scss'

function NavBar() {
  return (
    <div className='NavBar'>
        <div className="title-navbar">
            NotJira
        </div>

        <input type="text" placeholder='Search'/>

        <div className="div-user-menu">
            <img src="" alt="" />
        </div>
    </div>
  )
}

export default NavBar