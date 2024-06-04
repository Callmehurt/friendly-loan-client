import { useDispatch } from "react-redux";
import { axiosPrivate } from "../axios";
import { updateToken } from "../redux/actions/authenticationActions";

const useRefreshToken = () => {

    const dispatch = useDispatch();

    const refreshToken = async () => {
        try{

            const res = await axiosPrivate.get('/user/refresh-token');
            const {user, accessToken} = res?.data;

            console.log(accessToken);
            dispatch(updateToken({user, accessToken}));
            return accessToken;

        }catch(err){
            console.log(err);
        }
    }

    return refreshToken;
    
}

export default useRefreshToken;