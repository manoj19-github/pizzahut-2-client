import React,{useState,useEffect} from 'react'
import Image from "next/image"
import * as Yup from "yup"
import {Formik,Form as MyForm,Field,ErrorMessage} from "formik"
import {FcGoogle} from "react-icons/fc"
import {useRouter } from "next/router"
import {loginAction,adminLoginAction} from "../../redux/actions/auth"
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"


toast.configure()
const Auth = () => {

  const dispatch=useDispatch()
  const getLocalData=()=>{
    if(typeof window !=="undefined"){
      if(JSON.parse(localStorage.getItem("pizzahut-user-credential")))
        return JSON.parse(localStorage.getItem("pizzahut-user-credential"))
    }
  }



  const openGuest=()=>{
    setIsSignedUp(true)
    setGuestUser({
      email:process.env.NEXT_PUBLIC_GUEST_USER_EMAIL,
      password:process.env.NEXT_PUBLIC_GUEST_USER_PASSWORD,
      isRemember:false

    })
  }
  const openGuestAdmin=()=>{
    setIsSignedUp(true)
    setGuestUser({
      email:process.env.NEXT_PUBLIC_GUEST_ADMIN_PASSWORD,
      password:process.env.NEXT_PUBLIC_GUEST_ADMIN_PASSWORD,
      isRemember:false
    })
  }
  const authUserId=useSelector(state=>state.authReducer.userId)
  const authUserToken=useSelector(state=>state.authReducer.userToken)
  const loadingAuth=useSelector(state=>state.authReducer.loading)
  const isAdminData=useSelector(state=>state.authReducer.isAdmin)
  const router=useRouter()
  const {params}=router.query
  const [isSignedUp,setIsSignedUp]=useState(true)
  const [guestUser,setGuestUser]=useState({email:getLocalData()?.email,password:getLocalData()?.password})
  console.log("loadingAuth",loadingAuth)

  const submitHandler=(values,onSubmitProps)=>{
    console.log(values)
    if(values.isRemember){
      localStorage.setItem("pizzahut-user-credential",JSON.stringify(values))
    }
    dispatch(loginAction(values.email,values.password,router))

    if(authUserId && authUserToken && isAdminData ){
        router.push("/admin")
    }
    else if(authUserId && authUserToken && (!isAdminData) ){
        router.push("/")
    }
    onSubmitProps.resetForm()
  }



  const signUpThroughGoogle=()=>{
    window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login/google`,"_self")
  }
  const initFormData=()=>{
      if(isSignedUp) return {email:"",password:"",isRemember:false}
    return {email:"",username:"",password:"",cPassword:""}

  }
  const validationSchema=Yup.object({
    email:Yup.string().trim().matches(/^[A-Za-z1-9_%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/i,"email not valid")
              .required("email is required"),

    password:Yup.string().trim().min(4,"minimum 4 character required")
              .max(20,"must be less than 20 character")
              .required("password required"),

  })
  const validationSchema2=Yup.object({
    username:Yup.string().trim().required("username is required"),
    email:Yup.string().trim().matches(/^[A-Za-z1-9_%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/i,"email not valid")
              .required("email is required"),

    password:Yup.string().trim().min(4,"minimum 4 character required")
              .max(20,"must be less than 20 character")
              .required("password required"),
    cPassword:Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

    return (
      <div className="m-2 p-2">
        <div className="flex items-center justify-center  mb-12  ">
          <Image src="/img/pizzalogo.png" width="100px" height="100px" />
          <p className="ml-4 text-2xl font-weight text-gray-700">PizzaHut</p>
          <span className="ml-2 text-gray-500 text-sm">{params?.length==2 &&"  (Admin)"}</span>
        </div>

        <div className="sm:m-2 md:m-4 w-[90%] flex justify-between items-center sm:flex-col lg:flex-row overflow-x-hidden ">
            <div className="hidden sm:flex sm:flex-col flex-1 mx-3  ">
              <div className="w-full">
                <img src="/img/pizza.jpg" alt="pizza" className="w-full h-full object-cover rounded-md"/>
              </div>
            </div>

            <div className="flex-1 mx-2 flex justify-center flex-col mt-5 lg:mt-0">
              {
                  params?.length==1 &&(
                  <button className="btnGoogle w-full md:w-auto " onClick={signUpThroughGoogle}>Continue with Google <FcGoogle size={28}/></button>
                )
              }

            <Formik
              initialValues={guestUser||initFormData}
              validationSchema={isSignedUp?validationSchema:validationSchema2}
              onSubmit={submitHandler}
              enableReinitialize
            >{
              formik=>{


              return (

                <MyForm autoComplete="false">
                {
                  !isSignedUp && (
                    <div className="formDiv">
                      <label>Enter Your Username</label>
                    <Field name="username" type="text" className="field" />
                      <ErrorMessage name="username">
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                    </div>

                  )
                }


                  <div className="formDiv">
                    <label>Enter Your email</label>
                    <Field name="email" type="text" className="field"/>
                    <ErrorMessage name="email ">
                      {
                        errors=>{
                          return <span style={{color:"red"}}>{errors}</span>
                        }
                      }
                    </ErrorMessage>
                  </div>

                  <div className="formDiv">
                    <label>Enter Your Password</label>
                    <Field name="password" type="password" className="field"
                    />
                    <ErrorMessage name="password">
                      {
                        errors=>{
                          return <span style={{color:"red"}}>{errors}</span>
                        }
                      }
                    </ErrorMessage>
                  </div>
                  {
                    !isSignedUp &&(
                      <div className="formDiv">
                        <label>Confirm Password</label>
                        <Field name="cPassword" type="password" className="field"/>
                        <ErrorMessage name="cPassword">
                          {
                            errors=>{
                              return <span style={{color:"red"}}>{errors}</span>
                            }
                          }
                        </ErrorMessage>
                      </div>

                    )
                  }
                  {
                    isSignedUp &&(
                      <div className="flex items-center">
                      <div className="my-3 flex items-center ml-3 flex-1">
                        <Field type="checkbox" className="w-4 h-4  cursor-pointer"  name="isRemember">
                          {
                            ({field})=>(
                              <input type="checkbox"  {...field} checked={field.value===true} value={true}/>
                            )
                          }
                        </Field>
                        <label htmlFor="isRemember" className="ml-6">Remember Me</label>
                      </div>
                      <div className="flex-1 flex justify-end text-gray-500 cursor-pointer hover:underline">
                        <Link href={"/forgot"} passHref>Forgot Password ?</Link>
                      </div>
                    </div>



                    )
                }

                  <div className="flex justify-end items-center my-3">

                    <Field type="submit"  id="submit" name="submit" value="submit" className="mr-4 text-gray-600 border border-gray-600 px-8 py-2 rounded-md cursor-pointer hover:bg-[#d1411e] hover:text-white transition-all duration-100 ease"/>

                  </div>
                  <div className="flex justify-between  items-center my-3">
                    {
                      params?.length==1 &&(
                        <button type="button" className="guestBtn" onClick={openGuest}>
                        get guest User credential
                        </button>
                      )
                    }{
                      params?.length==2 &&(
                        <button type="button" className="guestBtn" onClick={openGuestAdmin}>
                          get guest Admin credential
                        </button>
                      )

                    }
                  </div>


                </MyForm>
              )}
            }
            </Formik>

            {
              isSignedUp ?(
                <p className="text-[#333] my-2 group">Are you not signed up
                <span
                  className="text-[#d1411e] cursor-pointer ml-2"
                  onClick={()=>setIsSignedUp(false)}
                  >sign up</span></p>

              ):(
                <p className="text-gray-600 cursor-pointer">Are you Already signd up
                <span
                    className="text-[#d1411e] cursor-pointer ml-2"
                  onClick={()=>setIsSignedUp(true)}
                >sign in</span></p>

              )
            }
            </div>
        </div>

      </div>
    )
}

export default Auth
Auth.getLayout=function PageLayout(page){
  return(
    <>
    {page}
    </>
  )
}
