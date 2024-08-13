import { ToastContainer } from "react-toastify";
import Header from "../student/Header";
import avatar from '../../images/avatar.png'

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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1>Hello World</h1>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;