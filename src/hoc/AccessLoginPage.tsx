import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type AccessLoginPageProps = {
  children: ReactNode;
};
export default function AccessLoginPage({ children }: AccessLoginPageProps) {
    const isAuth: any = JSON.parse(localStorage.getItem("user") || "false") || false;
    if(isAuth){
        return <Navigate to={"/dashboard"}/>
    }

    return <>{children}</>
}
