import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignupPage = (props) => {
  const navigate = useNavigate();
  const signupUser = (event) => {
    event.preventDefault()
    let signUpInfo = {
      fnameSignup: event.target.fnameSignup.value,
      lnameSignup: event.target.lnameSignup.value,
      userLogin: event.target.userLogin.value,
      passLogin: event.target.passLogin.value
    }
    fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signUpInfo)
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      if (data.session.authenticated === true) {
        props.setIsAuthenticated(true)
        props.setCurrentUser({firstName: data.session.firstName, userID: data.session.userID})
        navigate("/profile")
      }
    })
  }
  return (
    <div>
      <form onSubmit={signupUser}>
        <input type="text" id="fnameSignup" name="fnameSignup" />
        <label for="fnameSignup">First Name</label><br />
        <input type="text" id="lnameSignup" name="lnameSignup" />
        <label for="lnameSignup">Last Name</label><br />
        <input type="text" id="userLogin" name="userLogin" />
        <label for="userLogin">Email</label><br />
        <input type="text" id="passLogin" name="passLogin" />
        <label for="passLogin">Password</label><br />
        <input type="submit" value="CREATE ACCOUNT"></input>
      </form>
    </div>
  )
}

export default SignupPage