import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"; 
import { Link } from "react-router-dom";
import gradient from '@privjs/gradients'

const GroupCard = ({group, currentAuthState}) => {

    const {id, name, description} = group;

    const gradientStyle = {
        backgroundImage: gradient({description}),
        color: 'white'
    }
    
    return (
        <>
            <div className="card m-b-30" style={gradientStyle}>
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