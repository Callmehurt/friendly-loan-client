import { useEffect, useCallback, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import { Link } from "react-router-dom";


const AdminDashboard = () => {


    const axiosPrivate = useAxiosPrivate();


    const [deadlineSoonLoans, setDeadlineSoonLoans] = useState([]);
    const [newLoanRequests, setNewLoanRequests] = useState([]);
    const [dashboardCount, setDashboardCount] = useState({
        memberCount: 0,
        groupCount: 0,
        contributionTotal: 0,
        interestTotal: 0
    })

    const fetchDashboardCounts = useCallback(async() => {
        try{
            
            const res = await axiosPrivate.get('/dashboard/count/data');
            setDashboardCount({
                memberCount: res.data.memberCount,
                groupCount: res.data.groupCount,
                contributionTotal: res.data.contributionTotal,
                interestTotal: res.data.interestTotal
            })
            console.log(res.data);
            

        }catch(err){
            console.log(err);
            
        }
    }, [axiosPrivate])


    const fetchDeadlineSoonLoans = useCallback( async () => {
        try{
            const response = await axiosPrivate.get('/loan/active/loans/deadline/soon');
            setDeadlineSoonLoans(response.data);
        }catch(err){
            console.log(err);
        }
    }, [axiosPrivate]);

    const fetchNewLoanRequest = useCallback( async () => {
        try{
            const response = await axiosPrivate.get('/loan/fetch/pending/loans');
            console.log('loan requests', response.data);
            
            setNewLoanRequests(response.data);
        }catch(err){
            console.log(err);
        }
    }, [axiosPrivate]);


    useEffect(() => {
        fetchDashboardCounts();
        fetchDeadlineSoonLoans();
        fetchNewLoanRequest();
    }, [fetchDashboardCounts, fetchDeadlineSoonLoans, fetchNewLoanRequest]);

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
            <div class="col-sm-6 col-xl-3">
                <div class="card">
                    <div class="card-heading p-4">
                        <div class="mini-stat-icon float-right">
                            <i class="mdi mdi-home-floor-g bg-danger  text-white"></i>
                        </div>
                        <div>
                            <h5 class="font-16">Total Groups</h5>
                        </div>
                        <h3 class="mt-4">{dashboardCount.groupCount}</h3>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3">
                <div class="card">
                    <div class="card-heading p-4">
                        <div class="mini-stat-icon float-right">
                            <i class="mdi mdi-account-group bg-primary  text-white"></i>
                        </div>
                        <div>
                            <h5 class="font-16">Total Members</h5>
                        </div>
                        <h3 class="mt-4">{dashboardCount.memberCount}</h3>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3">
                <div class="card">
                    <div class="card-heading p-4">
                        <div class="mini-stat-icon float-right">
                            <i class="mdi mdi-currency-gbp bg-info  text-white"></i>
                        </div>
                        <div>
                            <h5 class="font-16">Contribution Collected</h5>
                        </div>
                        <h3 class="mt-4">£ {dashboardCount.contributionTotal}</h3>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3">
                <div class="card">
                    <div class="card-heading p-4">
                        <div class="mini-stat-icon float-right">
                            <i class="mdi mdi-cash-multiple bg-success  text-white"></i>
                        </div>
                        <div>
                            <h5 class="font-16">Interest Collected</h5>
                        </div>
                        <h3 class="mt-4">£ {dashboardCount.interestTotal}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h6 style={{ fontSize: '20px' }}>New Loan Requests</h6>
                        <div className="responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Loan Reference</th>
                                        <th>Group</th>
                                        <th>Amount</th>
                                        <th>Loan By</th>
                                        <th>Deadline</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        newLoanRequests?.length > 0 ? (
                                            newLoanRequests.map(loan => (
                                                <tr key={loan.id}>
                                                    <td>{loan.reference}</td>
                                                    <td><strong>{loan.group.name}</strong></td>
                                                    <td><span className="badge badge-success"><strong>£{loan.principalAmount}</strong></span></td>
                                                    <td>{loan.user.fullname}</td>
                                                    <td>{moment(loan.loanEndDate).format('LL')}</td>
                                                    <td>
                                                        <Link to={`/admin/loan/manage/${loan.reference}`}><button className="btn btn-primary btn-sm">View</button></Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ): (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
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
                        <h6 style={{ fontSize: '20px' }}>Deadline Soon Active Loans</h6>
                        <div className="responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Loan Reference</th>
                                        <th>Group</th>
                                        <th>Amount</th>
                                        <th>Loan By</th>
                                        <th>Deadline</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        deadlineSoonLoans?.length > 0 ? (
                                            deadlineSoonLoans.map(loan => (
                                                <tr key={loan.id}>
                                                    <td>{loan.reference}</td>
                                                    <td><strong>{loan.group.name}</strong></td>
                                                    <td><span className="badge badge-success"><strong>£{loan.principalAmount}</strong></span></td>
                                                    <td>{loan.user.fullname}</td>
                                                    <td>{moment(loan.loanEndDate).format('LL')}</td>
                                                    <td>
                                                        <Link to={`/admin/loan/manage/${loan.reference}`}><button className="btn btn-primary btn-sm">View</button></Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ): (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
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
        </>
    )
}

export default AdminDashboard;