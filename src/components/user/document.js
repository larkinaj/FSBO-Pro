import { closeComplete } from "pg-protocol/dist/messages";
import React, { useState, Component, useEffect, cloneElement } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    fetch('http://localhost:3000/api/profile/send-document', {
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
    fetch('http://localhost:3000/api/profile/share-document', {
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
          <div>
            <div>
              <span>Title: {curr.title}</span>
              <span>ID: {curr.document_id}</span>
              <span>Created At: {curr.revision_date}</span>
              <span>Revision Number: {curr.revision_number}</span>
            </div>
            <button onClick={()=>viewDocument(curr.file_path)}>View</button>
          </div>
        )
      }
      return acc
    }, [])
    props.setCurrentDocument(currentDocEl)
  }, [])



  return (
    <div>
      <h1>Document Info:</h1>
      {props.currentDocument}
      <div>
        <button onClick={retrievePDF}>Edit Document</button>
      </div>
      <div>
        <form onSubmit={(e)=>shareDocument(e)}>
          <input type='text' placeholder="Enter user's email" name="sharedUser" id="sharedUser"></input>
          <input type="submit" value="Send To User"></input>
        </form>
        {sharedStatus}
      </div>
    </div>
  )
};

export default Document;