import { useNavigate } from 'react-router-dom';
import React, { useState, Component, useEffect } from "react";
import PurchaseAgreeFill from "../purchase-agreement-fill";

const Profile = (props) => {
  console.log('PROFILE PROPS', props)
  const navigate = useNavigate();

  const [userDocuments, setUserDocuments] = useState(['test'])

  let documentRenders = userDocuments.map((el)=>{
    return (
      <div>
        <h3>{el}</h3>
      </div>
    )
  })

  const handleClick = () => {
    navigate("/profile/create")
  }

  return (
    <div>
      <div>
        <h1>WELCOME {props.currentUser.username}</h1>
      </div>
      <div>
        <h3>Your Documents</h3>
        {documentRenders}
      </div>
      <div>
        <button onClick={handleClick}>Create New Document</button>
      </div>
    </div>
  )
};
export default Profile;