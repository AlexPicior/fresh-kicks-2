import React, {useState, useEffect} from 'react'
import Product from './Product'
import {CarouselProd} from '../components'
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'


const YouMayAlsoLikeSection = ({similarProducts}) => {
  const [activeProds, setActiveProds] = useState([2,3,4]);
  useEffect(()=>{
    function handleResize() {
      window.screen.width > 769 ? setActiveProds([2,3,4]) : setActiveProds([3]);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  });
  return (
    <div className='relative xs:z-0 lg:z-40'>
      <div className='flex justify-center mb-16'>
        <span className='font-poppins xs:text-2xl ss:text-3xl font-bold'>YOU MAY ALSO LIKE</span>
      </div>

      <div className='relative flex justify-between px-10 mt-32 xs:mb-20 lg:mb-36 -[300px]'>
        <div className='min-h-full w-fit content-center flex-wrap flex'>
          <button className='relative  bg-black text-white w-11 h-11 rounded-full hover:bg-zinc-700 transition-all duration-500' onClick={() => setActiveProds(activeProds => activeProds[0] != 0 ? activeProds.map(activeProd => activeProd - 1) : activeProds)}><BiLeftArrow className='relative left-[13px] '/></button>
        </div>
        {activeProds?.map((prodIndex) => similarProducts[prodIndex] && <div className='xs:w-[45%] lg:w-fit' key = {similarProducts[prodIndex].id}><Product  product = {similarProducts[prodIndex]}/></div>)}
        <div className='min-h-full w-fit content-center flex-wrap flex'>
          <button className='relative  bg-black text-white w-11 h-11 rounded-full hover:bg-zinc-700 transition-all duration-500' onClick={() => setActiveProds(activeProds => activeProds[window.screen.width > 769 ? 2 : 0] != 6 ? activeProds.map(activeProd => activeProd + 1) : activeProds)}><BiRightArrow className='relative left-[14px] '/></button>
        </div>
      </div>
    </div>
  )
}

export default YouMayAlsoLikeSection