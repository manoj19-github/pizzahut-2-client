import React,{Fragment} from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import {useSelector,useDispatch} from "react-redux"
const Layout = ({children}) => {
    return (
        <div className="app">
          <Navbar/>
          
          {children}
          <Footer/>
        </div>
    )
}

export default Layout
