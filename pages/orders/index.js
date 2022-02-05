import React from 'react'
import {BiRupee} from "react-icons/bi"
import {FaEdit} from "react-icons/fa"
import {RiDeleteBack2Fill} from "react-icons/ri"
import Image from "next/image"
import Link from "next/link"
import moment from "moment-timezone"

const Order = ({orderData}) => {
  console.log("orderData",orderData)


    return (
        <div className="flex md:p-4 flex-col p-2 mt-4 lg:flex-row ">
          <div className="w-full lg:mb-12">
            <div className="row">
              {
                orderData ?(
                  <table className=" overflow- flex flex-col text-white lg:mb-24">
                    <thead className="hidden lg:flex bg-gray-600 w-full">
                      <tr className="flex justify-between items-center w-full">
                        <th className="flex-1">Order ID</th>
                        <th className="flex-1">Customer</th>
                        <th className="flex-1">Address</th>
                        <th className="flex-1">Payment Mode</th>
                        <th className="flex-1">Status</th>
                        <th className="flex-1">Total</th>
                        <th className="flex-1">Order Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 mt-4  flex flex-col justify-between items-center mb-12 md:mb-4  rounded-md shadow-md lg:border-0">
                      {
                        orderData.map((order,index)=>(
                          <tr className="flex w-full  justify-between items-center flex-col lg:flex-row border rounded-md border-gray-400 md:border-0 my-4 ">
                            <td className="flex justify-between items-center  w-full lg:w-auto mb-4 lg:mb-0 flex-col sm:flex-row">
                              <p className="block flex-1 lg:hidden  text-center font-bold">Order Id   : </p>
                            <p className={`text-gray-700 text-[13px] flex-1 text-center
                                hover:underline transition-all duration-500 ease-in
                                 `}><Link href={`/orders/${order._id}`} passHref>{order._id}</Link></p>
                            </td>
                            <td className="flex justify-between items-center  w-full lg:w-auto mb-4 lg:mb-0 flex-col sm:flex-row">
                              <p className="block flex-1 lg:hidden  text-center font-bold">customer Name   : </p>
                            <p className="text-gray-700 flex-1 text-center">{order.name}</p>
                            </td>
                            <td className="flex justify-between items-center  w-full lg:w-auto mb-4 lg:mb-0 flex-col sm:flex-row">
                              <p className="block flex-1 lg:hidden  text-center font-bold">Delivery Address : </p>
                            <p className="text-gray-700 flex-1 text-center text-[12px] sm:text-base">{order.address}</p>
                            </td>
                            <td className="flex justify-between items-center  w-full lg:w-auto mb-4 lg:mb-0 flex-col sm:flex-row">
                              <p className="block flex-1 lg:hidden  text-center font-bold">Payment Mode : </p>
                              <p className="text-gray-700 flex-1 text-center text-[22px] sm:text-base">{order.paymentType}</p>
                            </td>
                            <td className="flex justify-between items-center  w-full lg:w-auto mb-4 lg:mb-0 flex-col sm:flex-row">
                              <p className="block flex-1 lg:hidden  text-center font-bold">Order Status : </p>
                              <p className={`${order.paymentStatus ?"text-green-500":"text-red-500"} flex-1 text-center text-[22px] sm:text-base`}>{order.paymentStatus?"Paid":"Not Paid"}</p>
                            </td>

                            <td className="flex justify-between items-center  w-full lg:w-auto mb-4 lg:mb-0 flex-col sm:flex-row">
                                <p className="block flex-1 lg:hidden  text-center font-bold">Amount : </p>
                                <div className="text-gray-700 flex-1 text-center flex justify-center items-center">
                                  <BiRupee size={26}/> {order.orderPrice}
                              </div>
                            </td>
                            <td className="flex justify-between items-center  w-full lg:w-auto mb-4 lg:mb-0 flex-col sm:flex-row">
                              <p className="block flex-1 lg:hidden  text-center font-bold">Order Date : </p>
                              <p className="text-gray-700 flex-1 text-center text-[22px] sm:text-base">{moment(order.createdAt).tz("Asia/Kolkata").format("DD-MMM-YY h:m A")}</p>
                            </td>
                          </tr>



                        ))
                      }


                    </tbody>
                  </table>

                ):(
                  <h1 className="text-center">No Orders found !</h1>
                )
              }

            </div>
      </div>
    </div>



    )
}

export default Order

export async function getServerSideProps({req}){

  try{
    const mycookie= req.headers.cookie|| ""
    const aorders=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order`,{
              credentials:"include",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cookie:mycookie
              }})
    const orders=await aorders.json()

    if(!orders.status){
      return {
        props:{
          orderData:null
        }
      }
    }else{
      return {
        props:{
          orderData:orders.products

        }
      }
    }

  }catch(err){
    console.log(`cart error `,err)

  }
}
