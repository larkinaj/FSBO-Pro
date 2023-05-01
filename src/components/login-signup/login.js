import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './login.css'

const LoginPage = (props) => {
  const navigate = useNavigate();
  const loginUser = (event) => {
    event.preventDefault()
    let credentials = {
      userLogin: event.target.userLogin.value,
      passLogin: event.target.passLogin.value
    }
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      if (data.session.authenticated === true) {
        props.setIsAuthenticated(true)
        props.setCurrentUser({firstName: data.session.firstName, userID: data.session.userID})
        props.setUserDocuments(data.documents)
        navigate("/profile")
      }
    })
  }
  const createAccount = (event) => {
    navigate("/signup")
  }
  return (
    <div className="loginBox">
      <form onSubmit={loginUser} >
        <div className="loginInputsDiv">
          <span>Log In</span>
          <input className="loginInputs" type="text" id="userLogin" name="userLogin" placeholder="Email Address"/>
          <input className="loginInputs" type="password" id="passLogin" name="passLogin" placeholder="Password"/>
          <input className="loginButton" type="submit" value="LOG IN"></input>
          <a href="/signup">Create Account</a>
        </div>
      </form>
    </div>

  )
}

export default LoginPage