import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type MakePrivateProps = {
  children: ReactNode;
};
export default function MakePrivate({ children }: MakePrivateProps) {
  const isAuth: any =
    JSON.parse(localStorage.getItem("user") || "false") || false;
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
}
