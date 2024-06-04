import { useSelector } from "react-redux";
import { axiosPrivate } from "../axios";
import useRefreshToken from "./userRefreshToken";
import { useEffect } from "react";

const useAxiosPrivate = () => {

    const refreshToken = useRefreshToken();

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
                    try {

                        const newAccessToken = await refreshToken();
                        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (error) {
                        // Handle refresh token error (e.g., logout)
                        console.error("Error refreshing token:", error);
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(err);
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [accessToken, refreshToken]);

    return axiosPrivate;
}

export default useAxiosPrivate;