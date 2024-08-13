// import '../../../styles/filtered-member.css'
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const MemberListCard = ({details, guarantors, updateGuarantor}) => {

    const {fullname, profile, email, id} = details;

    return (
        <>
        <div className='filter-wrapper' key={id}>
            <div className='profile-wrapper'>
                <Image src={profile} fluid={true} />
            </div>
            <div className='info-wrapper'>
                <p>{fullname}</p>
                <p>{email}</p>
            </div>
            <div className='action-wrapper'>
                {
                    guarantors.includes(id) ? (
                        <button className='enroll_process' onClick={() => updateGuarantor(id)}>Remove</button>
                    ): (
                        <button className='enroll_process' onClick={() => updateGuarantor(id)}>Request</button>
                    )
                }
                
            </div>
        </div>
        </>
    )

}

export default MemberListCard;