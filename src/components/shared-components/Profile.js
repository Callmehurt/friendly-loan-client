import { ToastContainer } from "react-toastify";
import Header from "../student/Header";
import avatar from '../../images/avatar.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import PasswordChangeForm from "./PasswordChangeForm";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import GroupCard from "./GroupCard";

const Profile = () => {

    const axiosPrivate = useAxiosPrivate();

    const [userGroups, setuserGroups] = useState([]);

    const currentAuthState = useSelector((state) => state.authentication);


    const fetchUserGroups = useCallback( async () => {

        const res = await axiosPrivate.get('/user/group/user/enrolled');
        console.log(res);
        
        setuserGroups(res?.data);

    }, [axiosPrivate])

    useEffect(() => {
        fetchUserGroups();
    }, [fetchUserGroups])


    return (
        <>
        <ToastContainer />
        <Header/>
        <div className="wrapper">
            <section style={{ backgroundColor: '#EBF6FA', height: '40vh', width: 'calc(100% + 30px) !important' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="profile_wrapper">
                                <div className="f_child">
                                    <div className="profile_pic_wrapper">
                                        <img src={currentAuthState?.user.profile || avatar} alt="" />
                                    </div>
                                </div>
                                <div className="s_child">
                                    <div className="user_info">
                                        <p>{currentAuthState?.user.fullname}</p>
                                        <div className="role_badge" style={{ textTransform: 'capitalize' }}>{currentAuthState?.user?.role}</div>
                                        <p><FontAwesomeIcon icon={faLocationDot}/> {currentAuthState?.user?.address}</p>
                                        <p><FontAwesomeIcon icon={faEnvelope}/> {currentAuthState?.user?.email}</p>
                                        <p><FontAwesomeIcon icon={faPhone}/> {currentAuthState?.user?.phone}</p>
                                    </div>
                                    <button className="submit_button">Update Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-fluid">
                <div style={{ marginTop: '25px' }}>
                    <div className="row">
                        <div className="col-lg-8">
                            <h6 style={{ fontSize: '17px', fontWeight: '600' }}>Associated Saving Groups</h6>
                            <div className="row">
                            {
                                userGroups?.map((grp) => {
                                    return (
                                        <div className="col-lg-6" key={grp.id}>
                                            <GroupCard group={grp} currentAuthState={currentAuthState}/>
                                        </div>
                                    ) 
                                })
                            }
                            </div>
                        </div>
                        <div className="col-lg-4" style={{ marginTop: '40px' }}>
                            <PasswordChangeForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;