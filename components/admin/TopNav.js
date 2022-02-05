import React,{useState,useEffect} from 'react'
import {AiOutlineSearch} from "react-icons/ai"

import {BsBell,BsHandbagFill,BsFillCartCheckFill} from "react-icons/bs"
import {GrMoney,GiPayMoney} from "react-icons/gi"
import {BiRupee} from "react-icons/bi"
import {useSelector,useDispatch} from "react-redux"
import {authTypes} from "../../redux/types"
import {logoutAction} from "../../redux/actions/auth"
import {useRouter} from "next/router"
const TopNav = () => {
  const dispatch=useDispatch()
  const [note,setNote]=useState(false)
  const router=useRouter()
  const authUser=useSelector(state=>state.authReducer.authUser)
  useEffect(()=>{
    if(!authUser?.isAdmin){
      router.push("/auth/admin/login")
    }
  },[dispatch,authUser])

  const getNotification=()=>{
    setNote(!note)
  }
  const handleLogout=()=>{
    dispatch(logoutAction())
  }
    return (
        <div className="p-4 flex z-[100] items-center justify-between h-16 sticky top-0 bg-white">

          <div className="relative h-8 bg-[white] flex items-center rounded-md shadow-md overflow-hidden">
            <input type="text" placeholder="Search here .." className="h-full w-full text-gray-600   outline-blue-500  rounded-md "/>
            <AiOutlineSearch size="24" className="cursor-pointer absolute right-[10%]"/>
          </div>

          <div className="flex items-center justify-between">
            <div className="mr-8 text-gray-600 text-base cursor-pointer" onClick={handleLogout}>
              logout
            </div>
            <div className="flex items-center  cursor-pointer relative" onClick={getNotification}>

              <div className="mr-2 relative">
                <BsBell size={28} className=""/>
                <div className=" absolute -right-1 -top-3 rounded-full bg-blue-600 px-[0.3rem]">5</div>
              </div>

              <div className={`
                absolute ${note ? "flex":"hidden"} top-10 -left-5 border border-gray-600 z-[50]`}>
                  Manoj Santra
              </div>
            </div>

          </div>

      </div>
    )
}

export default TopNav
