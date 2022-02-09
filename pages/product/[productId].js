import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Image from "next/image"
import {BiRupee} from "react-icons/bi"
import {TiTick} from "react-icons/ti"
import {clientProductTypes} from "../../redux/types"
import ProductImage from "../../components/ProductImage"
import {cartAction} from "../../redux/actions/cart/cartAction"
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
const Product = ({product}) => {
  const [pizzaSize,setPizzaSize]=useState(1)
  const [val,setVal]=useState("manoj")
  const dispatch=useDispatch()
  const Router=useRouter()
  useEffect(()=>{
    dispatch({
        type:clientProductTypes.DEFAULT_PRODUCT_DATA,
        payload:{
          actual_price:product.base_price,
          name:product.name,
          image:product.image,
          details:product.details,
          productId:product._id
        }
      })
  },[])
  const ingriData= product.ingridients.map(ing=>{
    return {
      key:ing.text,
      value:false
    }
  })
  const [ingriState,setIngriState]=useState(ingriData)

  const clickHandler=(e)=>{
    let newIngriState=ingriState.map((state,ind)=>{
      if(e.target.value==ind){
          state.value=!state.value
          return state
      }
      return state
    })
    setIngriState([...newIngriState])
      if(ingriState[e.target.value].value){
        let ingridients=product.ingridients[e.target.value]
        dispatch({type:clientProductTypes.EDIT_INGRIDIENTS,payload:ingridients})
      }else{
        dispatch({type:clientProductTypes.REMOVE_INGRIDIENTS,payload:product.ingridients[e.target.value]})
      }
  }
  const sizeHandler=(val)=>{
    dispatch({type:clientProductTypes.EDIT_SIZE_TO_PRODUCT,payload:val})
  }
  const editQty=(e)=>{
    if(+e.target.value<1) return
    dispatch({type:clientProductTypes.EDIT_PRODUCT_QTY,payload:+e.target.value})
  }
  const [myPrice,setMyprice]=useState(product.base_price)

  const productData=useSelector(state=>state.clientSingleProductReducer)
  const productSize=useSelector(state=>state.clientSingleProductReducer.productSize)
  const userToken=useSelector(state=>state.authReducer.userToken)

  const addToCart=async()=>{
    if(!userToken){
      Router.push("/auth/login")
      return
    }

    const status=await dispatch(cartAction(productData,Router))
    switch(status){
      case 1:
        Router.push("/cart")
        break;
      case -1:
        toast.error("Something went wrong",{position:toast.POSITION.TOP_RIGHT})
        return
      default:return
    }
  }

    return (
        <div className="h-[130vh] md:h-[110vh] mb-8 h-auto flex flex-col  md:flex-row  lg:text-left">
          <ProductImage image={product.image}/>
          <div className=" md:flex-1  w-full md:mt-8 mx-2 sm:mx-3">
            <div className="flex flex-row  items-center justify-between  flex-wrap w-full">
              <h1 className="text-2xl mt-4 md:mt-8 text-gray-600 pb-4 flex-1">{productData.name}</h1>
              <div className="text-[#d1411e] flex  items-center justify-center   text-xl  font-bold  flex-1"><BiRupee size={26}/> {productData.actual_price+productData.ingriPriceTotal}</div>
            </div>
            <p className="text-gray-600 text-sm my-4">{productData.details}</p>
        <div className="flex flex-col h-[40%]">
              <div className="flex-1">
              <h3 className="text-[0.9rem] my-4 text-gray-600">Choose your size : <span className="text-[12px]"> (Default size is medium)</span>  </h3>
            <div className="flex flex-col  mt-4 ml-4 justify-around items-center sm:flex-row relative w-full h-auto ">
              {  product?.sizes?.map((sizeItem,index)=>(
                  <div key={sizeItem._id} className={`${sizeItem.size[0]} relative cursor-pointer mt-4 mb-8`} onClick={()=>sizeHandler(sizeItem)}>
                    <Image src={`/img/${sizeItem.size[0]}size.png`} layout="fill" alt="small"/>
                  <span  className="text-base absolute -bottom-5">{sizeItem.size[0]}</span>
                  <TiTick size={28} className={productSize == sizeItem.size[0]?"block text-red-500 absolute top-2": "hidden text-red-500 absolute top-2 "}/>
                  </div>

                ))}
              </div>
            </div>
            <div className="flex flex-col h-auto">
              <h3 className="text-[0.9rem] my-4 text-gray-600">Choose addional ingredients</h3>
            <div className="grid auto-flow-rows auto-rows-auto lg:grid-cols-4 grid-cols-2 justify-between">
              {
                ingriState?.map((ingri,index)=>(
                  <div className="flex sm:mr-[1rem] sm:h-[1rem] text-[0.7rem] items-center mt-5 lg:mt-0" key={index}>
                    <input type="checkbox" checked={ingri.value} value={index} id="double" name="double"
                      className="w-[1rem] h-[1rem] mr-3" onChange={clickHandler}/>
                    <label htmlFor="double">{ingri.key}</label>
                  </div>
                )
              )
            }
            </div>
            <div className="my-8 mx-4  flex justify-between items-center  flex-col sm:flex-row">
              <div className="flex-1 my-4 sm:my-0">
                <label>Choose Qty : </label>
                <input
                  type="number"
                  value={productData.qty}
                  className="w-[50px] h-[30px] outline-none"
                  onChange={editQty}
                />
              </div>
              <div className="flex-1 my-4 sm:my-0">
                <button
                  className={`h-[1.5rem] ml-[1rem] bg-[#d1411e] text-white
                    border-0 outline-none py-[1.4rem] px-[2rem] flex items-center
                    cursor-pointer border font-bold rounded-md transition-all
                    ease-in duration-500 hover:text-[#d1411e] hover:bg-white hover:border-gray-600
                    text-[15px] lg:text-lg `}
                    onClick={addToCart}
                    >
                      Add To Cart
                </button>
              </div>
            </div>

        </div>

      </div>
    </div>
  </div>
  )
}

export default Product

export async function getStaticPaths(){
  const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }})
  const data=await resp.json()

  const paths=data.products?.map((product)=>{
    return {
      params:{
        productId:`${product._id}`
      }
    }
  })
  return {
    paths,
    fallback:"blocking"
  }
}

export async function getStaticProps(context){
  const {params}=context
  try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product?productId=${params.productId}`,{
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }})
          const data=await response.json()
    return{
      props:{
        product:data.product
      },
      revalidate:1000
    }
  }catch(err){

  }
}
