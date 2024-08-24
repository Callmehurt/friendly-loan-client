import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import logo from '../../images/logo-white.png';
import avatar from '../../images/avatar.png'
import StudentNavbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from "../admin/AdminNavbar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { fetchNotifications } from "../../redux/actions/notificationActions";

const Header = () => {

    const logout = useLogout();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosPrivate = useAxiosPrivate();

    const [unreadNotifications, setUnreadNotifications] = useState(0);

    //current auth state
    const currentAuthState =  useSelector((state) => state.authentication);

    //notifications
    const allNotifications = useSelector((state) => state.notifications.notifications);


    useEffect(() => {
        const unreadNotificationCount = allNotifications.filter(notification => notification.isRead === false);
        setUnreadNotifications(unreadNotificationCount.length);
    }, [allNotifications])
    
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

    //handle redirect and mark notification as read
    const handleRedirect = async (notificationId, redirectUrl) => {
        await axiosPrivate.put(`/notification/read-notification/${notificationId}`);
        const newList = allNotifications.map(notification => {
            if (notification.id === notificationId) {
                return {
                    ...notification,
                    isRead: true
                };
            }
            return notification;
        });
        dispatch(fetchNotifications(newList));   
        navigate(`/${currentAuthState.user.role.toLowerCase()}${redirectUrl}`);
        
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
                                           <img src={logo} alt="logo" height='30' />
                                    </span>
                                </Link>
                            </div>

                            <div className="menu-extras topbar-custom navbar p-0">
                                <ul className="navbar-right ml-auto list-inline float-right mb-0">
                                    <li class="dropdown notification-list list-inline-item">
                                        <a class="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                            <FontAwesomeIcon icon={faBell} size="2x" className={'mr-1 mt-4'} />
                                            <span class="badge badge-pill badge-danger noti-icon-badge">
                                                {
                                                    unreadNotifications
                                                }
                                            </span>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg px-1">
                                            <h6 class="dropdown-item-text">
                                                    Notifications
                                                </h6>
                                            <div class="slimscroll notification-item-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                                {
                                                    allNotifications.length > 0 ? allNotifications.map((notification, index) => (
                                                        notification.notificationType === 'loan' ? (
                                                            <a key={index} href="javascript:void(0)" onClick={() => handleRedirect(notification.id, notification.redirectUrl)} className={`dropdown-item notify-item ${notification.isRead === false ? 'active' : ''}`}>
                                                                <div class="notify-icon bg-danger"><i class="mdi mdi-currency-gbp"></i></div>
                                                                <p class="notify-details"><b>New Loan Request</b><span class="text-muted">{notification.message}</span></p>
                                                            </a>
                                                        ): notification.notificationType === 'group' ? (
                                                            <a key={index} href="javascript:void(0)" onClick={() => handleRedirect(notification.id, notification.redirectUrl)} className={`dropdown-item notify-item ${notification.isRead === false ? 'active' : ''}`}>
                                                                <div class="notify-icon bg-success"><i class="mdi mdi-account-group"></i></div>
                                                                <p class="notify-details"><b>Added to Group</b><span class="text-muted">{notification.message}</span></p>
                                                            </a>
                                                        ) : notification.notificationType === 'guarantor' ? (
                                                            <a key={index} href="javascript:void(0)" onClick={() => handleRedirect(notification.id, notification.redirectUrl)} className={`dropdown-item notify-item ${notification.isRead === false ? 'active' : ''}`}>
                                                                <div class="notify-icon bg-info"><i class="mdi mdi-badge-account-alert-outline"></i></div>
                                                                <p class="notify-details"><b>New Guarantor Request</b><span class="text-muted">{notification.message}</span></p>
                                                            </a>
                                                        ) : notification.notificationType === 'registration' ? (
                                                            <a key={index} href="javascript:void(0)" onClick={() => handleRedirect(notification.id, notification.redirectUrl)} className={`dropdown-item notify-item ${notification.isRead === false ? 'active' : ''}`}>
                                                                <div class="notify-icon bg-primary"><i class="mdi mdi-account-plus"></i></div>
                                                                <p class="notify-details"><b>New User Joined</b><span class="text-muted">{notification.message}</span></p>
                                                            </a>
                                                        ) : (
                                                            <a key={index} href="javascript:void(0)" onClick={() => handleRedirect(notification.id, notification.redirectUrl)} className={`dropdown-item notify-item ${notification.isRead === false ? 'active' : ''}`}>
                                                                <div class="notify-icon bg-success"><i class="mdi mdi-currency-gbp"></i></div>
                                                                <p class="notify-details"><b>New Contribution</b><span class="text-muted">{notification.message}</span></p>
                                                            </a>
                                                        )
                                                    )): (
                                                        'No notifications'
                                                    )
                                                }    

                                            </div>
                                            <a href="#" class="dropdown-item text-center notify-all text-primary">
                                                    View all <i class="fi-arrow-right"></i>
                                                </a>
                                        </div>
                                    </li>
                                    <li className="dropdown notification-list list-inline-item">
                                        <div className="dropdown notification-list nav-pro-img">
                                            <a className="dropdown-toggle nav-link arrow-none nav-user"
                                            data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                            aria-expanded="false">
                                                <img src={currentAuthState.user.profile || avatar} alt="user"
                                                    className="rounded-circle" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                            <Link to={`/${currentAuthState.user.role.toLowerCase()}/my/profile`} className="dropdown-item">
                                                <i className="mdi mdi-account-circle"></i> {currentAuthState.user.fullname}
                                            </Link>
                                                {/* <a className="dropdown-item" href="#"></a> */}
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
                                : <AdminNavbar open={open} currentAuthState={currentAuthState} />
                            }
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Header;