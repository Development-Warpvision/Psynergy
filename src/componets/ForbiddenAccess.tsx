import React from "react";
import "../assets/style/forbidden_access.css";
const ForbiddenAccess = () => {
  return (
    <>
      <div id="container">
        <div className="toph">
          <h1>ERROR </h1>
          <h1 className="number">403</h1>
        </div>

        <h1 >FORBIDDEN</h1>
        <h5 className="h5ele">Connect with your admin for more information</h5>
      </div>
    </>
  );
};

export default ForbiddenAccess;
