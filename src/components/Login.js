import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../static/css/Login.scss'

function Login() {

  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const [errorLogin, setErrorLogin] = useState();

  const redirect = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLogin({
      username: '',
      password: ''
    })

    redirect('/home')
  }

  return (
    <div className='Login'>
        <div className="title-login">
          NotJira
        </div>

        <div className="div-form">
          <form action="" className='form-login'>
            <input 
              type="text" 
              placeholder='Username'
              onChange={(e) => {
                setLogin({...login, username: e.target.value})}}
              value={login.username}/>
            
            <input 
              type="text" 
              placeholder='Password'
              onChange={(e) => {
                setLogin({...login, password: e.target.value})
              }}
              value={login.password}/>

            <div className='error-login'>{errorLogin}</div>

            <button 
              className='btn-login'
              onClick={handleSubmit}>
                Login
            </button>
          </form>
        </div>
    </div>
  )
}

export default Login