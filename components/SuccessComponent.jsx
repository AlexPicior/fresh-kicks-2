import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';



const SuccessComponent = () => {
  const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();
  useEffect(()=>{
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  },[]);
  return (
    <div className='w-full h-[75vh] flex justify-center content-center flex-wrap'>
        <div className='h-[55%] xs:w-[90%] lg:w-[50%] bg-zinc-300 rounded-lg flex justify-center content-center flex-wrap'>
          <div>
            <div className='w-full flex justify-center mb-2'><BsBagCheckFill className='w-8 h-8 text-green-700' /></div>
            <div className='mb-4'><span className='font-poppins xs:text-xl lg:text-3xl font-bold text-slate-700'>Thank you for your order!</span></div>
            <div className='w-full flex justify-center'>
              <Link href='/'><button className='bg-black w-48 h-10 text-white font-bold rounded-full hover:bg-zinc-700 transition-all duration-500' type='submit' >Back to shopping</button></Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SuccessComponent