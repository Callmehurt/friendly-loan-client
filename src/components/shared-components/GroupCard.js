import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; 
import { Link } from "react-router-dom";

const GroupCard = ({group, currentAuthState}) => {

    const {id, name, description, thumbnail} = group;


    return (
        <>
            <div className="card m-b-30">
                <div className="card-body" style={{ padding: '0' }}>
                    <div className="group_detail_wrapper">
                        <div className="group_logo_holder">
                            <img src={thumbnail} className="rounded-circle" alt="group logo" />
                        </div>
                        <div className="group_detail_holder">
                            <h6>{id}</h6>
                            <h5>{name}</h5>
                            <p>{description}</p>

                            <div className="view-detail-wrapper">
                                <Link to={`/${currentAuthState.user.role.toLowerCase()}/group/${id}`}>
                                    <span className="view-detail-text">View Detail</span>
                                </Link>
                                <Link to={`/${currentAuthState.user.role.toLowerCase()}/group/${id}`}>
                                    <button className="circular-button">
                                        <FontAwesomeIcon icon={faArrowRight} size="xl" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupCard;