import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";

const StudentLayout = () => {


    return (
        <>
        <ToastContainer />
        <Header/>
        <div className="wrapper">
            <div className="container-fluid">
                <Outlet/>
            </div>
        </div>
        </>
    )
}

export default StudentLayout;