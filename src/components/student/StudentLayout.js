import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const StudentLayout = () => {


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

export default StudentLayout;