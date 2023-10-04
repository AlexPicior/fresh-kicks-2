import React from 'react'
import { CartItem } from '.'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';
import Link from 'next/link';



const Cart = () => {
  const {showCart, setShowCart, cartItems, totalQuantities, totalPrice} = useStateContext();
  return (
    <div className = {`${showCart ? 'flex' : 'hidden'} flex-row absolute top-0 z-[60] w-full`}>
      <div className='xs:w-2/12 lg:w-8/12 h-[100vh] bg-black opacity-50' onClick={() => setShowCart(false)}></div>
      <div className='top-0 z-[60] h-[100vh] xs:w-10/12 lg:w-4/12 bg-white'>
        <div className='xs:px-5 lg:px-10'>
          <div className='border-b py-4 pr-4 flex justify-between'>
            <div className='flex'>
              <button className='relative xs:right-[15px] lg:right-[25px]' onClick={() => setShowCart(false)}>
                <AiOutlineLeft></AiOutlineLeft>
              </button>
              <span className='text-xl font-poppins'>Your cart</span>
            </div>
            <span className='relative xs:left-0  font-poppins'>({totalQuantities} items)</span>
          </div>

          {cartItems.length < 1 && (
            <div className='flex justify-center content-center flex-wrap xs:h-[500px] xxl:h-[70vh]'>
              <span className='text-2xl text-slate-300'>Your cart is empty</span>
            </div>
          )}
          {cartItems.length >= 1 && (
            <div>
              <div className='mt-10 overflow-y-auto xs:h-[70vh] lg:h-[65vh] xxl:h-[70vh]'>
                {cartItems.map((item, index) => <CartItem key={index} item={item}/>)}
              </div>
              <div className='flex xs:mt-0 lg:mt-10 mb-3'>
                <span className='font-poppins font-bold text-lg'>Total:</span>
                <span className='font-poppins text-lg ml-2'>{totalPrice.toFixed(2)} RON</span>
              </div>
              <Link href='/buy'>
                <button className='rounded-full bg-black text-white p-2 font-poppins font-semibold xs:w-[80%] lg:w-96 h-10' onClick={() => setShowCart(false)}>Buy</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart