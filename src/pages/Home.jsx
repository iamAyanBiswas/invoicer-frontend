import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from 'react-router-dom';
import './Home.css'


function Home() {

    //useNavigate ()  -- we can't use this hook outside of the exportal function
    let navigate = useNavigate()
    useEffect(() => {
             fetch(`http://localhost:3000/api/views`, { method: "POST" })
             .then(()=>{

             })
             .catch(err=>{

             })
        
    }, [])
    return (
        <div>
            <div className="header"> <Navbar /></div>
            <div className="main-body">
                <div className="home-heading">Free invoice generator.</div>
                <div className="home-sub-heading">Create an invoice online customized for your brand or business using an Invoicer free invoice template.</div>
                <div className="home-btn"><button onClick={() => { navigate('/login') }}>Create Now</button></div>
                <div className="home-img">
                    <div>Invoice</div>
                </div>
                <div className="after-img-home-heading">Start with free invoice templates from Invoicer.</div>
                <div className="after-img-home-sub-heading">Make invoices quickly and easily with the Invoicer online invoice creator. Explore our wide range of invoice templates and choose one that best matches your industry, niche, or aesthetic. Upload your brand logo, colors scheme, and fonts to your invoice. No experience required.</div>
                <div className="home-btn"><button onClick={() => { navigate('/login') }}>Get Started</button></div>

            </div>
        </div>
    )
}
export default Home