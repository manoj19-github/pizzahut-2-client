import React from 'react'
import Image from "next/image"
const OrderId = ({orderData}) => {
  console.log("order Data",orderData)
  const getStatus=()=>{
    if(orderData.status=="order_placed") return 1
    else if(orderData.status=="order_prepared") return 2
    else if(orderData.status=="order_sent") return 3
    else if(orderData.status=="order_delivered") return 4
    else return 5
  }
    return (
        <div className="m-4 px-4 pt-4 pb-24">
        <h4 className="text-gray-700 text-lg my-4 ml-4 mb-8">Order Id :   {orderData._id} </h4>
        <div className="flex text-gray-600 flex-col sm:flex-row flex-wrap w-full justify-between  mt-5 mb-12">
          <p className="flex-1 my-2">Receiver : {orderData.name}</p>
          <p className="flex-1 my-2">Price : {orderData.orderPrice}</p>
          <p className="flex-1 my-2">Payment Mode : {orderData.paymentType}</p>

        </div>
        <div className="flex  flex-col sm:flex-row flex-wrap justify-between mb-12 md:mb-8">

          <div className={`flex flex-col items-center mb-12 md:mb-4
              ${getStatus() ==1  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
              `}>
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

        <div className={`flex flex-col items-center mb-12 md:mb-4
             ${getStatus() <2  && "opacity-75"}
             ${getStatus() ==2  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}`}>
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
      <div className={`flex flex-col items-center mb-12 md:mb-4
          ${getStatus() <3  && "opacity-75"}
          ${getStatus() ==3  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
          `}>
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
      {orderData.status!="order_rejected" &&
        (
          <div className={`flex flex-col items-center mb-12 md:mb-4
              ${getStatus() <4  && "opacity-75"}
              ${getStatus() ==4  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
            `}>
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
        orderData.status=="order_rejected" &&(
          <div className={`flex flex-col items-center mb-12 md:mb-4

            ${getStatus() ==5  && "animate-[wiggle_1s_ease-in-out_infinite_alternate]"}
          `}>
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
}

export default OrderId

export async function getServerSideProps(context){
  const {req,params}=context

  try{
    const mycookie= req.headers.cookie|| ""
    const aorders=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/${params.orderId}`,{
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
    }
    return {
        props:{
          orderData:orders.products

        }
      }


  }catch(err){
    console.log(`cart error `,err)

  }
}
