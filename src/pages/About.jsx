import React from "react";
import Navbar from "../component/Navbar"
import "./About.css"
function About() {
    return (
        <div className="about-page">
            <div>
                <Navbar />
            </div>
            <div className="about-page-heading">
                About
            </div>
            <div className="about-page-content">
                <div>
                Hi, I'm Ayan Biswas, a student of B.Tech CSE at JISCE and a full stack web developer. I'm passionate about creating beautiful and functional websites using modern technologies and frameworks.

                I have experience in developing web applications using HTML, CSS, JavaScript, React, tailwind css, Next.js, Node and Express. I'm also familiar with tools like Git, GitHub, and MongoDB. I'm always eager to learn new skills and explore new challenges.

                My goal is to become a professional web developer and work on exciting and impactful projects. I'm always open to new opportunities and collaborations. If you want to know more about me or my work, feel free to contact me.
                </div>
            </div>
        </div>
    );
}
export default About