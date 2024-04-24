import React from "react";
import Navbar from "../component/Navbar"
import './Contact.css'

function Contact() {
    return (
        <div className="contact-page">
            <div>
                <Navbar />
            </div>
            <div className="contact-page-heading">
                Contact
            </div>
            <div className="contact-page-content">
                <div>
                    <div><a href="https://www.linkedin.com/in/ayan-biswas-329565296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</a></div>
                    <div><a href="https://x.com/iamAyan_Biswas">Twitter / X </a></div>
                    <div>Email : ayanbiswas9191@gmail.com</div>
                </div>
            </div>
        </div >
    )
}
export default Contact