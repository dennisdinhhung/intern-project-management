import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './components/Menu'

import './static/css/OutLetContainer.scss'

function OutLetContainer() {
  return (
    <div className='OutLetContainer'>
        <Menu/>
        <Outlet/>
    </div>
  )
}

export default OutLetContainer