import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../static/css/Menu.scss'

import {BsHouseDoorFill, BsChevronDown} from 'react-icons/bs'

function Menu() {
  const redirect = useNavigate();

  // const handleProjectStatus = () => {
  //   redirect('/home/project-status')
  // }

  return (
    <div className='Menu'>
      <div className="div-category">

        <div className="home">
          <button
            className='btn-home'
            onClick={() => { redirect('/home') }}>
              <BsHouseDoorFill className='menu-icon'/>
              Home
          </button>
        </div>


        <div className="title-category">
          Catergory
        </div>

        <div className="btn-prj-type">
          <button
            className=''
            onClick={() => { redirect('project-type') }}
          >
            <div>
              Project Type
            </div>
          </button>
        </div>

        <div className="btn-prj-status">
          <button
            className=''
            onClick={() => { redirect('project-status') }}
          >
            <div>
              Project Status
            </div>
          </button>
        </div>

        <div className="btn-prj-techstack">
          <button
            className=''
          onClick={() => {redirect('project-techstack')}}
          >
            <div>
              Tech Stack
            </div>
          </button>
        </div>

        <div className="btn-customer-group">
          <button
            className=''
            onClick={() => { redirect('customer-group') }}
          >
            <div>
              Customer Group
            </div>
          </button>
        </div>
      </div>

      <div className="div-management">
        <div className="title-management">
          Management
        </div>

        <div className="btn-mng-dep">
          <button
            className=''
            onClick={() => { redirect('manage-department') }}
          >
            <div>
              Manage Department
            </div>
          </button>
        </div>

        <div className="btn-mng-employee">
          <button
            className=''
            onClick={() => { redirect('manage-employee') }}
          >
            <div>
              Manage Employee
            </div>
          </button>
        </div>

        <div className="btn-mng-project">
          <button
            className=''
            onClick={() => { redirect('manage-project') }}
          >
            <div>
              Manage Project
            </div>
          </button>
        </div>
      </div>

      <div className="report">

      </div>

    </div>
  )
}

export default Menu