import { closeComplete } from "pg-protocol/dist/messages";
import React, { useState, Component, useEffect, cloneElement } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Document = (props) => {
  const { id } = useParams()
  const [sharedStatus, setSharedStatus] = useState();
  const navigate = useNavigate();
  let docNotFound = true;

  for (let i = 0; i < props.userDocuments.length; i++) {
    if (props.userDocuments[i].id === Number(id)) docNotFound = false;
  }
  if (docNotFound === true) navigate("/404")

  const viewDocument = () => {
    let path;
    for (let i = 0; i < props.userDocuments.length; i++) {
      console.log(props.userDocuments[i])
      if (props.userDocuments[i].id === Number(id)) path = props.userDocuments[i].file_path
    }
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
        console.log('SUCCESS')
        setSharedStatus(`Document shared with ${data.firstName}!`)
      }
      else {
        setSharedStatus(`Could not find user with email address ${event.target.sharedUser.value}`)
        console.log('FAILURE')
      }
    })
  }

  const editPDF = () => {
    let path;
    for (let i = 0; i < props.userDocuments.length; i++) {
      console.log(props.userDocuments[i])
      if (props.userDocuments[i].id === Number(id)) path = props.userDocuments[i].file_path
    }
    fetch('/api/profile/edit-document', {
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
        console.log('SUCCESS')
        setSharedStatus(`Document shared with ${data.firstName}!`)
      }
      else {
        setSharedStatus(`Could not find user with email address ${event.target.sharedUser.value}`)
        console.log('FAILURE')
      }
    })
    navigate("/profile/create")
  }

  useEffect(() => {
    console.log('useEffect in document component')
    const documentNotFound = [
      <div>
        <h1>Document Not Found</h1>
      </div>
    ]

    const currentDocEl = props.userDocuments.reduce((acc, curr)=>{
      if (curr.id === Number(id)) {
        acc = [(
          <div>
            <div>
              <h1>Document Info: </h1>
              <span>Title: {curr.title}</span>
              <span>ID: {curr.id}</span>
              <span>Created At: {curr.created_at}</span>
            </div>
          </div>
        )]
      }
      return acc
    }, documentNotFound)
    props.setCurrentDocument(currentDocEl)
  }, [])



  return (
    <div>
      {props.currentDocument}
      <div>
        <button onClick={()=>viewDocument()}>View</button>
      </div>
      <div>
        <button onClick={editPDF}>Edit Document</button>
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