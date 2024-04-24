import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeInvoice } from "../features/InvData";
// import { makeInvoice } from "../redux/invoiceData";
import './Table.css'
import Pdf from "./Pdf";
function Table() {
    const dispatch=useDispatch()

    let [isArray, setIsArray] = useState([]);
    let [total, setTotal] = useState(0)

    //set data for store.js 
    let tableData=isArray
    let totalValueOfParchase=total

    useEffect(() => {
        let money = 0;
        isArray.map(i => {
            money = money + i.amount;
        })
        setTotal(total = money)
    }, [isArray])

    useEffect(()=>{
        dispatch(makeInvoice({ tableData: tableData, totalValueOfParchase: totalValueOfParchase }));
    })
    
    async function tryDelete(id) {
        setIsArray((isArray) => {
            return isArray.filter((arrElenent, index) => {
                return index !== id;
            })
        })
    }






    return (
        <>
            <div>
                <div className="table-inp-div">
                    <div className="product-div">
                        <input id="one" type="text" className="inp-td-product-name" placeholder="Enter Product" />
                    </div>
                    <div className="quantity-price-div">
                        <input id="two" type="number" className="inp-td-quantity" placeholder="Enter Quantity" />
                        <input id="three" type="number" className="inp-td-price" placeholder="Enter Price" />
                    </div>
                    <div className="add-new-div">
                        <div className="add-new-btn" onClick={() => {
                            let product = one.value;
                            let quantity = Number(two.value);
                            let price = Number(three.value);
                            let amt = quantity * price;
                            product === "" ? product = "Product not define" : "";
                            setIsArray(isArray = [...isArray, { id: isArray.length, product: product, quantity: quantity, price: price, amount: amt }])
                        }}>Add New</div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="td-product-name">Product Name</th>
                            <th className="td-quantity">Quantity</th>
                            <th className="td-price" >Price</th>
                            <th className="td-amount">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isArray.map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={async () => { tryDelete(index); }}  >
                                            <div className="td-delete">x</div>
                                        </td>
                                        <td className="td-product-name">{e.product}</td>
                                        <td className="td-quantity">{e.quantity}</td>
                                        <td className="td-price">{e.price}</td>
                                        <td className="td-amount">{e.amount}</td>
                                    </tr>
                                )
                            })}
                    </tbody>

                </table >
                <div className="total-amount" style={{ margin: "0px 10px" }}>Total : {total}</div>
            </div >
            <div style={{display:"none"}}>
                <Pdf/>
            </div>
        </>
    )
}
export default Table;