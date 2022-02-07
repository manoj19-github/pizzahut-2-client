import React,{useState} from 'react'
import Image from "next/image"
import {useRouter} from "next/router"
import {GoHome} from "react-icons/go"
import {MdPayment,MdProductionQuantityLimits} from "react-icons/md"
import {FaRegMoneyBillAlt} from "react-icons/fa"
import {useDispatch,useSelector}  from "react-redux"
import {siteTypes} from "../../redux/types"
import {AiOutlineUser,AiOutlineClose} from "react-icons/ai"
import {RiSlideshowLine} from "react-icons/ri"

const AdSideBar = () => {
  const Router=useRouter()
  const dispatch=useDispatch()
  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  const tabIndex=useSelector(state=>state.siteReducer.tabIndex)
  const tabFlow=(link,path)=>{
    dispatch({type:siteTypes.TAB_CHANGE,payload:link})
    Router.push(`/admin/${path}`)

  }
  const toggleAdminSidebar=()=>{
    if(isAdminSidebarOpen){
      dispatch({type:siteTypes.HIDE_AD_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_AD_SIDEBAR})
    }
  }
  const backToHome=()=>{
    Router.push("/")
  }
    return (
      <div className={`lg:flex lg:translate-x-0 flex-col items-center w-2/4 bg-white lg:w-[20vw]  fixed transition-all overflow-hidden duration-500 ease-in
           top-0 h-[100vh]  h-full z-[120] ${isAdminSidebarOpen ? "translate-x-0 ":"-translate-x-[100vw] "}`}
      >
        <div className="flex items-center   w-full ml-4 pb-4 mt-4  ">
          <Image src="/img/pizzalogo.png" alt="company logo" width="50px" height="50px"/>
          <h3 className="text-gray-600 text-lg ml-2">PizzaHut</h3>
        </div>
        <div className="flex  justify-end items-center lg:hidden mb-4 cursor-pointer" onClick={toggleAdminSidebar}>
          <AiOutlineClose size={28} color="red" className="mr-4"/>

        </div>
        <ul className="flex flex-col items-center  w-full mb-6">
          <li className={`flex items-center
              ${tabIndex==0 && "bg-teal-600 "} w-[90%] mb-6 hover:bg-teal-600  py-2 ml-4 rounded-md   cursor-pointer transition-all duration-300 ease-in`}
              onClick={()=>tabFlow(0,"")}
            >
            <p className="ml-2"><GoHome color="black" size={20}/></p>
            <p className="text-gray-700 text-lg ml-2 transition-all duration-300 ease-in hover:text-white ">Dashboard</p>
          </li>
          <li className={`flex items-center  ${tabIndex==3 && "bg-teal-600 "} w-[90%] rounded-md ml-4 mb-6 hover:bg-teal-600  py-2 cursor-pointer transition-all duration-300 ease-in`}
            onClick={()=>tabFlow(3,"order")}
            >
            <p className="ml-2"><FaRegMoneyBillAlt color="black" size={20}/></p>
            <p className="text-gray-700 text-lg ml-2 transition-all duration-300 ease-in hover:text-white ">Orders</p>
          </li>
          <li className={`flex items-center  ${tabIndex==4 && "bg-teal-600 "} w-[90%] rounded-md ml-4 mb-6 hover:bg-teal-600  py-2 cursor-pointer transition-all duration-300 ease-in`}
            onClick={()=>tabFlow(4,"slides")}
            >
            <p className="ml-2"><RiSlideshowLine color="black" size={20}/></p>
          <p className="text-gray-700 text-lg ml-2 transition-all duration-300 ease-in hover:text-white ">Slides</p>
          </li>
          <li className={`flex items-center ${tabIndex==1 && "bg-teal-600 "}  w-[90%] rounded-md ml-4 mb-6 hover:bg-teal-600  py-2 cursor-pointer transition-all duration-300 ease-in`}
            onClick={()=>tabFlow(1,"customer")}
            >
            <p className="ml-2"><AiOutlineUser color="black" size={20}/></p>
            <p className="text-gray-700 text-lg ml-2 transition-all duration-300 ease-in hover:text-white">Customers</p>
          </li>
          <li className={`flex items-center ${tabIndex==2 && "bg-teal-600 "}  w-[90%] rounded-md ml-4 mb-6 hover:bg-teal-600  py-2 cursor-pointer transition-all duration-300 ease-in`}
            onClick={()=>tabFlow(2,"product")}
            >
            <p className="ml-2"><MdProductionQuantityLimits color="black" size={20}/></p>
            <p className="text-gray-700 text-lg ml-2 transition-all duration-300 ease-in  hover:text-white">Products</p>
          </li>

          <li>
            <p className=" flex mt-16 hover:text-black cursor-pointer text-sm text-gray-600" onClick={backToHome}>Back To Home Page</p>
          </li>
        </ul>
      </div>
    )
}

export default AdSideBar
