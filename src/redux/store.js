
import { configureStore } from '@reduxjs/toolkit'
import InvData from '../features/InvData'


export default configureStore({
  reducer: {
    invoice: InvData
  }
})