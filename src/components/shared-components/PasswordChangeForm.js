import { useState } from "react";
import { passwordChangeSchema } from "../../validation-schema";
import { useFormik } from "formik";
import { notifyError, notifySuccess } from "../../toast.notification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PasswordChangeForm = () => {

    const axiosPrivate = useAxiosPrivate();


    const [isLoading, setIsLoading] = useState(false)

    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    }


    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: passwordChangeSchema,
        onSubmit: async (values, action) => {

            setIsLoading(true);
            try{

                const res = await axiosPrivate.put('/user/change-password', {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                });
                if(res.status === 200){
                    notifySuccess('Password updated successfully');
                    action.resetForm();
                }
                
            }catch(err){
                console.log(err);
                notifyError(err.response.data.message);
            }finally{
                setIsLoading(false);
            }
        }
    });

    return (
        <>
        <div className="card">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder=""
                        autoComplete={'off'}
                        name={'currentPassword'}
                        value={values.currentPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.currentPassword && errors.currentPassword ? (
                            <ul className="parsley-errors-list filled">
                                <li>{errors.currentPassword}</li>
                            </ul>
                        ): null
                    }
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder=""
                        autoComplete={'off'}
                        name={'newPassword'}
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.newPassword && errors.newPassword ? (
                            <ul className="parsley-errors-list filled">
                                <li>{errors.newPassword}</li>
                            </ul>
                        ): null
                    }
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder=""
                        autoComplete={'off'}
                        name={'confirmPassword'}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.confirmPassword && errors.confirmPassword ? (
                            <ul className="parsley-errors-list filled">
                                <li>{errors.confirmPassword}</li>
                            </ul>
                        ): null
                    }
                </div>
                
                {
                    isLoading ? <button className="submit_button" type="button">Processing..</button>
                    : <button className="submit_button" type="submit">Update Password</button>
                }
            </form>
            </div>
        </div>
        </>
    )
}

export default PasswordChangeForm;