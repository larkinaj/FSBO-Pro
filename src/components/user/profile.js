import { useNavigate } from 'react-router-dom';
import React, { useState, Component, useEffect } from "react";
import blankForm from '../helperFunctions/helper';
import './profile.css'

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
        <div className="documentBox">
          <span className="docDetail">Name: {curr.title}</span>
          <span className="docDetail">Last Updated: {curr.revision_date}</span>
          <span className="docDetail">Current update: {curr.comments}</span>
          <span className="docDetail">Version: {curr.revision_number}</span>
          <button className="selectDocButton" onClick={()=>selectDoc(curr.document_id)}>Select</button>
        </div>
      )
    }
    return acc
  }, [])

  let sharedDocuments = uniqueDocuments.reduce((acc, curr) => {
    if (curr.shared_with_id) {
      acc.push(
        <div className="documentBox">
          <span className="docDetail">Name: {curr.title}</span>
          <span className="docDetail">Last Updated: {curr.revision_date}</span>
          <span className="docDetail">Last Comment: {curr.comments}</span>
          <span className="docDetail">Version: {curr.revision_number}</span>
          <button className="selectDocButton" onClick={()=>selectDoc(curr.document_id)}>Select</button>
        </div>
      )
    }
    return acc
  }, [])

  return (
    <div className="profileDiv">
      <div className="welcomeHeaderDiv">
        <h1>Welcome {props.currentUser.firstName}</h1>
        <button className="createDocButton" onClick={newDocument}>Create New Document</button>
      </div>
      <div className="profileColumns">
        <div className="yourDocuments">
          <h3>Your Documents</h3>
          {ownDocuments}
        </div>
        <div className="sharedDocuments">
          <h3>Documents Shared With You</h3>
          {sharedDocuments}
        </div>
        {/* <div className="createDocDiv">
          <button className="createDocButton" onClick={newDocument}>Create New Document</button>
        </div> */}
      </div>
    </div>
  )
};
export default Profile;