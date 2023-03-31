import React, { useState, Component, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import OpenStreetMap from "./components/postings/openstreetmap";
import Mapbox  from "./components/postings/mapbox";
import NotFound from "./components/not-found";
import PurchaseAgreeFill from "./components/purchase-agreement-fill";
import LoginPage from "./components/login-signup/login"
import SignupPage from "./components/login-signup/signup";
import Profile from "./components/user/profile";
import Document from "./components/user/document";
import blankForm from "./components/helperFunctions/helper";
import './App.css';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState('pending');
  const [currentUser, setCurrentUser] = useState({firstName: '', userID: ''})
  const [userDocuments, setUserDocuments] = useState(['No Documents'])
  const [currentDocument, setCurrentDocument] = useState()
  const [formData, setFormData] = useState(blankForm)
  
  
  useEffect(() => {
    console.log('useEffect in App.js')
    fetch('http://localhost:3000/api/verify')
    .then((res)=>res.json())
    .then((data)=>{
      console.log('useEffect in App: ', data)
      if (data.session.authenticated) {
        setCurrentUser({firstName: data.session.firstName, userID: data.session.userID})
        setUserDocuments(data.documents)
        setIsAuthenticated(true)
      } else if (!data.session.authenticated) {
        setIsAuthenticated(false)
      }

    })
  }, [isAuthenticated])

  //if (isAuthenticated === 'pending') {
    // return (
    //   <div className="router">
    //     <h1>LOADING PAGE</h1>
    //   </div>
    // )
  //}
  //else if (isAuthenticated) {
    return (
      <div className="router">
        <header>
          <span className="siteName">FSBOPro</span>
        </header>
        <main>
          <Routes>
            <Route
              exact path="/"
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route
              exact path="/profile"
              element={
                <Profile 
                  currentUser={currentUser}
                  userDocuments={userDocuments}
                  setUserDocuments={setUserDocuments}
                  setCurrentDocument={setCurrentDocument}
                  setFormData={setFormData}
                />
              }
            />
            <Route
              path="/profile/create"
              element={
                <PurchaseAgreeFill 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  setFormData={setFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="/profile/edit"
              element={
                <PurchaseAgreeFill 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  setFormData={setFormData}
                  formData={formData}
                />
              }
            />
            <Route
              exact path="/profile/documents/:id"
              element={
                <Document
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  userDocuments={userDocuments}
                  currentDocument={currentDocument}
                  setUserDocuments={setUserDocuments}
                  setCurrentDocument={setCurrentDocument}
                  setFormData={setFormData}
                  formData={formData}
                />
              }
            />
            <Route
              exact path="/open-street"
              element={<OpenStreetMap />}
            />
            <Route 
              exact path='/login'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route 
              exact path='/signup'
              element={
                <SignupPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route
              path="*"
              element={<NotFound />}
            />
            <Route
              path="/404"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  //}
  //else if (!isAuthenticated) {
    return (
      <div className="router">
        <main>
          <Routes>
            <Route 
              exact path='/'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />}
            />
            <Route 
              exact path='/login'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route 
              exact path='/signup'
              element={
                <SignupPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route 
              exact path='*'
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  //}
}

export default App;
