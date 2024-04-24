import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profileImage } from "../features/InvData";
import './User.css'



function base64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        localStorage.setItem('logo', reader.result)
    };
}


function User() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let [name, setName] = useState("")
    let [mobile, setMobile] = useState("")
    let [email, setEmail] = useState("")
    let [address, setAddress] = useState("")
    let [image, setImage] = useState(null)
    let [selectedFile, setSelectedFile] = useState(null);
    let [submit, setSubmit] = useState(true)
    let [login, setLogin] = useState(false)
    let [save, setSave] = useState("Save")
    let profilePic=""
    useEffect(() => {
        let firstRequest = () => {
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            const headers = new Headers({
                'Authorization': `Bearer ${accessToken},${refreshToken}`
            });
            fetch('http://localhost:3000/api/user/profile/request', {
                method: 'POST',
                headers: headers,
                body: { request: "first" }
            })
                .then((res) => {
                    return res.json()
                })
                .then(res => {
                    res.data.accessToken && localStorage.setItem('accessToken', res.data.accessToken)
                    res.data.refreshToken && localStorage.setItem('refreshToken', res.data.refreshToken)
                    if (res.message === "Refresh Token sucessfull") { firstRequest() }
                    else {
                        res.data.logo && setImage(image = res.data.logo)
                        res.data.name && setName(name = res.data.name)
                        res.data.phone && setMobile(mobile = res.data.phone)
                        res.data.publicEmail && setEmail(email = res.data.publicEmail)
                        res.data.address && setAddress(address = res.data.address)
                        setLogin(login = true)
                        setSave(save = "Save")
                    }
                })
                .catch(err => {
                    
                })
        }
        firstRequest()
    }, [])








    function handleSubmit(event) {
        event.preventDefault()
        event = event.target.elements
        let userProfileRequest = () => {
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');

            const formData = new FormData();
            formData.append('logo', selectedFile);
            formData.append('name', event.namex.value);
            formData.append('phone', event.mobile.value);
            formData.append('publicEmail', event.email.value);
            formData.append('address', event.address.value);
            const headers = new Headers({
                'Authorization': `Bearer ${accessToken},${refreshToken}`
            });
            fetch('http://localhost:3000/api/user/profile', {
                method: 'POST',
                headers: headers,
                body: formData

            })
                .then((res) => {
                    return res.json()
                })
                .then(res => {
                    res.data.accessToken && localStorage.setItem('accessToken', res.data.accessToken)
                    res.data.refreshToken && localStorage.setItem('refreshToken', res.data.refreshToken)
                    if (res.message === "Refresh Token sucessfull") { userProfileRequest() }
                    else {
                        res.data.logo && setImage(image = res.data.logo)
                        res.data.name && setName(name = res.data.name)
                        res.data.phone && setMobile(mobile = res.data.phone)
                        res.data.publicEmail && setEmail(email = res.data.publicEmail)
                        res.data.address && setAddress(address = res.data.address)
                        profilePic=res.data.logo
                        dispatch(profileImage({profilePic:profilePic}))
                        setLogin(login = true)
                        setSave(save = "Save")
                    }
                })
                .catch(err => {
                    setSave(save = "Save")
                })
        }
        submit && userProfileRequest()

    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {

            if (event.target.files[0].size > 0.5 * 1024 * 1024) {
                alert('File size should not exceed 500kb');
                event.target.value = null;
                setSubmit(submit = false)
            }
            setImage(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
            base64(event.target.files[0])
        }
    }

    if (login) {
        return (
            <div className="user-div">

                <form onSubmit={handleSubmit}>
                    <div className="public-profile">Public Profile</div>
                    <div className="user-profile-img-div">
                        <input type="file" name="logo" id="profileImg" className="inp-img" onChange={onImageChange} required />
                        <label className="inp-img-label" htmlFor="profileImg"><img src={image} /></label>
                        <label htmlFor="profileImg"><img className="edit-img-icon" width="48" height="48" src="https://img.icons8.com/fluency/48/add-image.png" alt="add-image" /></label>
                        <label className="inp-img-label-text" htmlFor="profileImg">Photo size less then 500kb</label>
                    </div>
                    <div className="user-profile-info-div">
                        <div className="user-profile-info">
                            <input className="user-inp" type="text" value={name} name="namex" id="" placeholder="Name or Company Name" required onChange={(e) => { setName(name = e.target.value) }} />
                            <input className="user-inp" type="number" value={mobile} name="mobile" id="" placeholder="Phone No" required max={9999999999} min={1000000000} onChange={(e) => { setMobile(mobile = e.target.value) }} />
                            <input className="user-inp" type="email" value={email} name="email" id="" placeholder="Email" required onChange={(e) => { setEmail(email = e.target.value) }} />
                            <input className="user-inp" type="text" value={address} name="address" id="" placeholder="Address" required onChange={(e) => { setAddress(address = e.target.value) }} />
                            <button className="profile-info-submit" onClick={() => { setSave(save = "Wait ...") }}>{save}</button>

                        </div>

                    </div>
                </form>
                <div className="user-profile-go-back" onClick={() => { navigate(-1) }}>Go back</div>
                <div className="user-profile-go-back" onClick={() => { navigate('/user/invoice-generator') }}>Go To Invoice Generator</div>

            </div>
        )
    }
    else{
        return (<>
            <div> </div>
        </>)
    }
}
export default User
