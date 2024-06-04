import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"; 
import { Link } from "react-router-dom";

const GroupCard = ({group, currentAuthState}) => {

    const {id, name, description} = group;
    
    return (
        <>
            <div className="card m-b-30">
                <img className="card-img-top img-fluid" src="https://picsum.photos/seed/picsum/300/200" alt="Card image cap" />
                <div className="card-body">
                    <h4 className="card-title font-16 mt-0">{name}</h4>
                    <p className="card-text">{description}</p>
                    <Link to={`/${currentAuthState.user.role.toLowerCase()}/group/${id}`} className="btn btn-sm btn-primary waves-effect waves-light"><FontAwesomeIcon icon={faCircleInfo} className={'mr-1'} /> View Group</Link>
                </div>
            </div>
        </>
    )
}

export default GroupCard;