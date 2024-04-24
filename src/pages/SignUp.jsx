import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import validator from 'validator';
import './SignUp.css'
function SignUp() {
    let hideEye = "https://img.icons8.com/ios-glyphs/30/hide.png";
    let showEye = "https://img.icons8.com/ios-glyphs/30/visible--v1.png";

    let [login, setLogin] = useState(false)
    let [signupEmail, setSignupEmail] = useState("")
    let [eye, setEye] = useState(true)
    let [isEye, isSetEye] = useState(showEye)
    let [inpPassOrText, setInpPassOrText] = useState("password")
    let [submit, setSubmit] = useState("Submit")
    let [userExists , setUserExists] = useState("") 


    async function handleSubmit(event) {
        const focus = event.target.elements
        event.preventDefault()

        const email = focus.email.value
        const password = focus.password.value

        fetch('http://localhost:3000/api/sign-up/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                return res.json()
            })
            .then(res => {
                if(res.message==="User registered Successfully"){
                    setLogin(login=true)
                }
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                setSubmit(submit="Submit")
            })
            .catch(err => {
                setSubmit(submit="Submit")
                setUserExists(userExists="User already exists")
            })

    }



    return (
        <div className="sign-up-page">
            {login && (
                <Navigate to="/user" replace={true} />
            )}
            <div className="sign-up-div">
                <div className="sign-up-heading" >Sign up</div>
                <form onSubmit={ handleSubmit }>
                    <input className="sign-up-input" type="email" name="email" id="signupEmailId" placeholder="Email" required onChange={(e) => {
                        validator.isEmail(e.target.value) ? setSignupEmail(signupEmail = "") : setSignupEmail(signupEmail = "Enter Valid Email")
                    }} />
                    <label style={{ fontSize: "12px", marginLeft: "20px" }} htmlFor="signupEmailId">{signupEmail}</label>

                    <div>
                        <input className="sign-up-input" type={inpPassOrText} name="password" placeholder="Password" required />
                        <img className="eye-img" width="25" height="20" src={isEye} onClick={() => {
                            if (eye) {
                                isSetEye(isEye = hideEye)
                                setInpPassOrText(inpPassOrText = "text")
                                setEye(eye = false)
                            }
                            else {
                                isSetEye(isEye = showEye)
                                setInpPassOrText(inpPassOrText = "password")
                                setEye(eye = true)
                            }
                        }} />
                    </div>
                    <div className="user-exists">{userExists}</div>
                    <div className="sign-up-submit-div"> <button className="sign-up-submit" onClick={()=>{setSubmit(submit="Wait ...")}} >Submit</button></div>
                    <div className="after-sign-up-submit-div">Have an account? <NavLink to='/login'>Log in</NavLink></div>

                </form>
            </div>
        </div>
    )
}
export default SignUp