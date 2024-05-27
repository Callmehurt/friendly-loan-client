import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import logo from '../../images/logo.jpg';
import avatar from '../../images/avatar.png'
import StudentNavbar from "./Navbar";
import { useSelector } from "react-redux";

const Header = () => {

    const logout = useLogout();
    const navigate = useNavigate();

    //current auth state
    const currentAuthState =  useSelector((state) => state.authentication);

    const signOut = async () => {
        await logout();
        navigate('/user/login')
    }

    const [open, setOpen] = useState('');

    const handleMobileMenu = () => {
        if(!open){
            setOpen('open')
        }else{
            setOpen('');
        }
    }

    return (
        <>
            <div className="header-bg">
                <header id="topnav">
                    <div className="topbar-main">
                        <div className="container-fluid">
                            <div>
                                <Link to={`/${currentAuthState.user.role.toLowerCase()}/dashboard`} className="logo">
                                    <span className="logo-light" style={{fontFamily: 'Dancing Script', letterSpacing: '1px'}}>
                                           <img src={logo} alt="logo" height='45' className="rounded-circle" /> Friendly Loan
                                    </span>
                                </Link>
                            </div>

                            <div className="menu-extras topbar-custom navbar p-0">
                                <ul className="navbar-right ml-auto list-inline float-right mb-0">
                                    <li className="dropdown notification-list list-inline-item">
                                        <div className="dropdown notification-list nav-pro-img">
                                            <a className="dropdown-toggle nav-link arrow-none nav-user"
                                            data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                            aria-expanded="false">
                                                <img src={avatar} alt="user"
                                                    className="rounded-circle" />
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                <a className="dropdown-item" href="#"><i
                                                    className="mdi mdi-account-circle"></i> {currentAuthState.user.fullname}</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item text-danger" href="#" onClick={signOut}><i
                                                    className="mdi mdi-power text-danger"></i> Logout</a>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="menu-item dropdown notification-list list-inline-item">
                                        <a class={`navbar-toggle nav-link ${open}`} onClick={() => handleMobileMenu()}>
                                            <div class="lines">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="navbar-custom active">
                        <div className="container-fluid">
                            {
                                currentAuthState.user.role.toLowerCase() === 'student' ? <StudentNavbar open={open} currentAuthState={currentAuthState} />
                                : ''
                            }
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Header;