import React from 'react'
import logowallbit from "../../assets/image/logo-wallbit.svg";

const Navbar = () => {
  return (
    <div className='flex flex-row bg-white justify-center items-center h-12 rounded-xl'>
        <a href="https://wallbit.io/" target="_blank" ><img className="w-30 px-6 " src={logowallbit} alt="logo wallbit"/></a>
    </div>
  )
}

export default Navbar