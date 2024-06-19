import CountUp from 'react-countup';
import LoanApplicationForm from './LoanApplicationForm';

const LoanPage = () => {

    document.title = "Friendly Loan || My Loans"   

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
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-4'>
                                <div>
                                    <h6>TOTAL LOAN BALANCE</h6>
                                    <span style={{ color: '#114185', fontWeight: '500' }}>GBP(£) </span><span style={{ fontSize: '25px', fontWeight: '700', color: '#114185' }}><CountUp start={0} end={50000} decimals={2} /></span>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div>
                                    <h6>TOTAL INTEREST</h6>
                                    <span style={{ color: '#114185', fontWeight: '500' }}>GBP(£) </span><span style={{ fontSize: '25px', fontWeight: '700', color: '#114185' }}><CountUp start={0} end={3000} decimals={2} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-4'>
                <div className='card'>
                    <div className='card-body'>
                        <h6 className='card-title'>APPLY FOR LOAN</h6>
                        <hr></hr>
                        <LoanApplicationForm/>
                    </div>
                </div>
            </div>
            <div className='col-lg-12'>
                <div className='card'>
                    <div className='card-body'>
                        <h6 className='card-title'>PAYMENT HISTORY</h6>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default LoanPage;