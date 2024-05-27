import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDashboard} from "@fortawesome/free-solid-svg-icons";

const StudentNavbar = ({currentAuthState, open}) => {

    return (
        
        <>
            <div id="navigation" className={open ? 'active d-block' : ''}>
                <ul className="navigation-menu">
                    <li className="has-submenu">
                        <Link to={`/${currentAuthState.user.role.toLowerCase()}/dashboard`}><FontAwesomeIcon icon={faDashboard} className={'mr-1'} /> Dashboard</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default StudentNavbar;