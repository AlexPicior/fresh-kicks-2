import React from 'react'
import { FavsItem } from '../components'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';


const Favs = () => {
  const {showFavs, setShowFavs, favsItems, totalFavsQty} = useStateContext();
  return (
    <div className = {`${showFavs ? 'flex' : 'hidden'} flex-row absolute top-0 z-[60] w-full`}>
      <div className='xs:w-2/12 lg:w-8/12 h-[100vh] bg-black opacity-50' onClick={() => setShowFavs(false)}></div>
      <div className='top-0 z-[60] h-[100vh] xs:w-10/12 lg:w-4/12 bg-white'>
        <div className='xs:px-5 lg:px-10 '>
          <div className='border-b p-4 flex'>
            <span className='text-xl font-poppins'>Your favorites</span>
            <button onClick={() => setShowFavs(false)}>
              <AiOutlineLeft className='relative xs:right-[150px] lg:right-[162px]' ></AiOutlineLeft>
            </button>
          </div>

          {favsItems.length < 1 && (
            <div className='flex justify-center content-center flex-wrap h-[500px]'>
              <span className='text-2xl text-slate-300'>No favorites</span>
            </div>
          )}
          {favsItems.length >= 1 && (
            <div>
              <div className='mt-10 overflow-y-auto xs:h-[550px] lg:h-[600px]'>
                {favsItems.map((item, index) => <FavsItem key={index} item={item}/>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Favs