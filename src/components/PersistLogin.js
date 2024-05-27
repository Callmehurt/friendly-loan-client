import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useRefreshToken from '../hooks/userRefreshToken';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from './LoadingComponent';

const PersistLogin = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const refresh = useRefreshToken();

    const currentAuthState = useSelector((state) => state.authentication);

    // const {isLoading, data, error} = useQuery({
    //     queryKey: ['refreshToken'],
    //     queryFn: async () => {
    //         return await refresh();
    //     },
    //     enabled: !currentAuthState.isAuthenticated
    // });


    // if(error){
        // if(location.pathname !== '/user/login'){
        //     navigate('/user/login', {state: {from: location}, replace: true})
        // }
    // }

    // console.log(error);

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {

        let isMounted = true;

        const verifyRefreshToken = async () => {
            try{
                await refresh();
            }catch(err){
                console.log(err);
                // if(location.pathname !== '/user/login'){
                //     navigate('/user/login', {state: {from: location}, replace: true})
                // }
        
                navigate('/', {state: {from: location}, replace: true});
            }finally{
                isMounted && setIsLoading(false);
            }
        }

        !currentAuthState?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
        
    }, []);


    return (
        <>
            {
                isLoading ? (
                    <LoadingComponent/>
                ): <Outlet />
            }
        </>
    )
    
}

export default PersistLogin;