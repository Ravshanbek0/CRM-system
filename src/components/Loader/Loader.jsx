import React from 'react'

function Loader() {
  return (
    <div className='loader-modal-all w-full h-screen flex justify-center items-center fixed z-[99999]'>
        <img className='w-[250px] h-[250px]' src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" alt="" />
    </div>
  )
}

export default Loader