import React, {useCallback, useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/actions/notificationActions";

const StudentLayout = () => {

    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentAuthState = useSelector((state) => state.authentication);
    
    const fetchUserNotifications = useCallback(async () => {
        try{
            const res = await axiosPrivate.get('/notification/fetch-notifications');
            dispatch(fetchNotifications(res.data));
        }catch(err){
            console.log(err);
        }

    }, [axiosPrivate, dispatch]);


    useEffect(() => {
        fetchUserNotifications();
    }, [fetchUserNotifications, navigate]);

    //check email verification
    useEffect(() => {

        if(currentAuthState.user.emailVerified === false){
            navigate(`/user/verify-email`); 
        }

    }, [currentAuthState, navigate]);


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