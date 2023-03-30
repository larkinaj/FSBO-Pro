import { useNavigate } from 'react-router-dom';
import React, { useState, Component, useEffect } from "react";
import PurchaseAgreeFill from "../purchase-agreement-fill";
import blankForm from '../helperFunctions/helper';

const Profile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect in Profile')
    // fetch('http://localhost:3000/user-documents', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(props.currentUser)
    // })
    // .then((res)=>res.json())
    // .then((data)=>{
    //   console.log('Documents POST request', data)
    //   props.setUserDocuments(data)
    // })
  }, [])

  const newDocument = () => {
    props.setFormData(blankForm)
    navigate("/profile/create")
  }

  const selectDoc = (id) => {
    navigate("/profile/documents/" + id)
  }


  let ownDocuments = props.userDocuments.map((el) => {
    if (!el.shared_with_id) {
      return (
        <div>
          <h3>{el.title}</h3>
          <button onClick={()=>selectDoc(el.id)}>Select</button>
        </div>
      )
    }
  })

  let sharedDocuments = props.userDocuments.map((el) => {
    if (el.shared_with_id) {
      return (
        <div>
          <h3>{el.title}</h3>
          <button onClick={()=>selectDoc(el.id)}>Select</button>
        </div>
      )
    }
  })

  return (
    <div>
      <div>
        <h1>WELCOME {props.currentUser.firstName}</h1>
      </div>
      <div>
        <h3>Your Documents</h3>
        {ownDocuments}
      </div>
      <div>
        <h3>Documents Shared With You</h3>
        {sharedDocuments}
      </div>
      <div>
        <button onClick={newDocument}>Create New Document</button>
      </div>
    </div>
  )
};
export default Profile;