import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';


const Product = ({product}) => {
  const {onAdd, favsItems, onAddFavs, onRemoveFavs} = useStateContext();
  const isInFavsItems = (product) =>{
    const check = favsItems.find((item) => item.id === product.id);
    if(check) return true;
    else return false;
  }

  const {name, price, images, slug} = product;
  return (
    <div className='xs:w-full lg:w-[15vw] h-fit z-10 relative mr-0'>
      <Link href={`/product/${slug}`}>
        <img className='xs:w-full lg:w-[15vw] brightness-100 hover:brightness-50 transition-all duration-500' src={images && images[0]} alt="" />
      </Link>
      {isInFavsItems(product) ? <button className='z-20 relative bottom-6 xs:left-[78%] ss:left-[83%] lg:left-[88%]' onClick={() => onRemoveFavs(product)}><AiFillHeart className=' h-6 w-6 max-w-fit text-rose-600'/></button> : <button className='z-20 relative bottom-6 xs:left-[78%] ss:left-[83%] lg:left-[88%]' onClick={() => onAddFavs(product)}><AiOutlineHeart className='h-6 w-6 max-w-fit'/></button>}

        <div className='flex lg:px-6 relative bottom-3 flex-col'>
          <span className='font-poppins line-clamp-3 xs:text-xs sss:text-sm lg:text-base text-center font-medium'>{name}</span>
          <span className='font-poppins line-clamp-3 xs:text-xs sss:text-sm lg:text-base text-center font-bold'>{price} RON</span>
        </div>
    </div>
  )
}

export default Product