import React, { useEffect } from "react";
import { useState } from "react";
import { axiosDefault } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../redux/actions/authenticationActions";
import { useNavigate, Link } from "react-router-dom";
import { notifySuccess } from "../../toast.notification";
import { ToastContainer } from "react-toastify";
import logo from '../../images/logo-blue.png'

const LoginPage = () => {

    const currentAuthState = useSelector((state) => state.authentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {

        if(currentAuthState.isAuthenticated){
            navigate(`/${currentAuthState.user.role.toLowerCase()}/dashboard`);
        }

    }, [currentAuthState, navigate]);


    const [isSubmiting, setIsSubmiting] = useState(false);

    const [loginCredential, setLoginCredential] = useState({
        email: '',
        password: ''
     });
    const [errMsg, setErrMsg] = useState('');

    const formHandler = (e) => {
        const credential = {...loginCredential};
        credential[e.target.name] = e.target.value;
        setLoginCredential(credential);
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsSubmiting(true);
        await axiosDefault.post('/user/login', loginCredential).then((res) => {
            const {user, accessToken} = res?.data;
            notifySuccess('User authenticated successfully!');
            dispatch(authenticateUser({user, accessToken}));
            setIsSubmiting(false);
        }).catch((err) => {
            setErrMsg(err.response.data.message);
            setIsSubmiting(false);
        })
    }

    return (
        <>
            <ToastContainer/>
            <div className="login_page_wrapper">
            <div className="login_box">
                <div className="card card-pages shadow-none">
                    <div className="card-body">
                        <div className="text-center m-t-0 m-b-15">
                            <Link to={'/'} className="logo logo-admin">
                                <img src={logo} height="40" alt="" />
                            </Link>
                        </div>
                        <h5 className="font-18 text-center mt-4">Sign in</h5>

                        <form className="form-horizontal m-t-30" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <div className="col-12">
                                    <label>Email Address</label>
                                    <input className="form-control" type="text" name={'email'} placeholder="Email address" value={loginCredential.email} onChange={(e) => formHandler(e)} autoComplete={'off'} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label>Password</label>
                                    <input className="form-control" type="password" name={'password'} placeholder="Password" value={loginCredential.password} onChange={(e) => formHandler(e)} />
                                </div>
                            </div>

                            <div className="form-group">
                               <div className="col-12">
                                   {
                                    errMsg ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errMsg}</li>
                                        </ul>
                                    ): null
                                }
                               </div>
                            </div>

                            <div className="form-group text-center m-t-20">
                                <div className="col-12">
                                    {
                                        isSubmiting ? (
                                            <button className="btn btn-primary btn-block btn-lg waves-effect waves-light">
                                                Logging in..
                                            </button>
                                        ):
                                            (
                                                <button className="btn btn-primary btn-block btn-lg waves-effect waves-light"
                                                        type="submit">Log In
                                                </button>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="form-group row m-t-30 m-b-0">
                                <div className="col-sm-7">
                                    <Link to={'/'} className="text-muted text-decoration-none">
                                    <i className="mdi mdi-lock m-r-5"></i> Forgot your password?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            </div>
        </>
    )
}

export default LoginPage;