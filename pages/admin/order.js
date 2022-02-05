import React from 'react'
import AdSideBar from "../../components/admin/AdSideBar"
import TopNav from "../../components/admin/TopNav"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {siteTypes} from "../../redux/types"
import {useDispatch,useSelector} from "react-redux"
import Image from "next/image"
import {AiOutlineDelete} from "react-icons/ai"
import {FaEdit} from "react-icons/fa"

const Order = () => {
  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  const dispatch=useDispatch()
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
          <div class="flex ml-2 mr-2 mt-3 mb-8 flex-col w-full ">
            <h1 className="text-gray-600 text-center pb-2 border-b border-gray-600 mb-4 text-2xl font-bold">Orders Gallery</h1>
            <table className=" w-auto overflow-auto">
              <tr className=" flex w-auto border border-gray-600 justify-evenly items-center font-bold text-white text-sm bg-gray-700">
                  <th className="flex-1">Products</th>
                  <th className="flex-1">Ingridients</th>
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
                <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center text-blue-700">
                  <td  className="flex-1 text-center text-gray-500 ">Chicken Pizza</td>
                  <td  className="flex-1 text-center  ">extra sauss</td>
                  <td  className=" flex-1 text-center text-gray-500  ">Manoj Santra</td>
                  <td  className=" flex-1 flex justify-center  ">ramnagar</td>
                  <td  className=" flex-1 flex justify-center text-gray-500">3</td>
                  <td  className=" flex-1 flex justify-center  ">934</td>
                  <td  className=" flex-1 flex justify-center text-gray-500">Gagan Das,gagan@gmail.com</td>
                  <td  className=" flex-1 flex justify-center ">893439034</td>
                  <td  className=" flex-1 flex justify-center text-gray-500">Paytm</td>
                  <td  className=" flex-1 flex justify-center ">Paid</td>
                  <td  className=" flex-1 flex justify-center text-gray-500 ">
                    <form>
                    <select>
                      <option value="order_placed">Order Placed</option>
                      <option value="prepared">Prepared</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="rejected">Rejected</option>

                    </select>
                    </form>
                  </td>
              </tr>

              <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center text-blue-700">
                <td  className="flex-1 text-center text-gray-500 ">Chicken Pizza</td>
                <td  className="flex-1 text-center  ">extra sauss</td>
                <td  className=" flex-1 text-center text-gray-500  ">Manoj Santra</td>
                <td  className=" flex-1 flex justify-center  ">ramnagar</td>
                <td  className=" flex-1 flex justify-center text-gray-500">3</td>
                <td  className=" flex-1 flex justify-center  ">934</td>
                <td  className=" flex-1 flex justify-center text-gray-500">Gagan Das,gagan@gmail.com</td>
                <td  className=" flex-1 flex justify-center ">893439034</td>
                <td  className=" flex-1 flex justify-center text-gray-500">Paytm</td>
                <td  className=" flex-1 flex justify-center ">Paid</td>
                <td  className=" flex-1 flex justify-center text-gray-500 ">
                  <form>
                  <select>
                    <option value="order_placed">Order Placed</option>
                    <option value="prepared">Prepared</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>

                  </select>
                  </form>
                </td>
            </tr>
            <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center text-blue-700">
              <td  className="flex-1 text-center text-gray-500 ">Chicken Pizza</td>
              <td  className="flex-1 text-center  ">extra sauss</td>
              <td  className=" flex-1 text-center text-gray-500  ">Manoj Santra</td>
              <td  className=" flex-1 flex justify-center  ">ramnagar</td>
              <td  className=" flex-1 flex justify-center text-gray-500">3</td>
              <td  className=" flex-1 flex justify-center  ">934</td>
              <td  className=" flex-1 flex justify-center text-gray-500">Gagan Das,gagan@gmail.com</td>
              <td  className=" flex-1 flex justify-center ">893439034</td>
              <td  className=" flex-1 flex justify-center text-gray-500">Paytm</td>
              <td  className=" flex-1 flex justify-center ">Paid</td>
              <td  className=" flex-1 flex justify-center text-gray-500 ">
                <form>
                <select>
                  <option value="order_placed">Order Placed</option>
                  <option value="prepared">Prepared</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="rejected">Rejected</option>

                </select>
                </form>
              </td>
          </tr>
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
