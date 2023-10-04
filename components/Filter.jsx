import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const Filter = ({filter}) => {
  return (
    <div className='rounded-2xl px-2 h-5 bg-zinc-100 flex justify-center content-center flex-wrap mr-2 mb-10'>
        <span className='font-thin text-xs mr-[2px]'>{filter}</span>
        <button className='relative top-[1px]'><RxCross2 className='font-thin text-xs'/></button>
    </div>
  )
}

export default Filter