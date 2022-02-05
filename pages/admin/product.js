import React from 'react'
import AdSideBar from "../../components/admin/AdSideBar"
import TopNav from "../../components/admin/TopNav"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {siteTypes} from "../../redux/types"
import {useDispatch,useSelector} from "react-redux"
import Image from "next/image"
import {AiOutlineDelete} from "react-icons/ai"
import {FaEdit} from "react-icons/fa"

const Product = () => {
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
              <div className="flex justify-end mr-8 ">
                <button className="btn hover:bg-[#d1411e] transition-all duration-500 ease-in hover:text-white">Add Product</button>

              </div>
              <h1 className="text-gray-600 text-center text-2xl pb-3">Product Gallery</h1>
            <table className=" w-auto overflow-auto">
                  <tr className=" flex w-auto border border-gray-600 justify-evenly items-center font-bold text-white bg-gray-700">
                  <th className="flex-1">Product Image</th>
                  <th className="flex-1">Name</th>
                  <th className="flex-1">Base Price</th>
                  <th className="flex-1">Ingridients</th>
                  <th className="flex-1">Delete</th>
                </tr>


                  <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                    <td  className="flex-1 text-center">
                      <Image src="/img/pizza.png" width="50px" height="50px"/>
                    </td>
                    <td  className="flex-1 text-center">Santra@gmail.com</td>
                    <td  className="flex-1 text-center">24</td>
                    <td  className=" flex-1 text-center">caravan</td>
                    
                    <td  className=" flex-1 flex justify-center">
                      <AiOutlineDelete size={28} color="red" className="cursor-pointer"/>
                    </td>
                  </tr>
                  <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                    <td  className="flex-1 text-center">
                      <Image src="/img/pizza.png" width="50px" height="50px"/>
                    </td>
                    <td  className="flex-1 text-center">Santra@gmail.com</td>
                    <td  className="flex-1 text-center">24</td>
                    <td  className=" flex-1 text-center">caravan</td>
                    
                    <td  className=" flex-1 flex justify-center">
                      <AiOutlineDelete size={28} color="red" className="cursor-pointer"/>
                    </td>
                  </tr>
                  <tr className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                    <td  className="flex-1 text-center">
                      <Image src="/img/pizza.png" width="50px" height="50px"/>
                    </td>
                    <td  className="flex-1 text-center">Santra@gmail.com</td>
                    <td  className="flex-1 text-center">24</td>
                    <td  className=" flex-1 text-center">caravan</td>
                    
                    <td  className=" flex-1 flex justify-center">
                      <AiOutlineDelete size={28} color="red" className="cursor-pointer"/>
                    </td>
                  </tr>
            </table>
          </div>
        </div>
      </div>
    )
}

export default Product
Product.getLayout=function pageLayout(page){
  return(
    <>
    {page}
    </>
  )

}
