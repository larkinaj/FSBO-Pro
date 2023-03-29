import { useNavigate } from 'react-router-dom';
import React, { useState, Component, useEffect } from "react";
import PurchaseAgreeFill from "../purchase-agreement-fill";

const Profile = (props) => {
  const navigate = useNavigate();

  const [userDocuments, setUserDocuments] = useState(['test'])

  useEffect(() => {
    console.log('useEffect in Profile')
    fetch('http://localhost:3000/user-documents', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(props.currentUser)
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log('Documents POST request', data)
      setUserDocuments(data)
    })
  }, [])



  let documentRenders = userDocuments.map((el)=>{
    return (
      <div>
        <h3>{el.title}</h3>
        <button>Select</button>
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