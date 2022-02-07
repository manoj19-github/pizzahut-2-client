import HeadTag from "../components/HeadTag"
import Featured from "../components/Featured"
import PizzaList from "../components/PizzaList"
import {useSelector,useDispatch} from "react-redux"
import {useEffect} from "react"
import {getAuthData} from "../redux/actions/auth"
import {clientProductTypes} from "../redux/types"
export default function Home({data,slides}) {
  console.log(data)

  const authUser=useSelector(state=>state.authReducer.authUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    const status=dispatch(getAuthData())
    if(!status){
        router.push("/auth/login")
    }
    dispatch({type:clientProductTypes.GET_PRODUCTS_SUCCESS,payload:data?.products})
  },[])

  return (
    <div>
      <HeadTag headLine="PizzaHut"/>
      <Featured slidesData={slides}/>
      <PizzaList/>
    </div>
  )
}

export async function getStaticProps(){
  try{
    const config={
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
          }
    const aproducts=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,config)
    const rawData=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/slides`,config)
    const products=await aproducts.json()
    const slidesData=await rawData.json()
    return{
      props:{
        data:products,
        slides:slidesData.slides
      },
      revalidate:100
    }

  }catch(err){
    console.log(`error occured`,err)

  }
}
