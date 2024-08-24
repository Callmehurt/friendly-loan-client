import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../student/Header";
import { useCallback, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { fetchNotifications } from "../../redux/actions/notificationActions";

const AdminLayout = () => {

    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const fetchUserNotifications = useCallback(async () => {
        try{
            const res = await axiosPrivate.get('/notification/fetch-notifications');
            dispatch(fetchNotifications(res.data));
        }catch(err){
            console.log(err);
        }

    }, [axiosPrivate]);


    useEffect(() => {
        fetchUserNotifications();
    }, [fetchUserNotifications]);

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