import React from 'react'

const Image = ({src}) => {
  return (
    <div className='hidden md:flex md:w-1/2'>
        <img src={src} alt="" />
    </div>  
    )
}

export default Image