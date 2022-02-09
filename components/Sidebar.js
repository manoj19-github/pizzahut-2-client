import React from 'react'
import Image from "next/image"
import {useRouter} from "next/router"
import {logoutAction} from "../redux/actions/auth"
import {useDispatch,useSelector} from "react-redux"
import Link from "next/link"
const Sidebar = () => {
  const dispatch=useDispatch()

  const Router=useRouter()
  const isSidebarOpen= useSelector(state=>state.siteReducer.isSidebarOpen)
  const authUser=useSelector(state=>state.authReducer.authUser)
  const handleLogout=()=>{
      dispatch(logoutAction())
  }
  const handleLogin=()=>{
    Router.push("/auth/login")
  }
    return (
        <div className={`w-2/4 sm:w-1/4 overflow-hidden fixed top-12vh left-0 h-[100vh] bg-gray-400 flex flex-col items-center  lg:hidden
             z-[100] transition-all duration-700 linear ${isSidebarOpen ? "-translate-x-[100vw]" :"translate-x-0" } `}>
             <div className="flex items-center justify-evenly  w-full mt-2 pb-4 border-b border-gray-700  ">
               <Image src="/img/pizzalogo.png" alt="company logo" width="50px" height="50px"/>
               <h3 className="text-gray-600 text-lg">PizzaHut</h3>
             </div>
          <div className="mt-2 p-2  ">
            <ul className="list-style-none flex flex-col items-center justify-evenly h-[80vh] ">
              <Link href={`/`} passHref><li className="flex-1 text-gray-800 hover:text-[#d1411e] cursor-pointer">Home</li></Link>
          {/*    <li className="flex-1 text-gray-800 hover:text-[#d1411e] cursor-pointer">Product</li>*/}
              <li className="flex-1 text-gray-800 hover:text-[#d1411e] cursor-pointer">Menu</li>
              <li className="flex-1 text-gray-800 hover:text-[#d1411e] cursor-pointer">Events</li>
              <li className="flex-1 text-gray-800 hover:text-[#d1411e] cursor-pointer">Blog</li>
              {
                authUser?(
                  <li
                    onClick={handleLogout}
                    className="flex-1 text-gray-800 hover:text-[#d1411e] cursor-pointer">
                    Logout
                  </li>
                ):
                (
                  <li
                    onClick={handleLogin}
                    className="flex-1 text-gray-800 hover:text-[#d1411e] cursor-pointer"
                  >
                  Log in
                </li>)
              }

            </ul>
          </div>
        </div>
    )
}


export default Sidebar
