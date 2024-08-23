import React, { useEffect } from "react";
import { useState } from "react";
import { axiosDefault } from "../../axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { notifySuccess, notifyError } from "../../toast.notification";
import { ToastContainer } from "react-toastify";
import logo from '../../images/logo-blue.png'
import { useFormik } from "formik";
import { userRegistrationSchema } from "../../validation-schema";

const RegisterPage = () => {

    const currentAuthState = useSelector((state) => state.authentication);
    const navigate = useNavigate();


    useEffect(() => {

        if(currentAuthState.isAuthenticated){
            navigate(`/${currentAuthState.user.role.toLowerCase()}/dashboard`);
        }

    }, [currentAuthState, navigate]);


    const [isSubmiting, setIsSubmiting] = useState(false);

    //initial state
    const initialValues = {
        fullname: '',
        address: '',
        email: '',
        phone: '',
        password: ''
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: userRegistrationSchema,
        onSubmit: async (values, action) => {
            try{
                if(!file){
                    setFileError('File is Required');
                    return null;
                }                

                const formData = new FormData();
                formData.append('profile', file);
                formData.append('fullname', values.fullname);
                formData.append('address', values.address);
                formData.append('email', values.email);
                formData.append('phone', values.phone);
                formData.append('password', values.password);                
                                                
                
                setIsSubmiting(true);
                const res = await axiosDefault.post('/user/register', formData, {
                    headers: {
                              'content-type': 'multipart/form-data'
                          }
                });
                if(res.status === 200){
                    action.resetForm();
                    notifySuccess('Registration successful');
                    navigate('/user/login');   
                }else{
                    console.log(res);
                }
            }catch(err){
                console.log(err);
                notifyError(err.response.data.message);
            }finally{
                setIsSubmiting(false);
            }
        }
    });

    const [file, setFile] = useState({})
    const [fileError, setFileError] = useState('');

    
    return (
        <>
            <ToastContainer/>
            <div className="register_page_wrapper">
            <div className="register_box">
                <div className="card card-pages shadow-none">
                    <div className="card-body">
                        <div className="text-center m-t-0 m-b-15">
                            <Link to={'/'} className="logo logo-admin">
                                <img src={logo} height="40" alt="" />
                            </Link>
                        </div>
                        <h5 className="font-18 text-center mt-4">Sign Up</h5>

                        <form className="form-horizontal m-t-30" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Fullname</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder=""
                                    autoComplete={'off'}
                                    name={'fullname'}
                                    value={values.fullname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    touched.fullname && errors.fullname ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.fullname}</li>
                                        </ul>
                                    ): null
                                }
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder=""
                                    autoComplete={'off'}
                                    name={'address'}
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    touched.address && errors.address ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.address}</li>
                                        </ul>
                                    ): null
                                }
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder=""
                                    autoComplete={'off'}
                                    name={'phone'}
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    touched.phone && errors.phone ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.phone}</li>
                                        </ul>
                                    ): null
                                }
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder=""
                                    autoComplete={'off'}
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    touched.email && errors.email ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.email}</li>
                                        </ul>
                                    ): null
                                }
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder=""
                                    autoComplete={'off'}
                                    name={'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    touched.password && errors.password ? (
                                        <ul className="parsley-errors-list filled">
                                            <li>{errors.password}</li>
                                        </ul>
                                    ): null
                                }
                            </div>

                            <div className="form-group">
                            <label>Profile</label>
                            <input type="file"
                                className="form-control-file"
                                placeholder=""
                                autoComplete={'off'}
                                onChange={(event) => {
                                    setFileError('')
                                    setFile(event.currentTarget.files[0]);
                                  }}
                                accept="image/*"
                            />
                            {
                                fileError ? (
                                    <ul className="parsley-errors-list filled">
                                        <li>{fileError}</li>
                                    </ul>
                                ): null
                            }
                        </div>

                            <div className="form-group text-center m-t-20">
                                <div className="col-12">
                                    {
                                        isSubmiting ? (
                                            <button className="btn btn-primary btn-block btn-lg waves-effect waves-light">
                                                Registering..
                                            </button>
                                        ):
                                            (
                                                <button className="btn btn-primary btn-block btn-lg waves-effect waves-light"
                                                        type="submit">Register
                                                </button>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="form-group row m-t-30 m-b-0">
                                <div className="col-sm-7">
                                    Already a member? <Link to={'/user/login'} className="text-muted text-decoration-none"> Login Here</Link>
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

export default RegisterPage;