import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import validator from "validator";
import './Login.css'
function Login() {
    let hideEye = "https://img.icons8.com/ios-glyphs/30/hide.png";
    let showEye = "https://img.icons8.com/ios-glyphs/30/visible--v1.png";

    let [redirectToUser, setRedirectToUser] = useState(false)
    let [redirectToInvoice, setRedirectToInvoice] = useState(false)
    let [loginEmail, setLoginEmail] = useState("")
    let [eye, setEye] = useState(true)
    let [isEye, isSetEye] = useState(showEye)
    let [inpPassOrText, setInpPassOrText] = useState("password")
    let [submit, setSubmit] = useState("Submit")
    let [invalidUser, setInvalidUser] = useState("")



    async function handleSubmit(event) {
        const focus = event.target.elements
        event.preventDefault()

        const email = focus.email.value
        const password = focus.password.value

        fetch('http://localhost:3000/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                setSubmit(submit="Submit")
                return res.json()
            })
            .then(res => {
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
               res.data.profile === true ? setRedirectToInvoice(redirectToInvoice = true) : setRedirectToUser(redirectToUser = true)
            })
            .catch(err => {
                setSubmit(submit="Submit")
                setInvalidUser(invalidUser="User not found")
            })

    }

    return (
        <div className="login-page">
            {redirectToUser && (
                <Navigate to="/user" replace={true} />
            )}
            {redirectToInvoice && (
                <Navigate to="/user/invoice-generator" replace={true} />
            )}
            
            <div className="login-div">
                <div className="login-heading" >Login</div>
                <form onSubmit={handleSubmit}>
                    <input className="login-input" type="email" name="email" id="loginEmailId" placeholder="Email" required
                        onChange={(e) => {
                            validator.isEmail(e.target.value) ? setLoginEmail(loginEmail = "") : setLoginEmail(loginEmail = "Enter Valid Email")
                        }} />

                    <label style={{ fontSize: "12px", marginLeft: "20px" }} htmlFor="loginEmailId">{loginEmail}</label>

                    <div>
                        <input className="login-input" type={inpPassOrText} name="password" placeholder="Password" required />
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
                    <div className="invalid-user">{invalidUser}</div>
                    <div className="login-submit-div"> <button className="login-submit" onClick={()=>{setSubmit(submit="Wait ...")}} >{submit}</button></div>
                    <div className="after-login-submit-div">Don't have an account?<NavLink to='/sign-up'>Sign up</NavLink></div>
                </form>
            </div>
        </div>
    )
}
export default Login