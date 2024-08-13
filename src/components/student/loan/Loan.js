import CountUp from 'react-countup';
import LoanApplicationForm from './LoanApplicationForm';
import LoanHistory from './LoanHistory';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useCallback, useEffect, useState } from 'react';
import GuarantorRequest from './GuarantorRequest';

const LoanPage = () => {

    const axiosPrivate = useAxiosPrivate();

    const [loanHistory, setLoanHistory] = useState([]);
    const [guarantorRequests, setGuarantorRequests] = useState([]);

    const fetchLoanData = useCallback( async () => {
        try{

            const response = await axiosPrivate.get('/loan/my/all/loans');
            setLoanHistory(response.data);
            
        }catch(err){
            console.log('Error fetching loan data', err);
        }
    }, []);

    const fetchLoanGuarantorData = useCallback( async () => {
        try{

            const response = await axiosPrivate.get('/loan/my/all/loan/guarantor/requests');
            setGuarantorRequests(response.data);
            
        }catch(err){
            console.log('Error fetching loan data', err);
        }
    }, []);

    useEffect(() => {
        fetchLoanData();
        fetchLoanGuarantorData();
    }, [fetchLoanData, fetchLoanGuarantorData])
    

    return (
        <>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">My Loans</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
            <div className='col-lg-4'>
                <div className='card'>
                    <div className='card-body'>
                        <h6 className='card-title' style={{ fontSize: '17px', fontWeight: '600'}}>Apply for Loan</h6>
                        <hr></hr>
                        <LoanApplicationForm onLoanRequestSuccess={fetchLoanData} />
                    </div>
                </div>
            </div>
            <div className="col-lg-5">
                <div className="card">
                    <div className="card-body">
                        <div className="loan_detail_section">
                            <div className="l_child">
                                <p>Total Loan Balance</p>
                                <p><span>GBP(£)</span> <CountUp start={0} end={50000} decimals={2} /></p>
                                <div className="divider"></div>
                            </div>
                            <div className="l_child">
                                <p>Total Interest Paid</p>
                                <p><span>GBP(£)</span> <CountUp start={0} end={1000} decimals={2} /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="card">
                    <div className="card-body">
                    <h6 className='card-title' style={{ fontSize: '17px', fontWeight: '600'}}>Emergency Loans</h6>
                    <p style={{ marginTop: '15px', color: '#EA2525' }}>Application is required at least a day before 
                    for amount ranging from £100 to £300.</p>
                    <p style={{color: '#EA2525' }}>
                            Application is required at least 3 days before 
                            for amount ranging from £300 to £1000. 
                            Repayment can be split into two periods
                    </p>
                    <button className='submit_button'>Submit Application</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <LoanHistory loanHistory={loanHistory}/>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <GuarantorRequest guarantorRequests={guarantorRequests}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default LoanPage;