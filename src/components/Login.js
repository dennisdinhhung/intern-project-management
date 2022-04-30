import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';

import '../static/css/Login.scss'

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });

  const [errorLogin, setErrorLogin] = useState();

  const redirect = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //TODO: basic input field auth

    login();

    //TODO: if account incorrect, return

    

    setLoginInfo({
      username: '',
      password: ''
    })

    redirect('/home')
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginInfo.username,
        loginInfo.password
      )
      console.log(user)
    }
    catch (error){
      console.log(error.message)
    }
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
                setLoginInfo({...loginInfo, username: e.target.value})}}
              value={loginInfo.username}/>
            
            <input 
              type="text" 
              placeholder='Password'
              onChange={(e) => {
                setLoginInfo({...loginInfo, password: e.target.value})
              }}
              value={loginInfo.password}/>

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