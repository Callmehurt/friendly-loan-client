import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CountUp from 'react-countup';
import LoanInterestChart from "../shared-components/charts/LoanInterestChart";

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
        totalInterestPaid: 0,
    });
        
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
    }, []);

    const fetchTotalLoanAndInterest = useCallback( async () => {
        try{

            const response = await axiosPrivate.get('/loan/my/all/total/loans');
            setTotalLoanAndInterest({
                totalLoan: response.data.totalLoanAmount,
                totalInterest: response.data.totalInterestAmount,
                totalLoanPaid: response.data.totalLoanPaid
            });
            
        }catch(err){
            console.log('Error fetching loan data', err);
        }
    }, []);

    useEffect(() => {

        fetchContributionData();
        fetchTotalLoanAndInterest();

    }, [fetchContributionData, fetchTotalLoanAndInterest]);

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
                                    <p className="fw-bold fs-5">8</p>
                                    <p className="fs-6" style={{ fontWeight: '500' }}>Interest Paid</p>
                                    <p style={{ fontSize: '12px' }}>£ <CountUp start={0} end={totalLoanAndInterest.totalInterestAmount} decimals={2} /></p>
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
                            <LoanInterestChart />
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
                        <div className="dashboard_card_body">
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