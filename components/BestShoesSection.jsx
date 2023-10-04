import React from 'react'
import Product from './Product'

const BestShoesSection = () => {
  const bestProducts = [{id: 4, name:"ADIDAS Pantofi Sport NITEBALL", price:729.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/FZ5/FZ5741/images/thumbs_900/FZ5741_900_900px.jpg.webp"], slug:"adidas-pantofi-sport-niteball"},
  {id: 5, name:"ADIDAS Pantofi Sport ZX 22 BOO", price:729.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/HP2/HP2769/images/thumbs_900/HP2769_900_900px.jpg.webp"], slug:"adidas-pantofi-sport-zx-22-boo"},
  {id: 6, name:"NIKE Pantofi Sport NIKE DUNK LOW NH", price:629.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/DX2/DX2654-200/images/thumbs_900/DX2654-200_900_900px.jpg.webp"], slug:"nike-pantofi-sport-nike-dunk-low-nh"},
  {id: 7, name:"NIKE Pantofi Sport AIR FORCE 1 LV8", price:549.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/DM0/DM0983-100/images/thumbs_900/DM0983-100_900_900px.jpg.webp"], slug:"nike-pantofi-sport-air-force-1-lv8"}];
  return (
    <div className='flex xs:flex-col lg:flex-row max-w-full my-20'>
      <div className='flex justify-center content-center flex-wrap xs:w-full lg:w-1/2 xs:h-fit lg:h-[700px] xs:mb-20 lg:mb-0'>
        <img className='w-[75%] lg:h-[70%] xl:h-[80%] ' src='https://www.buzzsneakers.ro/files/images/2023/1/26/Buzz%20JD%20kicks.jpg.webp'></img>
      </div>
      <div id='div_2' className='grid grid-cols-2 xs:gap-x-5 lg:gap-x-20 xs:gap-y-20 xs:py-0 lg:py-4 xs:full lg:w-1/2 h-fit'>
        <div className='justify-self-center w-[75%]'><Product key = "bestProd0" product={bestProducts[0]}/></div>
        <div className='justify-self-center w-[75%]'><Product key = "bestProd1" product={bestProducts[1]}/></div>
        <div className='justify-self-center w-[75%]'><Product key = "bestProd2" product={bestProducts[2]}/></div>
        <div className='justify-self-center w-[75%]'><Product key = "bestProd3" product={bestProducts[3]}/></div>
      </div>
      
      
    </div>
  )
}

export default BestShoesSection