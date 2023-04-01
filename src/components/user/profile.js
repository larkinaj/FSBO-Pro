import { useNavigate } from 'react-router-dom';
import React, { useState, Component, useEffect } from "react";
import blankForm from '../helperFunctions/helper';
import './profile.css'

const Profile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect in Profile')
    fetch('http://localhost:3000/api/verify')
    .then((res)=>res.json())
    .then((data)=>{
      console.log('useEffect in App: ', data)
      if (data.session.authenticated) {
        props.setCurrentUser({firstName: data.session.firstName, userID: data.session.userID})
        props.setUserDocuments(data.documents)
        props.setIsAuthenticated(true)
      } else if (!data.session.authenticated) {
        props.setIsAuthenticated(false)
      }
    })
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
          <div className="docDetailDiv">
            <span className="docDetail">Name: </span>
            <span>{curr.title}</span>
          </div>
          <div className="docDetailDiv">
            <span className="docDetail">Last Updated: </span>
            <span>{curr.revision_date}</span>
          </div>
          <div className="docDetailDiv">
            <span className="docDetail">Last Comment: </span>
            <span>{curr.comments}</span>
          </div>
          <div className="docDetailDiv">
            <span className="docDetail">Version: </span>
            <span>{curr.revision_number}</span>
          </div>
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
          <div className="docDetailDiv">
            <span className="docDetail">Name: </span>
            <span>{curr.title}</span>
          </div>
          <div className="docDetailDiv">
            <span className="docDetail">Last Updated: </span>
            <span>{curr.revision_date}</span>
          </div>
          <div className="docDetailDiv">
            <span className="docDetail">Last Comment: </span>
            <span>{curr.comments}</span>
          </div>
          <div className="docDetailDiv">
            <span className="docDetail">Version: </span>
            <span>{curr.revision_number}</span>
          </div>
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