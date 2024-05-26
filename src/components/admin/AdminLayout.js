import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const AdminLayout = () => {


    return (
        <>
        <ToastContainer />
        <div className="wrapper">
            <div className="container-fluid">
                <Outlet/>
            </div>
        </div>
        </>
    )
}

export default AdminLayout;