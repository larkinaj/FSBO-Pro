import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './signup.css'

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
    fetch('/api/signup', {
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
    <div className="signupBox">
      <form onSubmit={signupUser}>
        <div className="signupInputsDiv">
          <span>Signup</span>
          <div>
            <input type="text" id="fnameSignup" name="fnameSignup" /><br />
            <label for="fnameSignup">First Name</label>
          </div>
          <div>
            <input type="text" id="lnameSignup" name="lnameSignup" /><br />
            <label for="lnameSignup">Last Name</label>
          </div>
          <div>
            <input type="text" id="userLogin" name="userLogin" /><br />
            <label for="userLogin">Email</label> 
          </div>
          <div>
            <input type="password" id="passLogin" name="passLogin" /><br />
            <label for="passLogin">Password</label>
          </div>
          <input className="signupButton" type="submit" value="CREATE ACCOUNT"></input>
        </div>
      </form>
    </div>
  )
}

export default SignupPage