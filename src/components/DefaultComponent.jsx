import React from "react";
import { Outlet } from "react-router";
// import { useLocation } from "react-router";

function DefaultComponent() {
  // const { pathname } = useLocation();
  const path = window.location.href;
  console.log('path:', path)
  return (
    <div><Outlet /></div>
  )
}

export default DefaultComponent;