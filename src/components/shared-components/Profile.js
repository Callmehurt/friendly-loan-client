import { ToastContainer } from "react-toastify";
import Header from "../student/Header";
import avatar from '../../images/avatar.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import PasswordChangeForm from "./PasswordChangeForm";

const Profile = () => {

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
                                        <img src={avatar} alt="" />
                                    </div>
                                </div>
                                <div className="s_child">
                                    <div className="user_info">
                                        <p>Sandeep Shrestha</p>
                                        <div className="role_badge">Student</div>
                                        <p><FontAwesomeIcon icon={faLocationDot}/> London, United Kingdom</p>
                                        <p><FontAwesomeIcon icon={faEnvelope}/> London, United Kingdom</p>
                                        <p><FontAwesomeIcon icon={faPhone}/> London, United Kingdom</p>
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

                        </div>
                        <div className="col-lg-4">
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