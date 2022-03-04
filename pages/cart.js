  import React,{useEffect,useMemo} from 'react'
  import Image from "next/image"
  import {BiRupee} from "react-icons/bi"
  import {FaEdit} from "react-icons/fa"
  import {RiDeleteBack2Fill} from "react-icons/ri"
  import {AiFillDelete} from "react-icons/ai"
  import axios from "axios"
  import {useDispatch,useSelector} from "react-redux"
  import {useRouter} from "next/router"
  import {cartTypes} from "../redux/types"
  import CartRow from "../components/Cart/CartRow"
  import CartTable from "../components/Cart/CartTable"
  import {editCartQty} from "../redux/actions/cart/editCartQty"
  import * as cookie from "cookie"
  const Cart = ({cartProduct}) => {
    const dispatch=useDispatch()
    useEffect(()=>{
      if(cartProduct?.length){
        dispatch({type:cartTypes.GET_CART_DATA,payload:cartProduct})
        dispatch({type:cartTypes.EDIT_CART_LENGTH,payload:cartProduct.length})
        localStorage.setItem("pizzahut-cart-length",JSON.stringify({cartProductLength:cartProduct.length}))
      }else{
        dispatch({type:cartTypes.GET_CART_DATA,payload:""})
        dispatch({type:cartTypes.EDIT_CART_LENGTH,payload:0})
        localStorage.setItem("pizzahut-cart-length",JSON.stringify({cartProductLength:0}))
      }
    },[dispatch,cartProduct])

    const Router=useRouter()

    const userId= useSelector(state=>state.authReducer.userId)

    const goToProduct=()=>{
      Router.push("/")
    }
    useEffect(()=>{
      if(!userId){
        Router.push("/auth/login")
      }
    },[userId])

    const cartProductData= useSelector(state=>state.cartReducer.cartItems)
    const cartProductAmount= useSelector(state=>state.cartReducer.cartAmountTotal)
    const cartTotal=useMemo(()=>{
      const cartPriceArray=cartProductData && cartProductData.map(cart=>cart.total*cart.quantity)
      if(!cartPriceArray || cartPriceArray==="undefined" ||cartPriceArray.length==0) return 0
      const priceTotal=cartPriceArray.reduce((total,value)=>{
        return total+value
      })
      return priceTotal
    },[cartProductData])
    dispatch({type:cartTypes.EDIT_CART_AMOUNT,payload:cartTotal})
    if(typeof window!=="undefined"){
      localStorage.setItem("pizzahut-cart-amount",JSON.stringify({cartAmount:cartTotal}))
      localStorage.setItem("pizzahut-cart-product",JSON.stringify(cartProductData))
    }

    const checkOutHandler=()=>{
        Router.push("/delivery")
    }
      return (

          <div className="py-4 px-1 lg:p-4 flex justify-around flex-col lg:flex-row mx-auto min-h-[90vh]">
            {
              cartProductData ? (
                <>
                <CartTable/>
                <div className="w-full lg:w-1/3 rounded-md mx-auto">
                  <div className="text-white w-[90%] bg-[#333] mx-2 p-2 flex flex-col rounded-md ">
                    <h3 className="text-center">CART TOTAL  : </h3>
                  <div className="flex m-2 justify-between">
                      <b>SubTotal :</b>
                    <div className="flex"><BiRupee size={26}/> {cartTotal}</div>
                    </div>

                    <div className="flex m-2 justify-between">
                      <b >Discount :</b>
                    <div className="flex"><BiRupee size={26}/>0</div>
                    </div>
                    <hr/>
                    <div className="flex m-2 justify-between">
                      <b >Total :</b>
                    <div className="flex"><BiRupee size={26}/>{cartProductAmount}</div>
                    </div>
                    <div className="flex justify-center items-center mt-3">
                      <button className="btn bg-white text-gray-700" onClick={checkOutHandler}>CHECK OUT NOW</button>
                    </div>
                  </div>

                </div>
                </>

            ):(
              <div className="w-1/2 relative h-[55vh] mx-auto my-8">

              <Image
                src="/img/empty-cart.png"
                layout="fill"
              />
            <h5 className="absolute text-gray-600 ml-20">Cart Empty</h5>
            <button
              className="btn absolute -bottom-20 right-24 hover:bg-gray-500 hover:text-white transition ease duration-500"
              onClick={goToProduct}>Shop Now</button>
              </div>
            )
            }

          </div>

      )
  }

  export default Cart

export async function getServerSideProps(ctx){
  try{
    const config={
              headers: {
                Authorization:`bearer ${cookie.parse(ctx.req.headers.cookie).jwtToken}`,
                "Content-Type": "application/json"
              }
          }

    const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart`,config)
    const aresp=await resp.json()
    var cartProduct=[]
    cartProduct=aresp?.cartProduct?.cartItems
    if(cartProduct){
      return {
        props:{
          cartProduct
        }
      }
    }else{
      return {
        props:{
          cartProduct:[]
        }
      }
    }
  }catch(err){
    console.log(err)

  }
}
