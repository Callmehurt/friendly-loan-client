import { useDispatch, useSelector } from "react-redux";
import logo from '../../images/logo-blue.png'
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../toast.notification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";
import { authenticateUser } from "../../redux/actions/authenticationActions";

const EmailVerificationPage = () => {

    const navigate = useNavigate();
    const logout = useLogout();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const currentAuth = useSelector((state) => state.authentication);

    useEffect(() => {
        if(currentAuth?.isAuthenticated === false){
            navigate('/user/login');
        }
    }, [currentAuth])
    

    const [token, setToken] = useState('');

    const verifyEmail = async (e) => {
        e.preventDefault();
        if(!token){            
            notifyError('Token is required');
            return null;
        }else{

            axiosPrivate.post('/user/verify-email', {token}).then((res) => {
                if(res?.status === 200){
                    notifySuccess(res.data.message);
                    const user = { ...currentAuth.user, emailVerified: true };
                    const accessToken = currentAuth.accessToken;
                    dispatch(authenticateUser({ user, accessToken }));
                    navigate(`/${currentAuth.user.role.toLowerCase()}/dashboard`);
                }

            }).catch((err) => {
                console.log(err);
                notifyError(err.response.data.message);
                
            })
        }        
    }

    const signOut = async () => {
        await logout();
        navigate('/user/login')
    }
    
    return (
        <>
                <ToastContainer/>
                <div class="accountbg" style={{ backgroundColor: 'red' }}></div>
                <div className="wrapper-page">
                <div className="card card-pages shadow-none">
    
                    <div className="card-body">
                        <div className="text-center m-t-0 m-b-15">
                                <a href="#" className="logo logo-admin"><img src={logo} height="40" alt="" /></a>
                        </div>
                        <h5 className="font-18 text-center">Verify Email</h5>
    
                        <form className="form-horizontal m-t-30" action="#">

                               <div className="col-12">
                                    <div className="alert alert-danger alert-dismissible">
                                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                            Enter your <b>Email</b> verification code sent to {currentAuth?.user?.email} to verify your email.
                                        </div>
                               </div>

                                <div className="form-group">
                                        <div className="col-12">
                                                <label>Token</label>
                                            <input className="form-control" type="text" onChange={(e) => setToken(e.target.value)} />
                                        </div>
                                    </div>
    
                                <div className="form-group">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col">
                                                <button className="submit_button" onClick={verifyEmail}>Submit</button>
                                            </div>
                                            <div className="col">
                                                <button className="submit_button">Resend</button>
                                            </div>
                                            <div className="col">
                                                <button className="submit_button" onClick={signOut}>Logout</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </form>
                    </div>
    
                </div>
            </div>
        </>
    )
}

export default EmailVerificationPage;