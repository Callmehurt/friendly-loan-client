import { useSelector } from "react-redux";
import { axiosPrivate } from "../axios";
import useRefreshToken from "./userRefreshToken";
import { useEffect } from "react";

const useAxiosPrivate = () => {

    const useRefresh = useRefreshToken();

    const accessToken = useSelector((state) => state.authentication.accessToken);

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${accessToken}`
                }

                return config;
            }, (err) => Promise.reject(err)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err?.config;
                if(err?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await useRefresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(err);
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [accessToken, useRefresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;