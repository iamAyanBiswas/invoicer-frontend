import React, { useEffect, useState } from "react";
import Profile from "../component/Profile";
import './History.css'

function History() {
    let [login, setLogin] = useState(false)
    let [totalInvoice, setTotalInvoice] = useState([])
    useEffect(() => {
        let historyData = () => {
            let accessToken = localStorage.getItem('accessToken');
            let refreshToken = localStorage.getItem('refreshToken');
            let xx = " "
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken},${refreshToken}`
            });
            fetch('http://localhost:3000/api/user/history', {
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
                    if (res.message === "Refresh Token sucessfull") { historyData() }
                    else {
                        setTotalInvoice(totalInvoice = res.data.history)
                        setLogin(login = true)
                    }
                })
                .catch(err => {
                })

        }
        historyData()
    }, [])

    if (login) {
        return (<div className="page-history">
            <div className="history-nav">
                <div className="history-nav-heading">Invoice History</div>
                <div><Profile /></div>
            </div>
            <div className="history-component-div">
                {
                    totalInvoice.map((e, index) => {
                        return (
                            <div key={index} className="history-component">
                                <div>Name: {totalInvoice[index].name}</div>
                                <div>Email: {totalInvoice[index].email}</div>
                                <div>Mobile: {totalInvoice[index].mobile}</div>
                                <div>Location: {totalInvoice[index].address}</div>
                                <table className="history-table">
                                    <thead>
                                        <tr className="">
                                            <th>No</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            totalInvoice[index].tableData.map((e, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{e.product}</td>
                                                        <td>{e.quantity}</td>
                                                        <td>{e.price}</td>
                                                        <td>{e.amount}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div>Total: {totalInvoice[index].totalValueOfParchase}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        )
    }
    else {
        return (<>
            <div></div>
        </>)
    }


}
export default History
