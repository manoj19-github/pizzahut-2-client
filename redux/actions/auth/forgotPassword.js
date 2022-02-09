import axios from "axios"
import {authTypes} from "../../types"
import Swal from 'sweetalert2'
export const sendConfirmation=(userEmail)=>async dispatch=>{
  try{
    const {data}=await axios.post("/api/auth/forgot-password",{userEmail})
    console.log("confirm code",data)
    localStorage.setItem("pizzahut-confirmation-details",JSON.stringify({forgotEmail:data.userEmail}))
    dispatch({type:authTypes.GET_PASSWORD_RESET_CODE,payload:data.userEmail})
    Swal.fire({
      title: 'Confirmation mail was sent',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/pizza.png)',
      backdrop: `
      rgba(0,0,123,0.4)
        left top
        no-repeat
        `
      })
  }catch(err){
    console.log("error in sendConfirmation",err)

  }
}

export const createNewPassword=(newPassword,confirmCode)=>async(dispatch,getState)=>{
  try{
    const userEmail=getState().authReducer.forgotEmail
    const payload={newPassword,userEmail,confirmCode}
    const {data}=await axios.post("/api/auth/setNew-password",payload)
    if(data.status){
      localStorage.removeItem("pizzahut-confirmation-details")
      return 1
    }else{
      return -1
    }

  }catch(err){
    console.log(err)
  }
}
