import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './Profile.css'
function Profile() {
    const navigate = useNavigate()
    let profilePic = useSelector(state => state.invoice.profilePic)
    return (
        <div className="profile-div">
            <div className="profile-div-pic">
                <img className="profile-pic" style={{ height: "50px", width: "50px" }} src={profilePic} />
                <span>Profile</span>
                <div className="profile-div-pic-hover">
                    <div onClick={() => { navigate('/user') }}>Profile</div>
                    <div onClick={() => { navigate('/user/analytics') }}>Analytics</div>
                    <div onClick={() => { navigate('/user/history') }}>History</div>
                    <div onClick={() => { navigate('/user/invoice-generator') }}>Invoice Generator</div>
                    <div onClick={() => {
                        localStorage.setItem('accessToken', "");
                        localStorage.setItem('refreshToken', "");
                        navigate('/');
                    }}>Logout <img width="18" height="18" src="https://img.icons8.com/metro/18/exit.png" alt="exit" /></div>
                </div>
            </div>
        </div>

    );
}
export default Profile