import React from 'react'
import ReactLoading from "react-loading";
import {useSelector} from "react-redux"
const Loading = () => {

  const loadingAuth=useSelector(state=>state.authReducer.loading)
    return (
      <>
      {
        loadingAuth && (
          <div className="w-[100vw] h-[100vh] p-0 m-0 z-[500] bg-[rgba(0,0,0,0.6)] fixed top-0 flex justify-center items-center">
            <ReactLoading type={"bars"} color="#d1411e"  height={167} width={175} />
          </div>

        )
      }
      </>
    )
}

export default Loading
