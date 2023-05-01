import { closeComplete } from "pg-protocol/dist/messages";
import React, { useState, Component, useEffect, cloneElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './document.css'

const Document = (props) => {
  const { id } = useParams()
  const [sharedStatus, setSharedStatus] = useState();
  const navigate = useNavigate();
  let docNotFound = true;

  for (let i = 0; i < props.userDocuments.length; i++) {
    if (props.userDocuments[i].document_id === Number(id)) docNotFound = false;
  }
  if (docNotFound === true) navigate("/404")

  const viewDocument = (path) => {
    // let path;
    // for (let i = 0; i < props.userDocuments.length; i++) {
    //   if (props.userDocuments[i].document_id === Number(id)) path = props.userDocuments[i].file_path
    // }
    fetch('/api/profile/send-document', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ path })
    })
    .then((res)=>res.blob())
    .then((blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL);
      window.URL.revokeObjectURL(fileURL);
    })
  }
  
  const shareDocument = (event) => {
    event.preventDefault()
    fetch('/api/profile/share-document', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sharedUser: event.target.sharedUser.value,
        docID: id,
        ownerID: props.currentUser.userID,
        ownerFName: props.currentUser.firstName
      })
    })
    .then((res)=>res.json())
    .then((data) => {
      if (data.userFound === true) {
        setSharedStatus(`Document shared with ${data.firstName}!`)
      }
      else {
        setSharedStatus(`Could not find user with email address ${event.target.sharedUser.value}`)
      }
    })
  }

  const retrievePDF = () => {
    fetch('/api/profile/retrieve-document', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      docID: id,
      })
    })
    .then((res)=>res.json())
    .then((data) => {
      const retrievedData = data.revisions[0].form_data.formData
      console.log('retrieved data', data.revisions)
      retrievedData[40].latestRevision = data.revisions[0].revision_number
      retrievedData[40].docID = id;
      props.setFormData(retrievedData)
      navigate("/profile/edit")
    })
  }

  useEffect(() => {
    console.log('useEffect in document component')
    const documentNotFound = [
      <div>
        <h1>Document Not Found</h1>
      </div>
    ]

    const currentDocEl = props.userDocuments.reduce((acc, curr)=>{
      if (curr.document_id === Number(id)) {
        acc.push(
          <div className="revisionBoxes">
            <div className="revisionDetails">
              <div className="detailChildDiv">
                <span className="revisionSpan">Title: </span>
                <span>{curr.title}</span>
              </div>
              <div className="detailChildDiv">
                <span className="revisionSpan">Document ID: </span>
                <span>{curr.document_id}</span>
              </div>
              <div className="detailChildDiv">
                <span className="revisionSpan">Update Date: </span>
                <span>{curr.revision_date}</span>
              </div>
              <div className="detailChildDiv">
                <span className="revisionSpan">Version Number: </span>
                <span>{curr.revision_number}</span>
              </div>
              <div className="detailChildDiv">
                <span className="revisionSpan">Comment: </span>
                <span>{curr.comments}</span>
              </div>
            </div>
            <button className="viewDocButton" onClick={()=>viewDocument(curr.file_path)}>View</button>
          </div>
        )
      }
      return acc
    }, [])
    props.setCurrentDocument(currentDocEl)
  }, [])



  return (
    <div className="revisionDiv">
      <div className="revisionHeaderDiv">
        <h1>Revision Info:</h1>
        <div className="revisionInputs">
          <form onSubmit={(e)=>shareDocument(e)}>
            <input className="shareDocButton" type="submit" value="Send To User"></input>
            <input type='text' placeholder="Enter user's email" name="sharedUser" id="sharedUser"></input>
          </form>
          {sharedStatus}
          <button className="editDocButton" onClick={retrievePDF}>Add Revision</button>
        </div>
      </div>
      <div className="revisionBoxAndInputs">
        <div className="revisionBoxDiv">
          {props.currentDocument}
        </div>
        {/* <div className="revisionInputs">
          <form onSubmit={(e)=>shareDocument(e)}>
            <input type='text' placeholder="Enter user's email" name="sharedUser" id="sharedUser"></input>
            <input className="shareDocButton" type="submit" value="Send To User"></input>
          </form>
          {sharedStatus}
        </div> */}
      </div>
    </div>
  )
};

export default Document;