import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useCallback, useEffect, useState } from "react";
import moment from "moment/moment";

const SingleLoan = () => {

    const {reference} = useParams();

    const axiosPrivate = useAxiosPrivate();

    const [loanDetail, setLoanDetail] = useState({});
    const [interestAmount, setInterestAmount] = useState(0);

    const fetchLoanDetail = useCallback( async() => {
        try {
            const response = await axiosPrivate.get(`/loan/fetch/loan/${reference}`);
            console.log(response.data);
            setLoanDetail(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [reference, axiosPrivate])

    useEffect(() => {

        fetchLoanDetail();

    }, [fetchLoanDetail])

    useEffect(() => {
        const interestAmount = loanDetail.interestRate * loanDetail.principalAmount / 100 * 1;

        setInterestAmount(interestAmount);

    }, [loanDetail])

    
    return (
        <>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Loan | {loanDetail?.reference}</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h5>Loan Reference: {loanDetail.reference}</h5>
                <div className="card mt-4">
                    <div className="card-body">
                        <div className="loan_detail_holder">
                            <p>Loan Amount</p>
                            <p>£ {loanDetail?.principalAmount}</p>
                            {
                                loanDetail?.status === 'active' ? <button className="loan_badge_active">{loanDetail?.status}</button> : loanDetail?.status === 'completed' ? <button className="loan_badge_active">{loanDetail?.status}</button> : <button className="loan_badge_other">{loanDetail?.status}</button>
                            }
                        </div>
                        <div className="loan_amount_info">
                            <div className="info_child">
                                <p>Group</p>
                                <p>{loanDetail?.group?.name}</p>
                            </div>
                            <div className="info_child">
                                <p>Interest Rate</p>
                                <p>{loanDetail?.interestRate}%</p>
                            </div>
                            <div className="info_child">
                                <p>Interest Amount</p>
                                <p>£ {interestAmount}</p>
                            </div>
                            <div className="info_child">
                                <p>Loan Start Date</p>
                                <p>{loanDetail?.loanStartDate ? moment(loanDetail?.loanStartDate).format('LLL') : ''}</p>
                            </div>
                            <div className="info_child">
                                <p>Loan End Date</p>
                                <p>{loanDetail?.loanEndDate ? moment(loanDetail?.loanEndDate).format('LLL') : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                    <h6 style={{ fontSize: '17px', fontWeight: '600', marginLeft: '10px' }}>Loan Guarantor</h6>
                        <div className="guarantor_list">
                            {
                                loanDetail?.guarantors?.map((guarantor, index) => (
                                    <div className="guarantor">
                                        <div className="g_child">
                                            <div className="profile_pic">
                                                <img src={guarantor?.guarantor.profile} alt="profile_pic" />
                                            </div>
                                        </div>
                                        <div className="g_child">
                                            <p style={{ fontSize: '16px', marginTop: '15px' }}>{guarantor?.guarantor?.fullname}</p>
                                            <p>{
                                                guarantor?.status === 'requested' ?
                                                <span className="badge badge-sm badge-primary">pending</span> :
                                                guarantor?.status === 'approved' ? <span className="badge badge-sm badge-success">{guarantor?.status}</span> :
                                                <span className="badge badge-sm badge-danger">{guarantor?.status}</span>
                                                }</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleLoan;