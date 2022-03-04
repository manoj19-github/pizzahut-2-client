import React from 'react'
import Image from "next/image"
import AdSideBar from "../../components/admin/AdSideBar"
import TopNav from "../../components/admin/TopNav"
import {BsBell,BsHandbag,BsCartCheck} from "react-icons/bs"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {BiRupee} from "react-icons/bi"
import {RiBillLine} from "react-icons/ri"
import {useDispatch,useSelector}  from "react-redux"
import CountUp from "react-countup"
import {siteTypes} from "../../redux/types"
import { Line,Bar } from 'react-chartjs-2';
import FirstRecord from "../../components/admin/FirstRecord"
import SecondRecord from "../../components/admin/SecondRecord"
import PieRecord from "../../components/admin/PieRecord"
import moment from "moment"
import * as cookie from "cookie"

const AdminPage = ({dashboardData,lastData}) => {
  const dispatch=useDispatch()
  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  const toggleAdminSidebar=()=>{
    if(isAdminSidebarOpen){
      dispatch({type:siteTypes.HIDE_AD_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_AD_SIDEBAR})
    }
  }
  console.log("lastDAta",lastData)
  let lineLabel=lastData?.lastFiveOrder?.map(data=>{
    return moment(data._id).format("do MMM")
  })
  let lineData=lastData?.lastFiveOrder?.map(data=>data.totalOrder)
  let labelBar=lastData?.lastFivePaid?.map(data=>{
    return moment(data._id).format("do MMM")
  })
  const dataOfBar=lastData?.lastFivePaid?.map(data=>data.totalOrder)
  const pieLabel=lastData?.topSalesProduct?.map(data=>data._id?.name)
  const pieData=lastData?.topSalesProduct?.map(data=>data?.count)
  const data={
    labels:lineLabel,
    datasets: [
      {
        label:"Sales of Last 5 Days in Rupees",
        data:lineData,
        options: {
          responsive: true,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }]
          }
        },
        borderColor: '#0071bd',
        backgroundColor:["#0BCEBA"],
      }
    ]
  }
  const barData={
    labels:labelBar,
    datasets: [
      {
        label:"Payment of Last 5 Days in Rupees",
        data:dataOfBar,
        options: {
          responsive: true,
          legend:{
            position:"top"
          },

        },
        borderColor: '#0071bd',
        backgroundColor:["#0BCEBA"],
      }
    ]
  }
 //  const options = {
 //   title: {
 //     display: true,
 //     text: 'Line Chart'
 //   },
 //   scales: {
 //     yAxes: [
 //       {
 //         ticks: {
 //           min:0,
 //           max: 6,
 //           stepSize: 1
 //         }
 //       }
 //     ]
 //   }
 // }
    return (
        <div className="flex  h-full ">
          <AdSideBar/>
        <div className="w-[90vw] ml-[5vw] lg:w-[80vw] lg:ml-[22vw] mb-[10vh] ">
            <TopNav/>
          <div className="block lg:hidden mb-4" onClick={toggleAdminSidebar}>
            <GiHamburgerMenu size={28} color="gray"/>
          </div>
          <div className="grid grid-cols-1 grid-flow-row auto-rows-max gap-y-4">
            <FirstRecord data={data} dashboardData={dashboardData}/>
            <SecondRecord data={barData} customers={lastData.topFiveCustomer}/>
            <PieRecord pieLabel={pieLabel} pieData={pieData}/>
          <div className="flex flex-col lg:flex-row  mt-8">
              <div className="w-[90%] lg:w-[50%] flex justify-center mt-4 lg:mt-0 lg:p-4 h-full flex-col">
                <h1 className="text-center text-gray-600 text-xl mb-4 border-b border-gray-600">Latest Orders</h1>
                <table className="flex flex-col">
                      <tr className=" flex w-[100%] border border-gray-600 justify-evenly items-center font-bold text-white bg-gray-700">
                      <th className="flex-1">Name</th>
                      <th className="flex-1">Email</th>
                      <th className="flex-1">Amount</th>
                      <th className="flex-1">payment status</th>
                      <th className="flex-1">order status</th>
                    </tr>
                    {
                      lastData?.latestOrder?.map((data,index)=>(
                        <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center text-[14px]" key={index}>
                          <td  className="flex-1 text-center">{data.customerId.name}</td>
                          <td  className="flex-1 text-center">{data.customerId.email}</td>
                          <td  className="flex-1 text-center">{data.orderPrice}</td>
                          <td  className={`flex-1 text-center ${data.paymentStatus?"text-green-700":"text-red-700"}`}>{data.paymentStatus?"paid":"not paid"}</td>
                          <td  className={`flex-1 text-center`}>{data.status}</td>
                        </tr>

                      ))
                    }
                </table>
              </div>
              <div className="w-[90%] lg:w-[50%] flex justify-center mt-4 lg:mt-0 lg:p-4 h-full flex-col">
                <p className="text-gray-600 text-xl pb-4 border-b border-gray-700 text-center">Best Selled Product In last 10 Days</p>
                <table className="flex flex-col">
                      <tr className=" flex w-[100%] border border-gray-600 justify-evenly items-center font-bold text-white bg-gray-700">
                      <th className="flex-1">Product</th>
                      <th className="flex-1">Name</th>
                      <th className="flex-1">Base Price</th>
                      <th className="flex-1">No of Sells</th>
                    </tr>
                    {
                      lastData?.topSalesProduct?.map((data,index)=>(
                        <tr key={index} className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                          <td  className="flex-1 text-center">
                            {data._id?.image ? <Image src={data._id.image} width="60px" height="50px"/> : "product deleted"}
                          </td>
                          <td  className="flex-1 text-center">{data?._id?.name}</td>
                        <td  className="flex-1 text-center">{data?._id?.base_price}</td>
                      <td  className=" flex-1 text-center">{data?.count}</td>
                        </tr>

                      ))
                    }
                </table>

              </div>
          </div>
            </div>
          </div>
        </div>
    )
}

export default AdminPage

AdminPage.getLayout=function PageLayout(page){
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
  //  console.log("cookie",cookie.parse(ctx.req.headers.cookie).jwtToken)
    const rawData=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/dashboard/label`,config)
    const dashboardData=await rawData.json()
    const rawData2=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/dashboard/lastFive`,config)
    const lastData=await rawData2.json()
    if(!dashboardData.status||!lastData.status){
      return{
        props:{
          dashboardData:null,
          lastData:null
        }
      }
    }
    return{
        props:{
          dashboardData,
          lastData
        }

    }

  }catch(err){
    console.log("error occured in dashboard",err)
  }



}
