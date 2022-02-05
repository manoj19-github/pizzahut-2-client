import React,{useRef,useState,useEffect} from 'react'
import Image from "next/image"
import {useRouter} from "next/router"
import {sendConfirmation,createNewPassword} from "../../redux/actions/auth/forgotPassword"
import {useDispatch,useSelector} from "react-redux"
import swal from "sweetalert2"

const Forgot = () => {
  const confirmUserData=useSelector(state=>state.authReducer.confirmUserData)

  const dispatch=useDispatch()
  const inputRef=useRef()
  const Router=useRouter()
  const [userEmail,setUserEmail]=useState("")
  const [newPassword,setNewPassword]=useState({newPass:"",confirmPass:""})
  const {forgot=[]}=Router.query
  console.log("forgot",forgot)
  const setNewPasswordReq=()=>{
    if(!newPassword.newPass || !newPassword.confirmPass || newPassword.newPass != newPassword.confirmPass){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! please fill all the necessary field',
        footer:"confirm password must be same"
      })
      return
    }
    if(forgot.length==1){
      const status=dispatch(createNewPassword(newPassword,forgot[0]))
      if(status){
          Router.push("/auth/login")
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! try again',
        })
      }

    }


  }
  const handlePassChange=(e)=>{
    setNewPassword({
      ...newPassword,
      [e.target.name]:e.target.value
    })
  }
  const handleEmail=(e)=>{
    setUserEmail(e.target.value)

  }
  useEffect(()=>{
    inputRef.current.focus()
  },[])
  const sendConfirmationReq=()=>{
    if(userEmail==""){
      alert("please fill the email field")
      return
    }
    dispatch(sendConfirmation(userEmail))
    setUserEmail("")

  }
  if(forgot?.length==0){
    return (
      <div className="w-full bg-[url('/img/pizza.jpg')]  bg-no-repeat bg-cover bg-center min-h-[100vh]">
        <div className="flex items-center justify-center pt-4  ">
          <Image src="/img/pizzalogo.png" width="100px" height="100px" />
        </div>
        <div className="flex mt-8 items-center justify-center flex-col">
        <h5 className="text-center font-bold text-blue-500 md:text-[2rem] sm:text-lg">Send a Confirmation Link to Your Registered Email Address</h5>
        <div className="flex flex-col space-y-2.5 mt-12 w-[80%] md:w-2/4 lg:w-1/4" >
          <label>Enter your Registered Email</label>
          <input type="email"
            ref={inputRef}
            value={userEmail}
            onChange={handleEmail}
            className="input py-1 mb-2 rounded-md outline-none bg-transparent border-b border-gray-600"
            placeholder="Enter Email"
          />
        </div>

        <button
          onClick={sendConfirmationReq}
        className="btn mt-8 text-[14px] md:text-base font-bold hover:bg-gray-500 transition-all ease-in duration-200 hover:text-white">
          Send Confirmation Link
        </button>
        </div>
      </div>
    )

  }else{
    return(
      <div className="w-full bg-[url('/img/pizza.jpg')]  bg-no-repeat bg-cover bg-center min-h-[100vh] pb-12 md:pb-0">
        <div className="flex items-center justify-center pt-4  ">
          <Image src="/img/pizzalogo.png" width="100px" height="100px" />
        </div>
        <div className="flex mt-8 items-center justify-center flex-col">
        <h5 className="text-center font-bold text-blue-500 md:text-[2rem] sm:text-lg">Set Your new Password</h5>
        <div className="flex flex-col space-y-2.5 mt-12 w-[80%] md:w-2/4 lg:w-1/4" >
          <label>Create New Password</label>
          <input type="password"
            ref={inputRef}
            value={newPassword.newPass}
            name="newPass"
            onChange={handlePassChange}
            className="input py-1 mb-2 rounded-md outline-none bg-transparent border-b border-gray-600"

          />
        </div>
        <div className="flex flex-col space-y-2.5 mt-12 w-[80%] md:w-2/4 lg:w-1/4" >
          <label>Confirm New Password</label>
          <input type="password"
            name="confirmPass"
            value={newPassword.confirmPass}
            onChange={handlePassChange}
            className="input py-1 mb-2 rounded-md outline-none bg-transparent border-b border-gray-600"

          />
        </div>


        <button
          onClick={setNewPasswordReq}
        className="btn mt-8 text-[14px] md:text-base font-bold hover:bg-gray-500 transition-all ease-in duration-200 hover:text-white">
          set new password
        </button>
        </div>
      </div>

    )
  }

}

export default Forgot

Forgot.getLayout=function PageLayout(page){
  return(
    <>
    {page}
    </>
  )
}
