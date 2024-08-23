import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../student/Header";

const AdminLayout = () => {


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

export default AdminLayout;