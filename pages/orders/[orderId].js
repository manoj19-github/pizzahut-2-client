import React,{useEffect,useState,useRef} from 'react'
import Image from "next/image"
import io from "socket.io-client"
import {useDispatch,useSelector} from "react-redux"
import {orderStatusTypes} from "../../redux/types"
import moment from "moment-timezone"
import {useRouter} from "next/router"
import * as cookie from "cookie"
const SERVER_URL=`${process.env.NEXT_PUBLIC_SERVER_URL}`
var socket
const OrderId = ({orderProducts}) => {
  const dispatch=useDispatch()
  const router=useRouter()
  const {orderId}=router.query

  useEffect(()=>{
    dispatch({type:orderStatusTypes.ORDER_DATA_GET,payload:orderProducts})
  },[dispatch,orderId])
  const localOrderData=useSelector(state=>state.orderStatusReducer.orderData)

  const getStatus=()=>{
    if(localOrderData.status=="order_placed") return 1
    else if(localOrderData.status=="order_prepared") return 2
    else if(localOrderData.status=="order_out_for_delivery") return 3
    else if(localOrderData.status=="order_delivered") return 4
    else return 5
  }

  useEffect(()=>{
    socket=io(SERVER_URL)
    socket.emit("join",`order_${localOrderData?._id}`)
  },[])

  useEffect(()=>{
    socket.on("orderUpdated",(updatedOrder)=>{
      dispatch({type:orderStatusTypes.ORDER_DATA_GET,payload:updatedOrder})
    })
  },[dispatch])


  if(localOrderData)
    return (
        <div className="m-4 px-4 pt-4 pb-24">
        <h4 className="text-gray-700 text-lg my-4 ml-4 mb-8">Order Id :   {localOrderData._id} </h4>
        <div className="flex text-gray-600 flex-col sm:flex-row flex-wrap w-full justify-between  mt-5 mb-12">
          <p className="flex-1 my-2">Receiver : {localOrderData.name}</p>
          <p className="flex-1 my-2">Price : {localOrderData.orderPrice}</p>
          <p className="flex-1 my-2">Payment Mode : {localOrderData.paymentType}</p>

        </div>
        <div className="flex  flex-col relative sm:flex-row flex-wrap justify-between mb-12 md:mb-8">

          <div className={`flex flex-col relative items-center mb-12 md:mb-4
              ${getStatus() ==1  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
              `}>
              {getStatus() ==1  && <span className="absolute -right-10 -top-5 text-sm text-gray-600 z-[120]">
                {moment(localOrderData.updatedAt).tz("Asia/Kolkata").format("hh:mm A")}
              </span>
            }


            <Image src="/img/paid.png"
              width={30}
              height={30}
              alt=""
            />

          <span className="mt-1">Order Placed</span>
        <div className="flex flex-col items-center mb-12 md:mb-4">
            <Image src="/img/checked.png"
              width={20}
              height={20}
              className="absolute mt-2"
            />

          </div>
        </div>

        <div className={`flex flex-col relative items-center mb-12 md:mb-4
             ${getStatus() <2  && "opacity-75"}
             ${getStatus() ==2  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}`}
          >
             {getStatus() ==2  && <span className="absolute -right-10 -top-5 text-sm text-gray-600 z-[120]">
               {moment(localOrderData.updatedAt).tz("Asia/Kolkata").format("hh:mm A")}
             </span>
           }
          <Image src="/img/bake.png"
            width={30}
            height={30}
            alt=""

          />

        <span className="mt-1">Preparing ... </span>
        <div className="flex flex-col items-center mb-12 md:mb-4">
          <Image src="/img/checked.png"
            width={20}
            height={20}
            className="absolute mt-2"
          />

        </div>
      </div>
      <div className={`flex relative flex-col items-center mb-12 md:mb-4
          ${getStatus() <3  && "opacity-75"}
          ${getStatus() ==3  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
          `}>
          {getStatus() ==3 &&
          <span className="absolute -right-10 -top-5 text-sm text-gray-600 z-[120]">
            {moment(localOrderData.updatedAt).tz("Asia/Kolkata").format("hh:mm A")}
          </span>
        }
          <Image src="/img/bike.png"
            width={30}
            height={30}
            alt=""

          />

        <span className="mt-1">On The Way</span>
        <div className={`flex flex-col items-center mb-12 md:mb-4`}>
          <Image src="/img/checked.png"
            width={20}
            height={20}
            className="absolute mt-2"
          />
        </div>
      </div>
      {localOrderData.status!="order_rejected" &&
        (
          <div className={`flex flex-col relative items-center mb-12 md:mb-4
              ${getStatus() <4  && "opacity-75"}
              ${getStatus() ==4  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
            `}>
            {getStatus() ==4  && <span className="absolute -right-10 -top-5 text-sm text-gray-600 z-[120]">
              {moment(localOrderData.updatedAt).tz("Asia/Kolkata").format("hh:mm A")}
            </span>
          }
            <Image src="/img/delivered.png"
              width={30}
              height={30}
              alt=""

            />

          <span className="mt-1">Delivered</span>
          <div className="flex flex-col items-center mb-12 md:mb-4">

            <Image src="/img/checked.png"
              width={20}
              height={20}
              className="absolute mt-2"
            />

          </div>
        </div>
        )
       }

      {
        localOrderData.status=="order_rejected" &&(
          <div className={`flex flex-col relative items-center mb-12 md:mb-4

            ${getStatus() ==5  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
          `}>
          {getStatus() ==5  && <span className="absolute -right-10 -top-5 text-sm text-gray-600 z-[120]">
            {moment(localOrderData.updatedAt).tz("Asia/Kolkata").format("hh:mm A")}
          </span>
        }
            <Image src="/img/delivered.png"
              width={30}
              height={30}
              alt=""

            />

          <span className="mt-1">Rejected</span>
          <div className="flex flex-col items-center mb-12 md:mb-4">
            <Image src="/img/checked.png"
              width={20}
              height={20}
              className="absolute mt-2"
            />

          </div>
        </div>

        )
      }
      </div>

    </div>
    )
  else{
    return( <h1>no order Found</h1>)
  }
}

export default OrderId

export async function getServerSideProps(ctx){
  try{
    const orderId=ctx.params.orderId;
    const config={
      headers:{
        "Content-Type":"application/json",
        Accept: "application/json",
        Authorization:`bearer ${cookie.parse(ctx.req.headers.cookie).jwtToken}`,
      }
    }
    const aresp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/${orderId}`,config)
    const resp=await aresp.json()
    if(resp.status){
      return {
        props:{
          orderProducts:resp.products
        }
      }
    }else{
      return {
        props:{
          orderProducts:null
        }
      }
    }
  }catch(err){
    console.log(err)

  }

}
