import React from "react";
import './InpBtn.css'
function InpBtn(isType,placeHolder){
    return(
        <>
        <input type={isType} placeholder={placeHolder}/>
        </>
    );
}
export default InpBtn;