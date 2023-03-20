import React, { useState, Component } from "react";
import { Routes, Route } from 'react-router-dom';
import OpenStreetMap from "./components/openstreetmap";
import Mapbox  from "./components/mapbox";
import NotFound from "./components/not-found";
import PurchaseAgreeFill from "./components/purchase-agreement-fill";
import './App.css';

function App(props) {
  return (
    <div className="router">
      <main>
        {/*
            NOTE: The syntax below is for React-Router
              - A helpful library for routing with a React app.
              You can learn more about this at:
              https://reacttraining.com/react-router/web/guides/quick-start
        */}
        <Routes>
          <Route
            exact path="/"
            element={
            <PurchaseAgreeFill />}
          />
          <Route
            exact path="/mapbox"
            element={<Mapbox />}
          />
          <Route
            exact path="/open-street"
            element={
            <OpenStreetMap 
              
            />}
          />
          <Route
            path="*"
            element={
            <NotFound />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
