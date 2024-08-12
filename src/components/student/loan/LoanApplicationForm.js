import { useState } from "react";
import { notifyError, notifySuccess } from "../../../toast.notification";
import { loanApplicationSchem } from "../../../validation-schema";
import { useFormik } from "formik";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const LoanApplicationForm = () => {

    const axiosPrivate = useAxiosPrivate();

    const [isLoading, setIsLoading] = useState(false);

    const [userGroups, setUserGroups] = useState([]);

    //fetch user enrolled groups
    useQuery({
        queryKey: ['userEnrolledGroups'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/user/group/user/enrolled');
            console.log(res);
            setUserGroups(await res?.data);
            return await res.data;
        }
    })

    const initialValues = {
        principalAmount: 0,
        groupId: ''
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: loanApplicationSchem,
        onSubmit: async (values, action) => {

            setIsLoading(true);
            try{

                const res = await axiosPrivate.post('/loan/user/request/loan', {
                    groupId: values.groupId,
                    principalAmount: values.principalAmount
                });

                if(res.status === 200){
                    notifySuccess(res.data.message);
                    action.resetForm()
                }
                setIsLoading(false);
                console.log(res);

            }catch(err){
                console.log(err);
                setIsLoading(false);
                notifyError(err.response.data.message);
            }
        }
    });


    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Group</label>
                <select type="text"
                    className="form-control"
                    placeholder=""
                    autoComplete={'off'}
                    name={'groupId'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    {
                        userGroups.length > 0 ? (
                            <>
                            <option value={''} selected={values.groupId === '' ? true : false}>-- Choose a Saving Group --</option>
                            {
                                userGroups.map((grp) => {
                                    return <option value={grp.id} defaultChecked={grp.id === values.groupId ? true : false}>{grp.id} || {grp.name}</option>
                                })
                            }
                            </>
                        ): (
                            <option value={''}>-- No Record Found --</option>
                        )
                    }
                </select>
                {
                    touched.groupId && errors.groupId ? (
                        <ul className="parsley-errors-list filled">
                            <li>{errors.groupId}</li>
                        </ul>
                    ): null
                }
            </div>
            <div className="form-group">
                <label>Principal Amount</label>
                <input type="text"
                    className="form-control"
                    placeholder=""
                    autoComplete={'off'}
                    name={'principalAmount'}
                    value={values.principalAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {
                    touched.principalAmount && errors.principalAmount ? (
                        <ul className="parsley-errors-list filled">
                            <li>{errors.principalAmount}</li>
                        </ul>
                    ): null
                }
            </div>
            {
                isLoading ? <button className="btn btn-primary" type="button">Processing..</button>
                : <button className="btn btn-primary" type="submit">Proceed Request</button>
            }
        </form>
        </>
    );
}

export default LoanApplicationForm;