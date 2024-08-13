import { Image } from 'react-bootstrap';

const MemberCard = ({member}) => {

    const {fullname, profile} = member;

    return (
        <div className="m_child">
            <div className="user_av">
                <Image src={profile} fluid={true} />
            </div>
            <div className='name_tag'>
                <p>{fullname}</p>
            </div>
        </div>
    );
}

export default MemberCard;