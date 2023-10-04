import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';

const FavsItem = ({item}) => {
  const {name, images} = item;
  const {onRemoveFavs} = useStateContext();
  return (
    <div className='flex h-28 xs:w-[314px] lg:w-[390px] mb-5'>
      <img className='xs:w-24 lg:w-28 xs:h-24 lg:h-28' src={images[0]} alt="" />
      <div className='flex xs:flex-col lg:flex-row flex-wrap content-center py-2 px-5 '>
        <span className='font-poppins line-clamp-2 font-medium '>{name}</span>
        <button className='relative top-1 h-7 w-7' onClick={() => onRemoveFavs(item)}><AiFillHeart className='h-7 w-7 text-rose-600' /></button>
        
      </div>
    </div>
  )
}

export default FavsItem