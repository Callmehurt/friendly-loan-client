import avatar from '../../images/customerAvatar.png';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faLocationDot, faAddressBook, faEnvelope } from '@fortawesome/free-solid-svg-icons';


const MemberCard = ({member}) => {

    const {id, uniqueIdentity, fullname, address, email, phone} = member;

    return (
        <div className="member-wrapper" key={id}>
            <div className="image-wrapper">
                <div className="image-circle">
                    <Image src={avatar} roundedCircle fluid={true} />
                </div>
            </div>
            <div className="info-wrapper">
                <p>{fullname}</p>
                <span><FontAwesomeIcon icon={faTag} className={'mr-1'} /> {uniqueIdentity}</span><br/>
                <span><FontAwesomeIcon icon={faLocationDot} className={'mr-1'} /> {address}</span><br/>
                <span><FontAwesomeIcon icon={faAddressBook} className={'mr-1'} /> {phone}</span><br/>
                <span><FontAwesomeIcon icon={faEnvelope} className={'mr-1'} /> {email}</span><br/>
            </div>
        </div>
    );
}

export default MemberCard;