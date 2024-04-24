import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../component/Profile";
import Navbar from "../component/Navbar";
import Table from "../component/Table";
import './InvoiceGenerator.css'
import { makeInvoice, updateClintData, updateProviderData, pdfDownload } from "../features/InvData";


function InvoiceGenerator() {
    const dispatch = useDispatch()
    let [clintName, setClintName] = useState("")
    let [clintAddress, setClintAddress] = useState("")
    let [clintEmail, setClintEmail] = useState("")
    let [clintMobile, setClintMobile] = useState("")
    let tableData = useSelector(state => state.invoice.tableData)
    let totalValueOfParchase = useSelector(state => state.invoice.totalValueOfParchase)
    let providerName = ""
    let providerAddress = ""
    let providerEmail = ""
    let providerMobile = ""
    let providerLogo = ""

    let [save, setSave] = useState("Save and Download")
    let [login, setLogin] = useState(false)
    useEffect(() => {
        dispatch(updateClintData({ clintName: clintName, clintAddress: clintAddress, clintEmail: clintEmail, clintMobile: clintMobile }))
    })
    useEffect(() => {
        let invoiceFirstRequest = () => {
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            let xx = " "
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken},${refreshToken}`
            });
            fetch('http://localhost:3000/api/user/invoice-generator/request', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ xx })
            })
                .then((res) => {
                    return res.json()
                })
                .then(res => {
                    res.data.accessToken && localStorage.setItem('accessToken', res.data.accessToken)
                    res.data.refreshToken && localStorage.setItem('refreshToken', res.data.refreshToken)
                    if (res.message === "Refresh Token sucessfull") { invoiceFirstRequest() }
                    else {
                        providerName = res.data.name
                        providerEmail = res.data.publicEmail
                        providerAddress = res.data.address
                        providerMobile = res.data.phone
                        providerLogo = res.data.logo
                        dispatch(updateProviderData({ providerName: providerName, providerAddress: providerAddress, providerEmail: providerEmail, providerMobile: providerMobile, providerLogo: providerLogo }))
                        setLogin(login = true)
                    }
                })
                .catch(err => {

                    console.log("Not Ok:-")
                })

        }
        invoiceFirstRequest()
    }, [])
    function handleSubmit(event) {
        event.preventDefault()
        let submitInvoice = () => {
            let name = clintName
            let email = clintEmail
            let mobile = clintMobile
            let address = clintAddress
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken},${refreshToken}`
            });
            fetch('http://localhost:3000/api/user/invoice-generator', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name, email, mobile, address, tableData, totalValueOfParchase })
            })
                .then((res) => {
                    return res.json()
                })
                .then(res => {
                    res.data.accessToken && localStorage.setItem('accessToken', res.data.accessToken)
                    res.data.refreshToken && localStorage.setItem('refreshToken', res.data.refreshToken)
                    if (res.message === "Refresh Token sucessfull") { submitInvoice() }
                    else {
                        setLogin(login = true)
                        setSave(save = "Save and Download")
                        //pdf download
                        html2pdf().from(pdfTemplate).save();
                    }
                })
                .catch(err => {
                    setSave(save = "Save and Download")
                })

        }
        submitInvoice()
    }
    if (login) {
        return (
            <div className="invoice-generator">
                <div className="invoice-generator-navbar"><Navbar /></div>
                <div className="invoice-generator-profile" ><Profile /></div>
                <div className="inv-main-div">
                    <div className="inv-template" id="invTemplate">
                        <div className="inp-heading">Invoice</div>
                        <div className="bill-to">Bill To</div>
                        <form onSubmit={handleSubmit}>
                            <div className="name-div">
                                <input id="Name" type="text" placeholder="Company Name or Name *" required onChange={(e) => { setClintName(clintName = e.target.value) }} />
                            </div>
                            <div className="address-div">
                                <input id="Address" type="text" placeholder="Address" onChange={(e) => { setClintAddress(clintAddress = e.target.value) }} />
                            </div>
                            <div className="mobile-div">
                                <input id="Mobile" type="number" placeholder="Mobile No *" required onChange={(e) => { setClintMobile(clintMobile = e.target.value) }} />
                            </div>
                            <div className="email-div">
                                <input id="Email" type="email" placeholder="Email" onChange={(e) => { setClintEmail(clintEmail = e.target.value) }} />
                            </div>
                            <div>
                                <Table />
                            </div>
                            <div id="btn-div">
                                <button id="btn" onClick={() => { setSave(save = "wait ...");  }}>{save}</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
    else {
        return (<>
            <div> </div>
        </>)
    }
}

export default InvoiceGenerator;