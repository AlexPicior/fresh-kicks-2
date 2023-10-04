import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { useStateContext } from '../context/StateContext';


const CartItem = ({item}) => {
  const {name, price, images, quantity, size, id} = item;
  const {onRemove, toggleCartItemQuanitity} = useStateContext();
  return (
    <div className='flex h-28 xs:w-[314px] lg:w-[390px] mb-5'>
      <img className='xs:w-24 lg:w-28 xs:h-24 lg:h-28' src={images[0]} alt="" />
      <div className='flex flex-col lg:justify-between xs:py-0 lg:py-2 xs:px-3 lg:px-5'>
        <span className='font-poppins xs:line-clamp-2 lg:line-clamp-2 font-medium w-full h-1/2 xs:mb-1 lg:mb-0'>{name}(size: {size})</span>
        
        <div className='flex justify-between'>
          <div className='flex'>
            <div className='border xs:w-5 lg:w-7 xs:h-6 lg:h-7 hover:bg-zinc-300 transition-all duration-500' onClick={() => toggleCartItemQuanitity(id, size, 'dec')}><AiOutlineMinus className='relative xs:top-[4px] lg:top-[5.5px] xs:left-[2px] lg:left-[5.5px] xs:text-sm lg:text-base' /></div>
            <div className='border-y xs:w-6 lg:w-8 xs:h-6 lg:h-7 flex justify-center content-center'><span className='font-poppins relative xs:text-sm lg:text-base xs:top-[2px] lg:top-[1px]'>{quantity}</span></div>
            <div className='border xs:w-5 lg:w-7 xs:h-6 lg:h-7 hover:bg-zinc-300 transition-all duration-500' onClick={() => toggleCartItemQuanitity(id, size, 'inc')}><AiOutlinePlus className='relative xs:top-[4px] lg:top-[5.5px] xs:left-[2px] lg:left-[5.5px] xs:text-sm lg:text-base'/></div>
          </div>

          <button className='relative' onClick={() => onRemove(item)}><BsTrash /></button>
          
          <span className='relative lg:left-10 font-poppons text-red-600'>{price} RON</span>
        </div>
        
        
      </div>
    </div>
  )
}

export default CartItem