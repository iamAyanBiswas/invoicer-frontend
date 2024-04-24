import React from "react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import InvoiceGenerator from "./pages/InvoiceGenerator"
import Pdf from "./component/Pdf"
import Error404 from "./pages/Error404"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import User from "./pages/User"
import Analytics from "./pages/Analytics"
import History from "./pages/History"


function App() {

  const router=createBrowserRouter(
    [{
      path:'*',
      element:<Error404/>
    },
      {
      path:'/',
      element:<Home/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/privacy-policy',
      element:<Home/>
    },
    {
      path:'/sign-up',
      element:<SignUp/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/pdf',
      element:<Pdf/>
    },
    {
      path:'/user',
      element:<User/>
    },
    {
      path:'user/invoice-generator',
      element:<InvoiceGenerator/>
    },
    {
      path:'/user/profile',
      element:<User/>
    },
    {
      path:'/user/analytics',
      element:<Analytics/>
    },
    {
      path:'/user/history',
      element:<History/>
    }
  ])

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
