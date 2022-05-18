import React from 'react'
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';

import '../static/css/Login.scss'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });

  const [isPasswordVisible, setIsPassswordVisible] = useState(false)

  const [errorLogin, setErrorLogin] = useState();

  const redirect = useNavigate();

  const { authUser, login } = useAuth();

  if (authUser) {
    return <Navigate to='/home' />
  }

  const changePasswordVisibility = () => {
    setIsPassswordVisible(!isPasswordVisible)
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
    catch (error) {
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
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }}
            value={loginInfo.username} />

          <div className="div-input-icon">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder='Password'
              onChange={(e) => {
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }}
              value={loginInfo.password} />

            <div
              className='icon-eye'
              onClick={changePasswordVisibility}>
              {isPasswordVisible ? <BsEye /> : <BsEyeSlash />}
            </div>
          </div>

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