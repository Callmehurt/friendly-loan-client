import { useState } from "react";
import { notifyError, notifySuccess } from "../../../toast.notification";
import { loanApplicationSchem } from "../../../validation-schema";
import { useFormik } from "formik";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import GuarantorModal from "./GuarantorModal";

const LoanApplicationForm = ({onLoanRequestSuccess}) => {

    const axiosPrivate = useAxiosPrivate();

    const [isLoading, setIsLoading] = useState(false);
    const [userGroups, setUserGroups] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);

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

    //guarantors
    const [guarantorIds, setGuarantorIds] = useState([]);

    const initialValues = {
        principalAmount: 0,
        groupId: '',
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
                    principalAmount: values.principalAmount,
                    guarantorIds: guarantorIds
                });

                if(res.status === 200){
                    notifySuccess(res.data.message);
                    action.resetForm()
                    onLoanRequestSuccess();
                    setInterest(0);
                }
                setIsLoading(false);

            }catch(err){
                console.log(err);
                setIsLoading(false);
                notifyError(err.response.data.message);
                if(err.response.status == 705){
                    fetchGroupMembers(values.groupId);
                    setShow(true);
                }
            }
        }
    });

    //fetch group members
    const fetchGroupMembers = async (groupId) => {
        try{

            const res = await axiosPrivate.get(`/user/group/${groupId}/members`);
            console.log(res.data.members);
            
            setGroupMembers(res.data.members)

        }catch(err){
            console.log('failed to fetch group members', err);
            
        }
    }

    //interest rate
    const [interest, setInterest] = useState(0);

    const fetchInterest = async (amount) => {
        try{

            const res = await axiosPrivate.post('/loan/fetch/interest/rate', {
                principalAmount: amount || 0
            });

            if(res.data){
                setInterest(res.data);
            }else{
                setInterest(0);
            }

            console.log(res);
        }catch(err){
            console.log('error fetching interest', err);
            
        }
    }

    const handleCombinedChange = (event) => {
        handleChange(event);
        fetchInterest(event.target.value);
    };

    //for group member search modal
    const [show, setShow] = useState(false);

    const updateGuarantor = (id) => {
        setGuarantorIds(prevGuarantors => {
            if (prevGuarantors.includes(id)) {
                return prevGuarantors.filter(guarantorId => guarantorId !== id);
            } else {
                return [...prevGuarantors, id];
            }
        });        
    }

    return (
        <>
        <GuarantorModal show={show} setShow={setShow} groupMembers={groupMembers} guarantors={guarantorIds} updateGuarantor={updateGuarantor}/>
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
                    onChange={handleCombinedChange}
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
            <div className="form-group">
                <label>Interest Amount</label>
                <input type="text"
                    className="form-control"
                    placeholder={interest}
                    autoComplete={'off'}
                    disabled
                />
            </div>
            {
                isLoading ? <button className="submit_button" type="button">Processing..</button>
                : <button className="submit_button" type="submit">Proceed Request</button>
            }
        </form>
        </>
    );
}

export default LoanApplicationForm;