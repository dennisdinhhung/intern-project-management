import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../static/css/Menu.scss'

import {BsHouseDoorFill, BsChevronDown, BsStack, BsFillGrid1X2Fill, BsCheckSquareFill, BsPeopleFill, BsFillPersonLinesFill, BsListNested, BsCodeSlash, BsFileEarmarkCodeFill} from 'react-icons/bs'
import { useState } from 'react';

function Menu() {
  const redirect = useNavigate();

  const [activeBtn, setActivebtn] = useState();

  // const handleProjectStatus = () => {
  //   redirect('/home/project-status')
  // }

  useEffect(() => {
    setActivebtn(window.location.pathname)
  }, [])

  const redirectFunc = (link) => {
    setActivebtn(link)
    redirect(link)
  }

  return (
    <div className='Menu'>
      <div className="div-category">

        <div className="home">
          <button
            className={activeBtn === '/home' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home')}}>
              <BsHouseDoorFill className='menu-icon'/>
              Home
          </button>
        </div>


        <div className="title-menu">
          Catergory
        </div>

        <div className="div-button">
          <button
            className={activeBtn === '/home/project-type' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home/project-type')}}
          >
            <BsFillGrid1X2Fill className="menu-icon"/>
            Project Type
          </button>
        </div>

        <div className="div-button">
          <button
            className={activeBtn === '/home/project-status' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home/project-status')}}
          >
            <BsCheckSquareFill className="menu-icon"/>
              Project Status

          </button>
        </div>

        <div className="div-button">
          <button
            className={activeBtn === '/home/techstack' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home/techstack')}}
          >
            <BsStack className='menu-icon'/>
            Tech Stack
          </button>
        </div>

        <div className="div-button">
          <button
            className={activeBtn === '/home/customer-group' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home/customer-group')}}
          >
            <BsPeopleFill className='menu-icon'/>
              Customer Group

          </button>
        </div>
      </div>

      <div className="div-management">
        <div className="title-menu">
          Management
        </div>

        <div className="div-button">
          <button
            className={activeBtn === '/home/manage-department' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home/manage-department')}}
          >
            <BsListNested className="menu-icon"/>
              Department

          </button>
        </div>

        <div className="div-button">
          <button
            className={activeBtn === '/home/manage-employee' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home/manage-employee')}}
          >
            <BsFillPersonLinesFill className="menu-icon"/>
              Employee

          </button>
        </div>

        <div className="div-button">
          <button
            className={activeBtn === '/home/manage-project' ? 'active-nav' : 'inactive-nav'}
            onClick={() => { 
              redirectFunc('/home/manage-project')}}
          >
            <BsFileEarmarkCodeFill className="menu-icon"/>
              Project

          </button>
        </div>
      </div>

      <div className="report">

      </div>

    </div>
  )
}

export default Menu