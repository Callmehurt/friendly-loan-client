import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CountUp from 'react-countup';
import LoanInterestChart from "../shared-components/charts/LoanInterestChart";
import moment from "moment";

const StudentDashboard = () => {

    const axiosPrivate = useAxiosPrivate();

    const [contributionState, setContributionState] = useState({
        currentMonth: 0,
        tillNow: 0,
        currentMonthCount: 0,
        tillNowCount: 0
        });

    
    const [totalLoanAndInterest, setTotalLoanAndInterest] = useState({
        totalLoan: 0,
        totalInterest: 0,
        numberOfPayments: 0,
    });

    const [paymentDeadlineSoon, setPaymentDeadlineSoon] = useState([]);
        
    const fetchContributionData = useCallback( async() => {
        try{

            const response = await axiosPrivate.get('/contribution/user/total/contributions');
            
            setContributionState({
                currentMonth: response.data.currentMonth,
                tillNow: response.data.tillNow,
                currentMonthCount: response.data.currentMonthCount,
                tillNowCount: response.data.tillNowCount
            });

        }catch(err){
            console.log('Error fetching contribution data', err);
        }
    }, [axiosPrivate]);

    const fetchTotalLoanAndInterest = useCallback( async () => {
        try{

            const response = await axiosPrivate.get('/loan/my/all/total/loans');
            
            setTotalLoanAndInterest({
                totalLoan: response?.data?.totalLoanAmount,
                totalInterest: response?.data?.totalInterestAmount,
                numberOfPayments: response?.data?.numberOfPayments
            });
            
        }catch(err){
            console.log('Error fetching loan data', err);
        }
    }, [axiosPrivate]);

    const paymentDeadlineSoonLoans = useCallback( async () => {
        try{

            const res = await axiosPrivate.get('/loan/payment/deadline/soon');
            setPaymentDeadlineSoon(res.data);
            
        }catch(err){
            console.log('Error fetching loan data', err);
        }
    }, [axiosPrivate])

    const calculateInterestAmount = (principalAmount, interestRate) => {
        return (interestRate * principalAmount / 100 * 1);
    }

    useEffect(() => {

        fetchContributionData();
        fetchTotalLoanAndInterest();
        paymentDeadlineSoonLoans();

    }, [fetchContributionData, fetchTotalLoanAndInterest, paymentDeadlineSoonLoans]);

    return (
        <>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-5">
                <div className="card">
                    <div className="card-body">
                        <div className="dashboard_contribution_section dashboard_cards">
                            <h6>Total Contributions</h6>

                            <div className="contribution_detail_wrapper d-flex justify-content-between">
                                <div className="child1">
                                    <p className="fw-bold fs-5"><CountUp start={0} end={contributionState.currentMonthCount} decimals={0} /></p>
                                    <p className="fs-6" style={{ fontWeight: '500' }}>This Month</p>
                                    <p style={{ fontSize: '12px' }}>£ <CountUp start={0} end={contributionState.currentMonth} decimals={2} /></p>
                                    <div className="contribution_divider"></div>
                                </div>
                                <div className="child2">
                                    <p className="fw-bold fs-5"><CountUp start={0} end={contributionState.tillNowCount} decimals={0} /></p>
                                    <p className="fs-6" style={{ fontWeight: '500' }}>Till Now</p>
                                    <p style={{ fontSize: '12px' }}>£ <CountUp start={0} end={contributionState.tillNow} decimals={2} /></p>
                                    <div className="contribution_divider"></div>
                                </div>
                                <div className="child3">
                                    <p className="fw-bold fs-5">{totalLoanAndInterest.numberOfPayments}</p>
                                    <p className="fs-6" style={{ fontWeight: '500' }}>Interest Paid</p>
                                    <p style={{ fontSize: '12px' }}>£ <CountUp start={0} end={totalLoanAndInterest.totalInterest} decimals={2} /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                        <div className="dashboard_cards">
                        <h6>Loan/ Interest Ratio</h6>
                        <div className="dashboard_card_body">
                            <LoanInterestChart loan={totalLoanAndInterest.totalLoan} interest={totalLoanAndInterest.totalInterest} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <div className="dashboard_cards">
                        <h6>Upcoming Deadlines</h6>
                        <div className="dashboard_card_body responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Loan</th>
                                        <th>Principle Amount</th>
                                        <th>Interest Amount</th>
                                        <th>Deadline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paymentDeadlineSoon.length > 0 ? (
                                            paymentDeadlineSoon.map((loan, index) => (
                                                <tr key={index}>
                                                    <td>{loan.reference}</td>
                                                    <td>£ {loan.principalAmount}</td>
                                                    <td>£ {calculateInterestAmount(loan.principalAmount, loan.interestRate)}</td>
                                                    <td>{moment(loan.loanEndDate).format('LL')}</td>
                                                </tr>
                                            ))
                                        ): (
                                            <tr>
                                                <td colSpan="4" className="text-center">No upcoming deadlines</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default StudentDashboard;