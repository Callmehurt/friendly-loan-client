import '../../styles/filtered-member.css'
import { Image } from 'react-bootstrap';
import avatar from '../../images/customerAvatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faLocationDot, faHashtag, faEnvelope, faPlusCircle, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const FilteredMember = ({details, enrollMember}) => {

    const {fullname, address, uniqueIdentity, email, id} = details;

    const group = useSelector((state) => state.group);
    
    const existedMember = group.groupMembers.find(member => member.user.uniqueIdentity === uniqueIdentity);

    const [loading, setIsLoading] = useState(false)

    const handleEnroll = async (id) => {
        setIsLoading(true);
        enrollMember(id);
    }

    return (
        <>
        <div className='filter-wrapper' key={id}>
            <div className='profile-wrapper'>
                <Image src={avatar} roundedCircle fluid={true} />
            </div>
            <div className='info-wrapper'>
                <span><FontAwesomeIcon icon={faTag} className={'mr-1'} /> {uniqueIdentity}</span><br/>
                <span><FontAwesomeIcon icon={faHashtag} className={'mr-1'} /> {fullname}</span><br/>
                <span><FontAwesomeIcon icon={faEnvelope} className={'mr-1'} /> {email}</span><br/>
                <span><FontAwesomeIcon icon={faLocationDot} className={'mr-1'} /> {address}</span><br/>
            </div>
            <div className='action-wrapper'>
                {
                    existedMember ? (
                        <button className='btn btn-sm btn-success'><FontAwesomeIcon icon={faCheckCircle} className={'mr-1'} /> Enrolled</button>
                    ):(
                        <button className='btn btn-sm btn-primary' onClick={() => handleEnroll(id)}>
                            {
                                loading ? (
                                    <FontAwesomeIcon icon={faSpinner} className={'mr-1'} />
                                ): (
                                    <FontAwesomeIcon icon={faPlusCircle} className={'mr-1'} />
                                )
                            }
                            Enroll
                            </button>
                    )
                }
            </div>
        </div>
        </>
    )

}

export default FilteredMember;