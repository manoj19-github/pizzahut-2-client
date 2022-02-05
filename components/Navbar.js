import React from 'react'
import {AiOutlineMenu} from "react-icons/ai"
import Image from "next/image"
import {AiOutlineShoppingCart}from "react-icons/ai"
import {useSelector,useDispatch} from "react-redux"
import {siteTypes,authTypes} from "../redux/types"
import {useRouter} from "next/router"
import Link from "next/link"
import {logoutAction} from "../redux/actions/auth"
const Navbar = () => {
  const Router=useRouter()
  const dispatch=useDispatch()
  const isSidebarOpen= useSelector(state=>state.siteReducer.isSidebarOpen)
  const authUser=useSelector(state=>state.authReducer.authUser)
  const handleLogout=()=>{
      dispatch(logoutAction())
  }
  const handleLogin=()=>{
    Router.push("/auth/login")
  }
  const toggleSideBar=()=>{
    if(isSidebarOpen){
      dispatch({type:siteTypes.HIDE_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_SIDEBAR})
    }
  }
  const cartLength=useSelector(state=>state.cartReducer.cartLength)
  const goToCart=()=>{
    Router.push("/cart")
  }

    return (
        <div className="navbar">
            <div className="flex items-center md:flex-3 lg:flex-2 lg:mx-16">
              <div className=" block lg:hidden mx-1 lg:ml-0 lg:mr-0 text-white cursor-pointer" onClick={toggleSideBar}>
                <AiOutlineMenu size={28}/>
              </div>
              <div className="bg-white rounded-full p-[0.3rem] h-[50px] w-[50px] md:mr-[1rem]">
                <Image
                  src="/img/telephone.png"
                  alt=""
                  width="50px"
                  height="50px"

                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-white">
                <p>Order Now</p>
                <p>9674327978</p>
              </div>
            </div>
          <div className="hidden lg:flex flex-1">
            <ul className="flex items-center justify-center text-white transition-all duration-500 ease ">
              <li className="menubar"><Link href={"/"} passHref>Home</Link></li>
              <li className="menubar">Products</li>
              <li className="menubar">Menu</li>
              <li className="menubar">
                <Image src="/img/pizzalogo.png" height="60px" width="100px"  alt="mylogo" />
              </li>
              <li className="menubar">Events</li>
              <li className="menubar">Blog</li>
            <li className="menubar"><Link href={"/orders"} passHref>My Orders</Link></li>
              <li className="menubar">Contact</li>
              {
                authUser ?(
                  <li className="menubar" onClick={handleLogout}>Log out</li>
                ):(
                  <li className="menubar" onClick={handleLogin}>Log in</li>
                )
              }
            </ul>
          </div>
          <div className=" flex justify-end pr-4  ">
            <div className="relative flex items-center cursor-pointer" onClick={goToCart}>
              <AiOutlineShoppingCart size={36} color="white"/>
            <div className="absolute left-5 text-[#d1411e] -top-2 bg-white px-[0.5rem] " style={{borderRadius:"50%"}}>
                {cartLength}
            </div>
            </div>
          </div>
        </div>


    )
}

export default React.memo(Navbar)
