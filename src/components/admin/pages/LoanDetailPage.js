import { useParams } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import moment from "moment";
import { notifyError, notifySuccess } from "../../../toast.notification";

const LoanDetailPage = () => {

    const {reference} = useParams();

    const axiosPrivate = useAxiosPrivate();

    const [loanDetail, setLoanDetail] = useState({});
    const [userTotalGroupContribution, setUserTotalGroupContribution] = useState(0);

    const fetchLoanDetail = useCallback( async() => {
        try {
            const response = await axiosPrivate.get(`/loan/fetch/loan/${reference}`);
            console.log(response.data);
            setLoanDetail(response.data);
            fetchUserTotalGroupContribution(response.data.groupId, response.data.userId);
        } catch (error) {
            console.log(error);
        }
    }, [reference, axiosPrivate])

    const fetchUserTotalGroupContribution = useCallback( async(groupId, userId) => {
        try{
            const res = await axiosPrivate.get(`/contribution/user/total/contribution/${groupId}/${userId}`);
            console.log(res.data);
            setUserTotalGroupContribution(res.data);
            
        }catch(err){
            console.log('error fetching user total group contribution', err);
            
        }
    }, [axiosPrivate])

    useEffect(() => {

        fetchLoanDetail();
    }, [fetchLoanDetail])


    function calculateTotalAmountPerUser(contributions, userId) {
        return contributions.reduce((total, contribution) => {
            if (contribution.userId === userId) {
                return total + parseInt(contribution.amount);
            }
            return total;
        }, 0);      
    }


    //approve loan
    const approveLoan = async() => {
        try{

            const res = await axiosPrivate.post('/loan/manage/loan/request', {
                loanId: loanDetail?.id,
                decision: 'active'
            });

            if(res.status === 200){
                fetchLoanDetail();
                notifySuccess(res?.data.message);
            }            
        }catch(err){
            notifyError('Error approving loan');
            console.log('error approving loan', err);
        }
    }

    //approve loan
    const rejectLoan = async() => {
        try{

            const res = await axiosPrivate.post('/loan/manage/loan/request', {
                loanId: loanDetail?.id,
                decision: 'rejected'
            });
            if(res.status === 200){
                fetchLoanDetail();
                notifySuccess(res?.data.message);
            }  
        }catch(err){
            notifyError('Error rejecting loan');
            console.log('error rejecting loan', err);
        }
    }

    return (
        <>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Loan | {reference}</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                    <h5 style={{ padding: '10px' }}>Guarantor Information</h5>
                    <div className="responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Fullname</th>
                                    <th>Address</th>
                                    <th>Contact</th>
                                    <th>Contribution</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loanDetail && loanDetail?.guarantors?.length > 0 ? (
                                        loanDetail?.guarantors?.map((gtr, index) => (
                                            <tr key={index}>
                                                <td>{gtr?.guarantor.fullname}</td>
                                                <td>{gtr?.guarantor.address}</td>
                                                <td>{gtr?.guarantor.phone}</td>
                                                <td>£ {calculateTotalAmountPerUser(loanDetail?.group.contributions, loanDetail?.userId)}</td>
                                                <td>
                                                    {
                                                        gtr?.status === 'approved' ? <span className="badge badge-sm badge-success">Agreed</span> :
                                                        gtr?.status === 'rejected' ? <span className="badge badge-sm badge-danger">Rejected</span> :
                                                        <span className="badge badge-sm badge-primary">Pending</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    ): (
                                        <tr>
                                            <td colSpan="5" className="text-center">No Guarantor Found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="loan_decision_btn">
                        {
                            loanDetail?.status === 'active' ? <span className="badge badge-sm badge-success">Active</span> :
                            loanDetail?.status === 'pending' ? (
                                <>
                                    <button className="loan_approve_btn" onClick={approveLoan}>Approve</button>
                                    <button className="loan_reject_btn" onClick={rejectLoan}>Reject</button>
                                </>
                            ) : loanDetail?.status === 'completed' ? <span className="badge badge-sm badge-success">Completed</span> : <span className="badge badge-sm badge-danger">Rejected</span>
                        }

                    </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h6 style={{ fontSize: '17px', fontWeight: '600', marginLeft: '10px' }}>Loan Payment</h6>
                        <div className="responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Principal Amount</th>
                                        <th>Interest Amount</th>
                                        <th>Paid Amount</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loanDetail?.payments.length > 0 ? (
                                            loanDetail?.payments?.map((payment, index) => (
                                                <tr key={index}>
                                                    <td>£ {payment.principalAmount}</td>
                                                    <td>£ {payment.interestAmount}</td>
                                                    <td>£ {payment.paymentAmount}</td>
                                                    <td>{moment(payment.paymentDate).format('LLL')}</td>
                                                </tr>
                                            ))
                                        ): (
                                            <tr>
                                                <td colSpan="4" className="text-center">No payment made</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h5 style={{ padding: '10px' }}>Personal Information</h5>
                        <div className="admin_loan_detail">
                            <div>
                                <p><strong>Full Name: </strong> {loanDetail?.user?.fullname}</p>
                                <p><strong>Email: </strong> {loanDetail?.user?.email}</p>
                            </div>
                            <div>
                                <p><strong>Contact: </strong> {loanDetail?.user?.phone}</p>
                                <p><strong>Address: </strong> {loanDetail?.user?.address}</p>
                            </div>
                        </div>
                        <hr />
                        <h5 style={{ padding: '10px' }}>Financial Information</h5>
                        <div className="admin_loan_detail">
                            <div>
                                <p><strong>Loan Amount: </strong> £ {loanDetail?.principalAmount}</p>
                            </div>
                            <div>
                                <p><strong>Total Contribution: </strong> £ {userTotalGroupContribution}</p>
                            </div>
                        </div>
                        <hr />
                        <h5 style={{ padding: '10px' }}>Loan Information</h5>
                        <div className="admin_loan_detail">
                            <div>
                                <p><strong>Reference No: </strong> {loanDetail?.reference}</p>
                                <p><strong>Interest Rate: </strong> {loanDetail?.interestRate}%</p>
                            </div>
                            <div>
                                <p><strong>Group: </strong> {loanDetail?.group?.name}</p>
                                <p><strong>Request Date: </strong> {moment(loanDetail?.createAt).format('LLL')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoanDetailPage;