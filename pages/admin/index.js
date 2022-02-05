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


const AdminPage = () => {
  const dispatch=useDispatch()
  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  const toggleAdminSidebar=()=>{
    if(isAdminSidebarOpen){
      dispatch({type:siteTypes.HIDE_AD_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_AD_SIDEBAR})
    }
  }
  const data={
    labels:["17th Jan","18th Jan","19th Jan","20th Jan","21th Jan"],
    datasets: [
      {
        label:"Sales of Last 5 Days in Rupees",
        data:[1200,1400,1600,1650,1500],
        borderColor: '#0071bd',
        backgroundColor:["#0BCEBA"],
      }
    ]
  }
  const barData={
    labels:["17th Jan","18th Jan","19th Jan","20th Jan","21th Jan"],
    datasets: [
      {
        label:"Orders of Last 5 Days in Rupees",
        data:[1200,1400,1600,1650,1500],
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
        <div className="w-full lg:w-[80vw] lg:ml-[22vw] mb-[10vh] ">
            <TopNav/>
          <div className="block lg:hidden mb-4" onClick={toggleAdminSidebar}>
            <GiHamburgerMenu size={28} color="gray"/>
          </div>
          <div className="grid grid-cols-1 grid-flow-row auto-rows-max gap-y-4">
            <FirstRecord data={data}/>
            <SecondRecord data={barData}/>
            <PieRecord/>
          <div className="flex flex-col lg:flex-row  mt-8">
              <div className="w-[90%] lg:w-[50%] flex justify-center mt-4 lg:mt-0 lg:p-4 h-full flex-col">
                <h1 className="text-center text-gray-600 text-xl mb-4 border-b border-gray-600">Latest Orders</h1>
                <table className="flex flex-col">
                      <tr className=" flex w-[100%] border border-gray-600 justify-evenly items-center font-bold text-white bg-gray-700">
                      <th className="flex-1">Name</th>
                      <th className="flex-1">Email</th>
                      <th className="flex-1">Total Orders</th>
                      <th className="flex-1">Favourite Product</th>
                    </tr>


                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">Manoj Santra</td>
                        <td  className="flex-1 text-center">Santra@gmail.com</td>
                        <td  className="flex-1 text-center">24</td>
                        <td  className=" flex-1 text-center">caravan</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">Manoj Santra</td>
                        <td  className="flex-1 text-center">Santra@gmail.com</td>
                        <td  className="flex-1 text-center">24</td>
                        <td  className=" flex-1 text-center">caravan</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">Manoj Santra</td>
                        <td  className="flex-1 text-center">Santra@gmail.com</td>
                        <td  className="flex-1 text-center">24</td>
                        <td  className=" flex-1 text-center">caravan</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">Manoj Santra</td>
                        <td  className="flex-1 text-center">Santra@gmail.com</td>
                        <td  className="flex-1 text-center">24</td>
                        <td  className=" flex-1 text-center">caravan</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">Manoj Santra</td>
                        <td  className="flex-1 text-center">Santra@gmail.com</td>
                        <td  className="flex-1 text-center">24</td>
                        <td  className=" flex-1 text-center">caravan</td>
                      </tr>
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


                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">
                          <Image src="/img/pizza.png" width="60px" height="50px"/>
                        </td>
                        <td  className="flex-1 text-center">Chicken Pizza</td>
                        <td  className="flex-1 text-center">454</td>
                        <td  className=" flex-1 text-center">34</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">
                          <Image src="/img/pizza.png" width="60px" height="50px"/>
                        </td>
                        <td  className="flex-1 text-center">Chicken Pizza</td>
                        <td  className="flex-1 text-center">454</td>
                        <td  className=" flex-1 text-center">34</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">
                          <Image src="/img/pizza.png" width="60px" height="50px"/>
                        </td>
                        <td  className="flex-1 text-center">Chicken Pizza</td>
                        <td  className="flex-1 text-center">454</td>
                        <td  className=" flex-1 text-center">34</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">
                          <Image src="/img/pizza.png" width="60px" height="50px"/>
                        </td>
                        <td  className="flex-1 text-center">Chicken Pizza</td>
                        <td  className="flex-1 text-center">454</td>
                        <td  className=" flex-1 text-center">34</td>
                      </tr>
                      <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                        <td  className="flex-1 text-center">
                          <Image src="/img/pizza.png" width="60px" height="50px"/>
                        </td>
                        <td  className="flex-1 text-center">Chicken Pizza</td>
                        <td  className="flex-1 text-center">454</td>
                        <td  className=" flex-1 text-center">34</td>
                      </tr>
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
