import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const loginUser = (event) => {
    event.preventDefault()
    let credentials = {
      userLogin: event.target.userLogin.value,
      passLogin: event.target.passLogin.value
    }
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      if (data.authenticated === true) {
        props.setIsAuthenticated(true)
        props.setCurrentUser({username: data.username, userID: data.userID})
        navigate("/profile")
      }
    })
  }
  return (
    <div>
      {/* <form action="/" onSubmit={loginUser}> */}
      <form onSubmit={loginUser}>
        <input type="text" id="userLogin" name="userLogin" />
        <label for="userLogin">Username</label><br />
        <input type="text" id="passLogin" name="passLogin" />
        <label for="passLogin">Password</label><br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}

export default LoginPage