import React from "react";
import "../assets/style/internet_error.css";

const InternetError = () => {
  return (
    <>
      <div className="parent">
        <div className="card">
          <div className="circles">
            <div className="c"></div>
            <div className="c"></div>
            <div className="c"></div>
          </div>

          <div className="browser">
            <div className="search-bar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7.89"
                height="7.887"
                viewBox="0 0 16.89 16.887"
              >
                <path
                  id="Fill"
                  d="M16.006,16.887h0l-4.743-4.718a6.875,6.875,0,1,1,.906-.906l4.719,4.744-.88.88ZM6.887,1.262a5.625,5.625,0,1,0,5.625,5.625A5.631,5.631,0,0,0,6.887,1.262Z"
                  transform="translate(0.003 0)"
                ></path>
              </svg>
              convoportal.com
              <div></div>
            </div>
          </div>
        </div>
        <h1>It seems Your Internet Not Working Please Check Your Connection</h1>
      </div>
    </>
  );
};

export default InternetError;
