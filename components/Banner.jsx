import React from 'react'
import Link from 'next/link';

const Banner = () => {
  return (
    <div className='w-full h-full flex justify-center my-10'>
      <div className='w-11/12 h-96 bg-gradient-to-br from-gray-400 rounded-lg py-14 pl-10 pr-20 flex justify-between'>
        <div className='flex flex-col'>
          <span className='xs:text-5xl ss:text-7xl font-poppins text-white mb-3'>LAST CHANCE</span>
          <span className='xs:text-3xl ss:text-5xl font-poppins text-black font-extrabold mb-3'>BIG SALES</span>
          <span className='xs:text-xl ss:text-3xl font-poppins text-red-700 mb-3'>up to 70%</span>
          <Link href='/products?sort_by=Newest'><button className='bg-white rounded-full w-28 h-10'>Check now</button></Link>
        </div>
        <div>
          <img className='xs:w-0 lg:w-96 ' src="http://cdn.shopify.com/s/files/1/0255/9429/8467/products/Nike_Air_Force_1_07_Triple_White_5.png?v=1648639163" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Banner