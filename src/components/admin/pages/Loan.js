import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCircleCheck, faClipboardCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useCallback, useEffect, useState } from "react";
import LoansTable from "../datatables/LoansTable";


const LoanPage = () => {

    const axiosPrivate = useAxiosPrivate();

    const [loans , setLoans] = useState({
        pendingLoans: [],
        activeLoans: [],
        rejectedLoans: [],
        completedLoans: []
    })

    const fetchAllLoans = useCallback(async () => {
        try{

            const res = await axiosPrivate.get('/loan/fetch/all/loan/types');
            setLoans(res?.data);
            console.log(res?.data);

        }catch(err){
            console.log('error fetching loans', err);
            
        }
    }, [axiosPrivate]);


    useEffect(() => {
        fetchAllLoans();
    }, [fetchAllLoans])


    return (
        <>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Loans</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
                <div className="col-lg-12">
                    <ul className="nav nav-pills nav-justified" role="tablist">
                        <li className="nav-item waves-effect waves-light">
                            <a className="nav-link active" data-toggle="tab" href="#pending" role="tab">
                                <span className="d-none d-md-block">Pending [{loans.pendingLoans.length}]</span><span className="d-block d-md-none">
                                    <FontAwesomeIcon icon={faClock}/>
                            </span>
                            </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                            <a className="nav-link" data-toggle="tab" href="#active" role="tab">
                                <span className="d-none d-md-block">Active [{loans.activeLoans.length}]</span><span className="d-block d-md-none">
                                <FontAwesomeIcon icon={faCircleCheck}/>
                            </span>
                            </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                            <a className="nav-link" data-toggle="tab" href="#rejected" role="tab">
                                <span className="d-none d-md-block">Rejected [{loans.rejectedLoans.length}]</span><span className="d-block d-md-none">
                                <FontAwesomeIcon icon={faSquareXmark}/>
                            </span>
                            </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                            <a className="nav-link" data-toggle="tab" href="#completed" role="tab">
                                <span className="d-none d-md-block">Completed [{loans.completedLoans.length}]</span><span className="d-block d-md-none">
                                <FontAwesomeIcon icon={faClipboardCheck}/>
                            </span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                         <div className="tab-pane active p-3 pt-3" id="pending" role="tabpanel">
                            <LoansTable loanData={loans.pendingLoans} />
                        </div>
                        <div className="tab-pane p-3 pt-3" id="active" role="tabpanel">
                            <LoansTable loanData={loans.activeLoans} />
                        </div>
                        <div className="tab-pane p-3 pt-3" id="rejected" role="tabpanel">
                            <LoansTable loanData={loans.rejectedLoans} />
                        </div>
                        <div className="tab-pane p-3 pt-3" id="completed" role="tabpanel">
                            <LoansTable loanData={loans.completedLoans} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoanPage;