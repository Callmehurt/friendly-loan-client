import '../../styles/filtered-member.css'
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const FilteredMember = ({details, enrollMember}) => {

    const {fullname, profile , uniqueIdentity, email, id} = details;

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
                <Image src={profile} roundedCircle fluid={true} />
            </div>
            <div className='info-wrapper'>
                <p>{fullname}</p>
                <p>{email}</p>
            </div>
            <div className='action-wrapper'>
                {
                    existedMember ? (
                        <button className='enroll_success'>Enrolled</button>
                    ):(
                        <button className='enroll_process' onClick={() => handleEnroll(id)}>
                            {
                                loading ? (
                                    <FontAwesomeIcon icon={faSpinner} size='sm' />
                                ): 'Enroll'
                            }
                            </button>
                    )
                }
            </div>
        </div>
        </>
    )

}

export default FilteredMember;