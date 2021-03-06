import '../styles/globals.css'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {Provider} from "react-redux"
import store from "../redux/store"
import Sidebar from "../components/Sidebar"
import {useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import Loading from "../components/Loading"
import axios from "axios"
axios.defaults.baseURL=`${process.env.NEXT_PUBLIC_SERVER_URL}`
import {authTypes} from "../redux/types"

function MyApp({ Component, pageProps }) {
  if(Component.getLayout){
    return Component.getLayout(
      <Provider store={store}>
          <>
            <Loading/>
            <Component {...pageProps} />
          </>


      </Provider>
    )
  }
  return (
    <Provider store={store}>
        <Loading/>
        <Navbar/>
        <Sidebar/>
        <Component {...pageProps} />
        <Footer/>
    </Provider>
  )

}

export default MyApp
