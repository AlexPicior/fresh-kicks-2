import React, {useState, useEffect} from 'react'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'


const Review = ({review}) => {
  const [stars, setStars] = useState([false, false, false, false, false]);
  useEffect(()=>{
    let aux = [false, false, false, false, false];
    for(let i = 0; i < review.stars; i++)
    {
      aux[i] = true;
    }
    setStars(aux);
  },[])
  return (
    <div className='mb-2 p-3'>
      <div className='flex'>
        <span className='font-poppins'>{review.name}</span>
        <div className='relative top-1 ml-2 flex'>
          {stars.map((star, index)=> star ? (<div key={index} ><AiFillStar /></div>): (<div key={index} ><AiOutlineStar /></div>))}
        </div>
        
      </div>
      {review.comment != "" && (<div className='p-2 rounded-lg bg-zinc-50 mt-2 break-all font-poppins'>{review.comment}</div>)}
      
    </div>
  )
}

export default Review