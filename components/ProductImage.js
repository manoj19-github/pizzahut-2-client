import React from 'react'
import Image from "next/image"
const ProductImage = ({image}) => {
    return (
      <div className="md:flex-1 w-full mt-8">
        <div className="lg:h-3/4 relative h-[70vh]  m-[3vh] ">
          <Image
            alt="cartImg"
            src={image}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    )
}

export default React.memo(ProductImage)
