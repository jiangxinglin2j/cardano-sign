import React from "react";
// import { useLocation } from "react-router";

function DefaultComponentChild() {
  // const { pathname } = useLocation();
  const path = window.location.href;
  console.log('path:', path)
  return (
    <div>{path}</div>
  )
}

export default DefaultComponentChild;