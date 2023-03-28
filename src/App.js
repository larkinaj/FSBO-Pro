import React, { useState, Component, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import OpenStreetMap from "./components/openstreetmap";
import Mapbox  from "./components/mapbox";
import NotFound from "./components/not-found";
import PurchaseAgreeFill from "./components/purchase-agreement-fill";
import LoginPage from "./components/login-signup/login"
import './App.css';

function App(props) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    fetch('http://localhost:3000/verify')
    .then((res)=>res.json())
    .then((data)=>{
      console.log('Here is App.js')
      console.log(data)
    })
  })

  if (isAuthenticated) {
    return (
      <div className="router">
        <main>
          <Routes>
            <Route
              exact path="/"
              element={
                <PurchaseAgreeFill 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />}
            />
            <Route
              exact path="/mapbox"
              element={<Mapbox />}
            />
            <Route
              exact path="/open-street"
              element={<OpenStreetMap />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  }
  else if (!isAuthenticated) {
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
                />}
            />
            <Route 
              exact path='/login'
              element={<LoginPage />}
            />
            <Route 
              exact path='*'
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  }

  // return (
  //   <div className="router">
  //     <main>
  //       <Routes>
  //         <Route
            
  //           exact path="/"
  //           element={<PurchaseAgreeFill />}
  //         />
  //         <Route
  //           exact path="/mapbox"
  //           element={<Mapbox />}
  //         />
  //         <Route
  //           exact path="/open-street"
  //           element={
  //           <OpenStreetMap 
              
  //           />}
  //         />
  //         <Route
  //           path="*"
  //           element={
  //           <NotFound />}
  //         />
  //       </Routes>
  //     </main>
  //   </div>
  // );
}

export default App;
