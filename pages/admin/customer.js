import React from 'react'
import AdSideBar from "../../components/admin/AdSideBar"
import TopNav from "../../components/admin/TopNav"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {siteTypes} from "../../redux/types"
import {useDispatch,useSelector} from "react-redux"
import Image from "next/image"
import {AiOutlineDelete} from "react-icons/ai"
import {FaEdit} from "react-icons/fa"

const Customer = ({customers}) => {
  console.log("customers",customers)
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
        <div className="w-full lg:w-[75vw] lg:ml-[22vw] mb-[10vh]  ">
          <TopNav/>
          <div className="block lg:hidden mb-4" onClick={toggleAdminSidebar}>
            <GiHamburgerMenu size={28} color="gray"/>
          </div>
          <div class="flex ml-2 mr-2 mt-3 mb-8 flex-col w-full ">
            <h1 className="text-gray-600 text-center pb-2 border-b border-gray-600 mb-4 text-2xl font-bold">Customers Gallery</h1>
            <div className="w-full flex justify-between items-center">
              <table className="w-[90%] mx-auto mr-2 overflow-auto">
                <tr className=" flex w-auto border border-gray-600 justify-evenly items-center font-bold text-white bg-gray-700">
                    <th className="flex-1">Name</th>
                    <th className="flex-1">Email</th>
                    <th className="flex-1">Total Cart</th>
                </tr>
                {
                  customers?.cartProduct?.map((data,index)=>(
                    <tr className="flex text-sm justify-between   w-[100%] border border-gray-600 items-center">
                      <td  className=" text-center">{data._id.user.name}</td>
                      <td  className="text-left">{data._id.user.email}</td>
                      <td  className="text-center mr-3">{data._id.product?.length}</td>

                    </tr>

                  ))
                }
              </table>
              <table className=" w-[90%] mx-auto ml-2 overflow-auto">
                <tr className=" flex w-auto border border-gray-600 justify-evenly items-center font-bold text-white bg-gray-700">
                    <th className="flex-1">Name</th>
                    <th className="flex-1">Email</th>
                    <th className="flex-1">Total Order</th>
                </tr>
                {
                  customers?.orderProduct?.map((data,index)=>(
                    <tr className="flex text-sm justify-between   w-[100%] border border-gray-600 items-center">
                      <td  className=" text-center">{data._id.name}</td>
                      <td  className="text-left">{data._id.email}</td>
                      <td  className="text-left mr-2">{data.count}</td>

                    </tr>

                  ))
                }
              </table>
            </div>

          </div>
        </div>
      </div>
    )
}

export default Customer
Customer.getLayout=function pageLayout(page){
  return(
    <>
      {page}
    </>
  )

}

export async function getServerSideProps({req}){
  try{
    const Cookie=req.headers.cookie|| ""
    const config={
      credentials:"include",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Cookie
      }
    }
    const rawData=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/dashboard/customers`,config)
    const customers=await rawData.json()
    if(!customers.status){
      return{
        props:{
          dashboardData:null,
          customers:null
        }
      }
    }
    return{
        props:{
          customers
        }

    }

  }catch(err){
    console.log("error occured in dashboard",err)
  }



}
