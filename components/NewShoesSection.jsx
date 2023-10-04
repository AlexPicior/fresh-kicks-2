import React, {useState, useEffect} from 'react'
import Product from './Product'
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'

const NewShoesSection = ({products}) => {
  const [prods, setProds] = useState(newProducts(products));
  const [activeProds, setActiveProds] = useState(window.screen.width > 769 ? [2,3,4] : [3]);
  useEffect(()=>{
    function handleResize() {
      window.screen.width > 769 ? setActiveProds([2,3,4]) : setActiveProds([3]);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  });
  return (
    <div className='mb-20'>
      <div className='flex justify-center lg:mb-10'>
        <span className='font-poppins text-6xl font-bold'>NEW</span>
      </div>
      
      

      <div className='relative flex justify-between px-10 xs:mt-20 lg:mt-32 h-[300px]'>
        <div className='min-h-full w-fit content-center flex-wrap flex'>
          <button className='relative xs:bottom-16 lg:bottom-0 bg-black text-white w-11 h-11 rounded-full hover:bg-zinc-700 transition-all duration-500' onClick={() => setActiveProds(activeProds => activeProds[0] != 0 ? activeProds.map(activeProd => activeProd - 1) : activeProds)}><BiLeftArrow className='relative left-[13px] '/></button>
        </div>
        {activeProds?.map((prodIndex) => prods[prodIndex] && <div className='xs:w-[45%] lg:w-fit' key = {prods[prodIndex].id}><Product  product = {prods[prodIndex]}/></div>)}
        <div className='min-h-full w-fit content-center flex-wrap flex'>
          <button className='relative xs:bottom-[63px] lg:bottom-0 bg-black text-white w-11 h-11 rounded-full hover:bg-zinc-700 transition-all duration-500' onClick={() => setActiveProds(activeProds => activeProds[window.screen.width > 769 ? 2 : 0] != 6 ? activeProds.map(activeProd => activeProd + 1) : activeProds)}><BiRightArrow className='relative left-[14px] '/></button>
        </div>
      </div>
      

      <div className='flex justify-center w-full xs:mt-10 lg:mt-32 mb-24 overflow-y-auto'>
        <div className='flex '>
          <img className='mr-10' src="https://www.buzzsneakers.ro/files/images/brendovi/nike(1).png.webp" alt="" />
          <img className='mr-10' src="https://www.buzzsneakers.ro/files/images/brendovi/adi-ori.png.webp" alt="" />
          <img className='mr-10' src="https://www.buzzsneakers.ro/files/images/brendovi/nb.png.webp" alt="" />
          <img className='mr-10' src="https://www.buzzsneakers.ro/files/images/2017/3/28/puma-logo-crni.png.webp" alt="" />
          <img className='mr-10' src="https://www.buzzsneakers.ro/files/images/brendovi/converse-novi-crni.png.webp" alt="" />
          <img className='mr-10' src="https://www.buzzsneakers.ro/files/files/vasn_logo_black_web_100x60px.png.webp" alt="" />
        </div>
      </div>
    </div>
  )
}

const newProducts = (products) =>
{
  const list = products.slice(-7);

  return list;
}

export default NewShoesSection