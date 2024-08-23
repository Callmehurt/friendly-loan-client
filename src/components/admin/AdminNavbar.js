import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDashboard, faPeopleGroup, faPiggyBank} from "@fortawesome/free-solid-svg-icons";

const AdminNavbar = ({currentAuthState, open}) => {

    return (
        
        <>
            <div id="navigation" className={open ? 'active d-block' : ''}>
                <ul className="navigation-menu">
                    <li className="has-submenu">
                        <Link to={`/${currentAuthState.user.role.toLowerCase()}/dashboard`}><FontAwesomeIcon icon={faDashboard} className={'mr-1'} /> Dashboard</Link>
                    </li>
                    <li className="has-submenu">
                        <Link to={`/${currentAuthState.user.role.toLowerCase()}/groups`}><FontAwesomeIcon icon={faPeopleGroup} className={'mr-1'} /> Groups</Link>
                    </li>
                    <li className="has-submenu">
                        <Link to={`/${currentAuthState.user.role.toLowerCase()}/loan/requests`}><FontAwesomeIcon icon={faPiggyBank} className={'mr-1'} /> Loans</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminNavbar;