
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tableData: [],
    totalValueOfParchase: 0,
    clintName: "",
    clintAddress: "",
    clintEmail: "",
    clintMobile: "",
    providerName: "",
    providerAddress:"",
    providerEmail:"",
    providerMobile:"",
    providerLogo:"",
    pdfDownloadStatus: false,
    profilePic:""
}

const InvData = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        makeInvoice: (state, action) => {
            state.tableData = action.payload.tableData
            state.totalValueOfParchase = action.payload.totalValueOfParchase
        },
        updateClintData:(state , action) =>{
            state.clintName = action.payload.clintName
            state.clintAddress = action.payload.clintAddress
            state.clintEmail = action.payload.clintEmail
            state.clintMobile = action.payload.clintMobile
        },
        updateProviderData:(state , action) =>{
            state.providerName = action.payload.providerName
            state.providerAddress = action.payload.providerAddress
            state.providerEmail = action.payload.providerEmail
            state.providerMobile = action.payload.providerMobile
            state.providerLogo = action.payload.providerLogo
        },
        pdfDownload:(state)=>{
            state.pdfDownloadStatus=!state.pdfDownloadStatus
        },
        profileImage:(state , action)=>{
            state.profilePic=action.payload.profilePic
        }
    }
})
export const { makeInvoice , updateClintData , updateProviderData , pdfDownload , profileImage} = InvData.actions
export default InvData.reducer





// clintName: "",
//     clintAddress: "",
//     clintEmail: "",
//     clintMobile: "",
//     providerName: "",
//     providerAddress: "",
//     providerEmail: "",
//     providerMobile: "",