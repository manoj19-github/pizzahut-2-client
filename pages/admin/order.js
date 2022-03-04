import React,{useEffect} from 'react'
import AdSideBar from "../../components/admin/AdSideBar"
import TopNav from "../../components/admin/TopNav"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {siteTypes} from "../../redux/types"
import {useDispatch,useSelector} from "react-redux"
import Image from "next/image"
import {AiOutlineDelete} from "react-icons/ai"
import {FaEdit} from "react-icons/fa"
import {adminOrderTypes,notifyTypes} from "../../redux/types"
import io from "socket.io-client"
import {toast} from "react-toastify"
import{orderStatusChange} from "../../redux/actions/admin/productAction"
import "react-toastify/dist/ReactToastify.css"
import * as cookie from "cookie"
toast.configure()

const SERVER_URL=`${process.env.NEXT_PUBLIC_SERVER_URL}`
var socket
const Order = ({orders}) => {
  const isOrderPage=useSelector(state=>state.siteReducer.tabIndex)
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch({type:adminOrderTypes.SET_ORDER_DATA,payload:orders})
  },[dispatch])
  useEffect(()=>{
    dispatch({type:notifyTypes.NOTIFY_CLEAN})
  },[])
  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  const orderData=useSelector(state=>state.adminOrderReducer.orderData)
  const handleChange=(event,productId)=>{
    dispatch(orderStatusChange(productId,event.target.value))
  }
  const toggleAdminSidebar=()=>{
    if(isAdminSidebarOpen){
      dispatch({type:siteTypes.HIDE_AD_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_AD_SIDEBAR})
    }
  }
  return (
      <div className="flex  h-full ">
        <AdSideBar/>
        <div className="w-full lg:w-[75vw] lg:ml-[22vw] mb-[10vh] ">
          <TopNav/>
          <div className="block lg:hidden mb-4" onClick={toggleAdminSidebar}>
            <GiHamburgerMenu size={28} color="gray"/>
          </div>
          <div className="flex ml-2 mr-2 mt-3 mb-8 flex-col w-full ">
            <h1 className="text-gray-600 text-center pb-2 border-b border-gray-600 mb-4 text-2xl font-bold">Orders Gallery</h1>
            <table className=" w-auto overflow-auto">
              <tr className=" flex w-auto border border-gray-600 justify-evenly items-center font-bold text-white text-sm bg-gray-700">
                  <th className="flex-1">Products</th>
                  <th className="flex-1">Orderer</th>
                  <th className="flex-1">Delivery Address</th>
                  <th className="flex-1">Quantity</th>
                  <th className="flex-1">Total Price</th>
                  <th className="flex-1">Receiver</th>
                  <th className="flex-1">Ordered At</th>
                  <th className="flex-1">Phone No</th>
                  <th className="flex-1">Payment Type</th>
                  <th className="flex-1">Payment Status</th>
                  <th className="flex-1">Order Status</th>
                </tr>
                {
                  orderData && orderData?.map((order,index)=>(
                    <tr className="flex text-[15px] justify-between   w-[100%] border border-gray-600 items-center text-blue-700" key={index}>
                      <td  className="flex-1 text-center text-gray-500 ">
                        <span className="mr-2 text-[12px]">{order._id}</span><br/>
                        {

                          order.product?.map((item,index)=>(
                            <span key={index}>{item.product.name} ,</span>
                          ))
                        }
                      </td>

                      <td  className=" flex-1 text-center text-gray-500  ">
                        {
                          order.customerId.name
                        }
                      </td>
                      <td  className=" flex-1 flex justify-center  ">
                        {order.address}
                      </td>
                      <td  className=" flex-1 flex justify-center text-gray-500">
                        {
                          order.product.reduce((total,val)=>total+val.quantity,0)
                        }
                      </td>
                      <td  className=" flex-1 flex justify-center  ">
                        {
                          order.orderPrice
                        }
                      </td>
                      <td  className=" flex-1 text-[13px] text-gray-500">
                        <p>{order.name}</p>
                        <p>{order.email}</p>

                      </td>
                      <td  className=" flex-1 flex justify-center ">
                        {order.phone}
                      </td>
                      <td  className=" flex-1 flex justify-center text-gray-500">
                        {order.paymentType}
                      </td>
                      <td  className={` flex-1 flex justify-center
                          ${order.paymentStatus ?"text-green-600":"text-red-600"} `}>
                        {order.paymentStatus?"Paid":"not Paid"}
                      </td>
                      <td  className=" flex-1 flex justify-center text-gray-500 ">
                        <form>
                          <select
                            className="outline-none cursor-pointer py-2"
                            onChange={(e)=>handleChange(e,order._id)} value={order.status}>
                            <option value="order_placed">Order Placed</option>
                            <option  value="order_prepared">Prepared</option>
                          <option  value="order_out_for_delivery">Out for Delivery</option>
                        <option  value="order_delivered">Delivered</option>
                      <option value="order_rejected">Rejected</option>

                          </select>
                        </form>
                      </td>
                  </tr>

                  ))
                }
            </table>
          </div>
        </div>
      </div>
    )
}

export default Order
Order.getLayout=function pageLayout(page){
  return(
    <>
      {page}
    </>
  )

}

export async function getServerSideProps(ctx){
  try{

    const config={
      headers:{
        "Content-Type":"application/json",
        Accept: "application/json",
        Authorization:`bearer ${cookie.parse(ctx.req.headers.cookie).jwtToken}`,
      }
    }
    const rawData=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/dashboard/orders`,config)
    const ordersData=await rawData.json()
    if(!ordersData.status){
      return{
        props:{
          orders:null
        }
      }
    }
    return{
        props:{
          orders:ordersData.orders
        }
    }
  }catch(err){
    console.log("error occured in dashboard",err)
  }
}
