import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { auth } from '../utils/firebase-config';

import '../static/css/Login.scss'
import { useAuth } from '../utils/AuthProvider';

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });

  const [errorLogin, setErrorLogin] = useState();

  const redirect = useNavigate();

  const { authUser, login } = useAuth();

  if (authUser){
    return <Navigate to='/home'/>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //TODO: basic input field auth

      //ruins the login function
      await login(loginInfo);

      //TODO: if account incorrect, return

      setLoginInfo({
        username: '',
        password: ''
      })

      console.log('redirect')
      redirect('/home')
    }
    catch(error){
      setErrorLogin('Your username or password is incorrect.')
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