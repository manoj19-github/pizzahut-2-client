
import React,{useState,useEffect,useRef} from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import {BiRupee} from "react-icons/bi"
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from "yup"
import {useSelector,useDispatch} from "react-redux"
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {orderTypes} from "../redux/types"
import ReCAPTCHA from "react-google-recaptcha"
import "react-credit-cards/es/styles-compiled.css"
import StripeCheckout from "react-stripe-checkout"
import {makePaymentWithCard} from "../redux/actions/payment/makePaymentWithCard"
import{makePaymentWithCod} from "../redux/actions/payment/makePaymentWithCod"
import HeadTag from "../components/HeadTag"
toast.configure()

const Delivery = () => {
  const Router=useRouter()
  const savebtnRef=useRef()

  const [defaultAddress,setDefaultAddress]=useState(false)
  const [captcheEnabled,setCaptchaEnabled]=useState(false)

  const initStates={
    name:"",
    email:"",
    phone:"",
    pincode:"",
    locality:"",
    address:"",
    city:""
  }
  const validationSchema=Yup.object({
    name:Yup.string().trim().required("name is required"),
    email:Yup.string().trim().matches(/^[A-Za-z1-9_%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/i,"email not valid")
              .required("email is required"),
    phone:Yup.number().min(8,"must contain 8 digit").required("phone number required"),
    pincode:Yup.number().min(6,"must contain 6 digit").required("pincode must required"),
    address:Yup.string().trim().required("address required"),
    locality:Yup.string().trim().required("locality requried")
  })

  const paymentMenu={
    card:false,
    cod:false

  }

  const activeCardPayment=()=>{
    dispatch({type:orderTypes.SET_PAYMENT_OPTION,payload:{paymentMode:"card",option:1}})
    setPaymentMethod({
      card:!paymentMethod.card,
      cod:false

    })
  }
  const activeCashPayment=async()=>{

    dispatch({type:orderTypes.SET_PAYMENT_OPTION,payload:{paymentMode:"cod",option:2}})
    setPaymentMethod({
      card:false,
      cod:!paymentMethod.cod
    })
  }
  const submitHandler=(values)=>{
      console.log(values)
      localStorage.setItem("pizzahut-delivery-address",JSON.stringify(values))
      dispatch({type:orderTypes.SET_DELIVERY_ADDRESS,payload:values})
      toast.success("delivery address is saved",{position:toast.POSITION.TOP_RIGHT})
  }
  const [paymentMethod,setPaymentMethod]=useState(paymentMenu)
  const dispatch=useDispatch()
  useEffect(()=>{
    let address=localStorage.getItem("pizzahut-delivery-address")?
    JSON.parse(localStorage.getItem("pizzahut-delivery-address")):null
    setDefaultAddress(address)
  },[])
  const cartItems=useSelector(state=>state.cartReducer.cartItems)
  const cartProductAmount=useSelector(state=>state.cartReducer.cartAmountTotal)
  const authUser= useSelector(state=>state.authReducer.authUser)

  useEffect(()=>{
    if(!authUser){
      Router.push("/auth/login")
    }
  },[authUser])



  const deliveryAddress=useSelector(state=>state.orderReducer.address)
  const paymentOption=useSelector(state=>state.orderReducer.paymentOption)
  const option= useSelector(state=>state.orderReducer.option)

  const orderData={cartItems,cartProductAmount,deliveryAddress,paymentOption,option}
  console.log("orderData",orderData)
  const orderRequestWithCash=()=>{
    if(!captcheEnabled){
      alert("please click the cpatcha")
      return
    }

    dispatch(makePaymentWithCod(orderData,Router))
  }
  const orderRequestWithCard=(token)=>{
    if(!captcheEnabled){
      alert("please click the cpatcha")
      return
    }
    dispatch(makePaymentWithCard(token,orderData,Router))
  }
  const handleCaptcha=(value)=>{
    if(value!=""){
      setCaptchaEnabled(true)
    }


  }
    return (
        <div className="flex justify-around flex-col md:flex-row px-1 py-4 sm:p-4 ">
          <HeadTag headLine="PizzaHut"/>
          <div className="w-full md:w-2/3">
            <div className="my-4 w-full">
              <h3 className="text-gray-500 text-center text-base">DELIVERY ADDRESS</h3>
            <Formik
              initialValues={defaultAddress || initStates}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={submitHandler}
            >
              {
                formik=>{
                  console.log("formik",formik)

                  return(
                  <Form>
                    <div className="w-full flex flex-col flex-wrap my-4">
                      <label>Name</label>
                      <Field type="text" name="name" className="h-8 border-0 border-b border-gray-600 outline-none max-w-[90%]"/>
                      <ErrorMessage name="name">
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                    </div>
                    <div className="w-full flex flex-col flex-wrap my-4">
                      <label>10-Digit Number </label>
                      <Field type="number" name="phone" className="h-8 border-0 border-b border-gray-600 outline-none max-w-[90%]"/>
                      <ErrorMessage name="phone">
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                  </div>
                  <div className="w-full flex flex-col flex-wrap my-4">
                    <label>Email address </label>
                    <Field type="email" name="email" className="h-8 border-0 border-b border-gray-600 outline-none max-w-[90%]"/>
                    <ErrorMessage name="email">
                      {
                        errors=>{
                          return <span style={{color:"red"}}>{errors}</span>
                        }
                      }
                    </ErrorMessage>
                </div>
                <div className="w-full flex flex-col flex-wrap my-4">
                  <label>Pincode</label>
                  <Field type="number" name="pincode" className="h-8 border-0 border-b border-gray-600 outline-none max-w-[90%]"/>
                  <ErrorMessage name="pincode">
                    {
                      errors=>{
                        return <span style={{color:"red"}}>{errors}</span>
                      }
                    }
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col flex-wrap my-4">
                 <label>Locality</label>
                <Field as ="textarea" type="text" name="locality" className="h-8 border-0 border-b border-gray-600 outline-none max-w-[90%]"/>
                <ErrorMessage name="locality">
                  {
                    errors=>{
                      return <span style={{color:"red"}}>{errors}</span>
                    }
                  }
                </ErrorMessage>
               </div>
               <div className="w-full flex flex-col flex-wrap my-4">
                  <label>Address</label>
                <Field as="textarea" type="text" name="address" className="h-8 border-0 border-b border-gray-600 outline-none max-w-[90%]"/>
                <ErrorMessage name="address">
                  {
                    errors=>{
                      return <span style={{color:"red"}}>{errors}</span>
                    }
                  }
                </ErrorMessage>
                </div>
                <div className="w-full flex flex-col flex-wrap my-4">
                  <label>City/Town/District</label>
                <Field as ="textarea" type="text" name="city" className="h-8 border-0 border-b border-gray-600 outline-none max-w-[90%]"/>
                <ErrorMessage name="city">
                  {
                    errors=>{
                      return <span style={{color:"red"}}>{errors}</span>
                    }
                  }
                </ErrorMessage>
                </div>
                <div className="w-full flex flex-col flex-wrap my-4 mx-0">
                  <Field type="submit" name="submit" id="submit" ref={savebtnRef}
                    className="submitBtn border border-gray-700 ml-[18vw] md:ml-[10vw] w-[60%] py-2 rounded-md bg-gray-600"
                    value="Save And Continue"
                  />
                </div>
              </Form>
            )
          }
          }
        </Formik>
      </div>
    </div>
          <div className="w-full flex-1 flex p-2 lg:p-4 flex-wrap flex-col rounded-md">
            <div className="mt-4">
              <h3 className="text-center text-lg text-gray-600">PRICE DETAILS</h3>
            <div className="pt-4 mt-4 flex flex-row flex-wrap justify-between " >
                <div className="w-2/4 text-center sm:text-left">
                  Delivery Charges
                </div>
                <div className="w-2/4 flex items-center justify-center sm:justify-end mt-2 sm:mt-0">
                  <BiRupee size={26}/>
                    {cartProductAmount}
                </div>
              </div>
              <div className="pt-4 mt-4 flex flex-row flex-wrap justify-between " >
                <div className="w-2/4 text-center sm:text-left">
                  Discount :
                </div>
                <div className="w-2/4 flex items-center justify-center sm:justify-end mt-2 sm:mt-0">
                  <BiRupee size={26}/>
                    0
                </div>
              </div>
                <div className="pt-4 mt-4 flex flex-row flex-wrap justify-between border-t border-gray-700  " >
                  <div className="w-2/4 font-bold">
                    Amount Payable
                  </div>
                  <div className="w-2/4 flex items-center justify-end">
                    <BiRupee size={26}/>
                      {cartProductAmount}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap flex-col items-center">
                {/* payment option */}
                <h3 className="text-center text-lg text-gray-600 mb-6 ">Payment Option</h3>

              <div className="flex items-center  space-x-2.5 w-full">
                  <input type="radio" checked={paymentMethod.card} className="w-4 h-4 cursor-pointer w-1/8"
                    onClick={activeCardPayment}/>
                  <div className="w-full">
                    <StripeCheckout
                      stripeKey={`${process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY}`}
                      token={orderRequestWithCard}
                      amount={cartProductAmount*100}
                      name="Pizza Hut"
                      billingAddress
                      shippingAddress
                    >
                    <button
                      className={` py-2 rounded-md border border-blue-500  transition bg-blue-500 text-white hover:text-blue-500
                        ${(paymentMethod.card && captcheEnabled ? "cursor-pointer":"cursor-not-allowed")} hover:bg-white transition ease-in duration-500 w-full `}
                      disabled={!paymentMethod.card}
                      onClick={orderRequestWithCard}
                    >Pay with Credit/Debit/ATM Card
                    </button>
                  </StripeCheckout>
                </div>
                </div>
                <div className="flex items-center  space-x-2.5 w-full mt-5">
                    <input type="radio" checked={paymentMethod.cod} className="w-4 h-4 cursor-pointer w-1/8"
                        onClick={activeCashPayment}/>
                      <button disabled={!paymentMethod.cod}
                        className={`${(paymentMethod.cod && captcheEnabled) ? "curspo-pointer":"cursor-not-allowed" }
                         py-2 border border-gray-500 rounded-md text-gray-500 hover:text-white w-full hover:bg-gray-500 transition duration-500 ease`}
                        onClick={orderRequestWithCash}
                      >
                      Cash With Delivery
                    </button>
                </div>
                <div className="mt-4">
                  <ReCAPTCHA
                    sitekey={`6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`}
                    onChange={handleCaptcha}
                  />
                </div>

                </div>

              </div>
            </div>
    )
}

export default Delivery
