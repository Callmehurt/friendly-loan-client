import React from "react";

const StudentDashboard = () => {

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
                                    <p className="fw-bold fs-5">15</p>
                                    <p className="fs-6" style={{ fontWeight: '500' }}>This Month</p>
                                    <p style={{ fontSize: '12px' }}>£ 2000</p>
                                    <div className="contribution_divider"></div>
                                </div>
                                <div className="child2">
                                    <p className="fw-bold fs-5">55</p>
                                    <p className="fs-6" style={{ fontWeight: '500' }}>Till Now</p>
                                    <p style={{ fontSize: '12px' }}>£ 200</p>
                                    <div className="contribution_divider"></div>
                                </div>
                                <div className="child3">
                                    <p className="fw-bold fs-5">8</p>
                                    <p className="fs-6" style={{ fontWeight: '500' }}>Interest Paid</p>
                                    <p style={{ fontSize: '12px' }}>£ 1500</p>
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