import React,{useEffect} from 'react'
import AdSideBar from "../../components/admin/AdSideBar"
import TopNav from "../../components/admin/TopNav"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {siteTypes,adminProductTypes} from "../../redux/types"
import {useDispatch,useSelector} from "react-redux"
import Image from "next/image"
import {AiOutlineDelete} from "react-icons/ai"
import {FaEdit} from "react-icons/fa"
import Link from "next/link"
import {deleteProductData} from "../../redux/actions/admin/productAction"
import Swal from "sweetalert2"
const Product = ({products}) => {

  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  const dispatch=useDispatch()
  const toggleAdminSidebar=()=>{
    if(isAdminSidebarOpen){
      dispatch({type:siteTypes.HIDE_AD_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_AD_SIDEBAR})
    }
  }
  useEffect(()=>{
    dispatch({
      type:adminProductTypes.ADD_PRODUCT_SUCCESS,
      payload:products
    })

  },[dispatch])

  const productsData=useSelector(state=>state.adminProductReducer.products)
  const productsLoading=useSelector(state=>state.adminProductReducer.loading)
  const deleteProduct=(productId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "Your Product will be permanently deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductData(productId))
      }
    })
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
              <div className="flex justify-end mr-8 ">
                <Link href={"/admin/addProduct"} passHref>
                  <button
                  className="btn hover:bg-[#d1411e] transition-all duration-500 ease-in hover:text-white">
                  Add Product
                </button>
                </Link>

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
                {
                  !productsLoading &&
                  productsData?.map((product,index)=>(
                    <tr key={index} className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                      <td  className="flex-1 text-center">
                        <Image src={`${product.image}`} width="50px" height="50px"/>
                      </td>
                      <td  className="flex-1 text-center">{product.name}</td>
                      <td  className="flex-1 text-center">{product.base_price}</td>
                      <td  className=" flex-1 text-center">{
                          product.ingridients?.map((data,index)=>(
                            <span key={index}>{data.text} , </span>
                          ))
                        }
                      </td>
                      <td  className=" flex-1 flex justify-center">
                        <AiOutlineDelete size={28} color="red" className="cursor-pointer"
                          onClick={()=>deleteProduct(product._id)}
                        />
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

export default Product
Product.getLayout=function pageLayout(page){
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
    const rawData=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/dashboard/products`,config)
    const productsData=await rawData.json()
    if(!productsData.status){
      return{
        props:{
          products:null
        }
      }
    }
    return{
        props:{
          products:productsData.products
        }
    }
  }catch(err){
    console.log("error occured in dashboard",err)
  }
}
