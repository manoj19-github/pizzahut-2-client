import axios from "axios"
import {authTypes} from "../../types"
import Swal from "sweetalert2"
export const getAuthData=()=>async (dispatch,getState)=>{
  try{
    dispatch({type:authTypes.GET_CREDEN_REQ})
    const {data}=await axios.get("/api/auth/login/success",{
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:`bearer ${getState().authReducer.userToken || ""}`,

              },

    })
    console.log(data)
    if(data.status){

      dispatch({type:authTypes.GET_USER_CREDENTIAL,payload:
        {userEmail:data.userEmail,userId:data.userId,isAdmin:data.isAdmin}})
        sessionStorage.setItem("pizzahut-auth-email",JSON.stringify({userEmail:data.userEmail}))
        sessionStorage.setItem("pizzahut-auth-userId",JSON.stringify({userId:data.userId}))
        sessionStorage.setItem("pizzahut-auth-isAdmin",JSON.stringify({isAdmin:data.isAdmin}))

    }
  }catch(err){
    console.log(err)
    dispatch({type:authTypes.GET_CREDEN_FAIL,payload:err})
  }

}
export const loginAction=(email,password,Router)=>async (dispatch,getState)=>{
  try{
    dispatch({type:authTypes.GET_CREDEN_REQ})
    const {data}=await axios.post("/api/auth/login",{email,password},{
      headers:{
        "Content-Type": "application/json",
      }
    })
    console.log("auth data",data)
    if(data.status){
      dispatch({type:authTypes.GET_USER_TOKEN,payload:data.userToken})
      dispatch({type:authTypes.GET_USER_CREDENTIAL,payload:
        {userEmail:data.userEmail,userId:data.userId,isAdmin:data.isAdmin}})
      sessionStorage.
        setItem("pizzahut-user-token",
        JSON.stringify({userToken:data.userToken
      }))
      sessionStorage.setItem("pizzahut-auth-email",JSON.stringify({userEmail:data.userEmail}))
      sessionStorage.setItem("pizzahut-auth-userId",JSON.stringify({userId:data.userId}))
      sessionStorage.setItem("pizzahut-auth-isAdmin",JSON.stringify({isAdmin:data.isAdmin}))
      if(data.isAdmin){
        Router.push("/admin/")
      }else{
        Router.push("/")
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }catch(err){
    console.log(err)
    dispatch({type:authTypes.GET_CREDEN_FAIL,payload:err})

  }
}

export const logoutAction=()=>async (dispatch,getState)=>{
  try{
    dispatch({type:authTypes.LOGOUT_REQ})
    const {data}=await axios.get("/api/auth/logout",{
      headers:{
        "Content-Type": "application/json",
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,
      }
    })
    dispatch({type:authTypes.LOGOUT_SUCCESS})
    sessionStorage.removeItem("pizzahut-user-token")
    sessionStorage.removeItem("pizzahut-auth-email")
    sessionStorage.removeItem("pizzahut-auth-userId")
    sessionStorage.removeItem("pizzahut-auth-isAdmin")

  }catch(err){
    console.log("err occured in logout action",err)
  }
}
