import React, { useState, Component, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Protected = (props) => {
  console.log("props protected", props)
  if (!props.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};
export default Protected;