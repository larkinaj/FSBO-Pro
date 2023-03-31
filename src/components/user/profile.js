import { useNavigate } from 'react-router-dom';
import React, { useState, Component, useEffect } from "react";
import PurchaseAgreeFill from "../purchase-agreement-fill";
import blankForm from '../helperFunctions/helper';

const Profile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect in Profile')
  }, [])

  const newDocument = () => {
    props.setFormData(blankForm)
    navigate("/profile/create")
  }

  const selectDoc = (id) => {
    navigate("/profile/documents/" + id)
  }

  let uniqueDocuments = props.userDocuments.reduce((acc, curr) => {
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].document_id === curr.document_id) {
        return acc
      }
    }
    acc.push(curr)
    return acc
  }, [])

  let ownDocuments = uniqueDocuments.reduce((acc, curr) => {
    if (!curr.shared_with_id) {
      acc.push(
        <div>
          <h3>{curr.title}</h3>
          <h3>docid:{curr.document_id}</h3>
          <h3>{curr.revision_date}</h3>
          <h3>rev#:{curr.revision_number}</h3>
          <button onClick={()=>selectDoc(curr.document_id)}>Select</button>
        </div>
      )
    }
    return acc
  }, [])

  let sharedDocuments = uniqueDocuments.reduce((acc, curr) => {
    if (curr.shared_with_id) {
      acc.push(
        <div>
          <h3>{curr.title}</h3>
          <h3>docid:{curr.document_id}</h3>
          <h3>{curr.revision_date}</h3>
          <h3>rev#:{curr.revision_number}</h3>
          <button onClick={()=>selectDoc(curr.document_id)}>Select</button>
        </div>
      )
    }
    return acc
  }, [])

  return (
    <div>
      <div>
        <h1>Welcome {props.currentUser.firstName}</h1>
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