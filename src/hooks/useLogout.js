import React from "react";
import { useDispatch } from "react-redux";
import { axiosDefault } from "../axios";
import { logoutUser } from "../redux/actions/authenticationActions";

const useLogout = () => {

    const dispatch = useDispatch();

    const logout = async () => {
        try{

            const res = await axiosDefault.get('/user/logout');
            if(res.status === 200){
                dispatch(logoutUser());
            }

        }catch(err){
            console.log(err);
        }
    }

    return logout;

}

export default useLogout;