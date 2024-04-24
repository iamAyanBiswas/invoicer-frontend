import React from "react";
import './Pdf.css'
import { useDispatch, useSelector } from "react-redux";

function Pdf() {
    const dispatch = useDispatch()
    const isTableData = useSelector(state => state.invoice.tableData)
    const total=useSelector(state => state.invoice.totalValueOfParchase)
    const clintName=useSelector(state => state.invoice.clintName)
    const clintAddress=useSelector(state => state.invoice.clintAddress)
    const clintEmail=useSelector(state => state.invoice.clintEmail)
    const clintMobile=useSelector(state => state.invoice.clintMobile)
    const providerName = useSelector(state => state.invoice.providerName)
    const providerAddress= useSelector(state => state.invoice.providerAddress)
    const providerEmail = useSelector(state => state.invoice.providerEmail)
    const providerMobile =useSelector(state => state.invoice.providerMobile)
    const providerLogo = useSelector(state => state.invoice.providerLogo)
    let localLogo=localStorage.getItem('logo');

    const now = new Date();
    const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;





    return (<>
        <div className="xxl">
            <div className="pdf-template" id="pdfTemplate">
                <div className="pdf-heading">Invoice</div>
                <div className="logo-date-div">
                    <div className="logo-div"><img className="logo" src={localLogo} alt="" /></div>
                    <div className="invoice-time-date-number-div">
                        <div className="invoice-number">Invoice No: xxxxx </div>
                        <div className="invoice-time">{`Invoice Time: ${time}`}</div>
                        <div className="invoice-date">{`Invoice Date: ${date}`}</div>
                    </div>
                </div>
                <div className="bill-detail">
                    <div className="provider-detail">
                        <div className="bill-detail-exta-padding">Bill Provider</div>
                        <div className="provider-name">Name:{ providerName}</div>
                        <div className="provide-number">Mobile:{providerMobile }</div>
                        <div className="provider-email">Email:{providerEmail }</div>
                        <div className="provider-address">Location:{providerAddress }</div>
                    </div>
                    <div className="clint-detail">
                        <div className="bill-detail-exta-padding">Bill To</div>
                        <div className="clint-name">Name: {clintName }</div>
                        <div className="clint-number">Mobile:{clintMobile}</div>
                        <div className="clint-email">Email:{clintEmail }</div>
                        <div className="clint-address">Location:{ clintAddress}</div>
                    </div>
                </div>
                <table className="pdf-table">
                    <thead>
                        <tr className="pdf-head-tr">
                            <th>No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody className="pdf-body">
                            {
                                isTableData.map((e, index) => {
                                    return (
                                        <tr key={index} className="pdf-body-tr">
                                            <td>{index +1}</td>
                                            <td>{e.product}</td>
                                            <td>{e.quantity}</td>
                                            <td>{e.price}</td>
                                            <td>{e.amount}</td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </table>
                <div className="pdf-total"><div>Total: {total}</div></div>
            </div>
        </div>

    </>
    )
}
export default Pdf