import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const SingleLoan = () => {

    const {reference} = useParams();

    const axiosPrivate = useAxiosPrivate();




    return (
        <>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Loan</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h4></h4>
            </div>
        </div>
        </>
    )
}

export default SingleLoan;