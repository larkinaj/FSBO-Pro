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
    <div>
      <div>
        <form onSubmit={loginUser}>
          <input type="text" id="userLogin" name="userLogin" />
          <label for="userLogin">Username</label><br />
          <input type="password" id="passLogin" name="passLogin" />
          <label for="passLogin">Password</label><br />
          <input type="submit" value="LOG IN"></input>
        </form>
      </div>
      <div>
        <button onClick={createAccount}>Create Account</button>
        <a href="/signup">Create Account</a>
      </div>
    </div>

  )
}

export default LoginPage