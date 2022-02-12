import React,{useState,useEffect} from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import io from "socket.io-client"
import {BsBell,BsHandbagFill,BsFillCartCheckFill} from "react-icons/bs"
import {GrMoney,GiPayMoney} from "react-icons/gi"
import {BiRupee} from "react-icons/bi"
import {useSelector,useDispatch} from "react-redux"
import {logoutAction} from "../../redux/actions/auth"
import {useRouter} from "next/router"
import {adminOrderTypes,notifyTypes,adminProductTypes} from "../../redux/types"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
const SERVER_URL=`${process.env.NEXT_PUBLIC_SERVER_URL}`
var socket
const TopNav = () => {
  const dispatch=useDispatch()
  const [note,setNote]=useState(false)
  const [toggleNotes,setToggleNotes]=useState(false)
  const router=useRouter()
  const isAdmin=useSelector(state=>state.authReducer.isAdmin)
  const isOrderPage=useSelector(state=>state.siteReducer.tabIndex)

  useEffect(()=>{
    if(!isAdmin){
      router.push("/auth/admin/login")
    }
  },[dispatch,isAdmin])

  const getNotification=()=>{
    setNote(!note)
  }
  const handleLogout=()=>{
    dispatch(logoutAction())
  }
  useEffect(()=>{
    socket=io(SERVER_URL)
    socket.emit("join","adminRoom")
  },[])

  useEffect(()=>{
    socket.on("productAdded",(newProduct)=>{
      if(isOrderPage==4){
        dispatch({type:adminProductTypes.ADD_NEW_PRODUCT,payload:newProduct})
      }
    })
    socket.on("orderPlaced",(newOrder)=>{
      if(isOrderPage==1){
        dispatch({type:adminOrderTypes.ADD_NEW_ORDER,payload:newOrder})
      }else{
        dispatch({type:notifyTypes.NOTIFY_SET,payload:newOrder})
        localStorage.setItem("pizzahut-admin-notification",JSON.stringify(newOrder))
      }
      toast.success("new Order Added",{position:toast.POSITION.TOP_RIGHT})
    })
  },[dispatch])
  const notifyData=useSelector(state=>state.notifyReducer.notifyData)
  const notifyHandler=()=>{
    dispatch({type:notifyTypes.NOTIFY_CLEAN})
    router.push("/admin/order")


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
                <BsBell size={28} className="" onClick={()=>setToggleNotes(!toggleNotes)}/>
                {
                  notifyData?.length>=1 && <div className=" absolute -right-1 -top-3 rounded-full bg-blue-600 px-[0.3rem]">{notifyData.length}</div>
                }
              </div>
              {
              toggleNotes &&  notifyData?.map((note,index)=>(
                  <div
                    key={index}
                    onClick={notifyHandler}
                    className={`
                    absolute z-[150]  top-10 w-[50vw] py-4 right-2  px-4 border border-gray-400 rounded-md`}
                  >
                    new Order is placed to {note.name}

                  </div>

                ))
              }

            </div>

          </div>

      </div>
    )
}

export default TopNav
