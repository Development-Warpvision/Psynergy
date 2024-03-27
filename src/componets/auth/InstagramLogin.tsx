import React from "react";
import { InstagramLoginButton } from "react-social-login-buttons";
import { LoginSocialInstagram } from "reactjs-social-login";

const InstagramLogin = () => {
  return (
    <div>
      {/* <LoginSocialInstagram
        client_id=""
        client_secret=""
        redirect_uri="https://stg.api.convoportal.com"
        onResolve={(response) => {
          // console.log(response);
        }}
        onReject={(error) => {
          // console.log(error);
        }}
      >
        <InstagramLoginButton />
      </LoginSocialInstagram> */}
    </div>
  );
};

export default InstagramLogin;
