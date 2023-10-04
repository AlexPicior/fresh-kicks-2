import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';



const AddReview = ({productId}) => {
    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    const [stars, setStars] = useState([false, false, false, false, false]);
    const [comment, setComment] = useState("");
    const [locked, setLocked] = useState(false);
    
    const { user, userName, setTriggerRerender, triggerRerender } = useStateContext();
    
    const postAddReview = ()=>{
        let review = {name: userName, product_id: productId, comment: comment};
        let nrStars = 0;
        for (let i = 0; i < 5; i++)
        {
            if(stars[i]) nrStars++;
        }
        review.stars = nrStars;
        
        fetch('https://fresh-kicks.up.railway.app/api/review',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review)
        })
        .then(response => response.json())
        .then(json =>{
            if(json.succMessage) {
            }
        });

        setToggle(false);

        window.location.reload(false);
    }
    
    const onClickAddReview = ()=>{
        if(user.id)
        {
            setToggle(true);
        }
        else
        {
            
            router.push({
                pathname: '/sign_in',
            });
            
        }
    }
    
   
    const onHoverStars = (index)=> {
        let aux = [false, false, false, false, false];
        for(let i = 0; i <= index; i++)
        {
            aux[i] = true;
        }
        setStars(aux);
    }
    return (
        <div className='mb-8 mt-4'>
            {toggle ? 
            (<div>
                <div className='flex mb-3'>
                    {stars.map((star, index)=> star ? (<div key={index} onClick={() => locked ? setLocked(false): setLocked(true)} onMouseEnter={() => locked ? null : onHoverStars(index)} onMouseLeave={() => locked ? null : setStars([false, false, false, false, false])}><AiFillStar className='text-2xl'/></div>): (<div key={index} onClick={() => locked ? setLocked(false): setLocked(true)} onMouseEnter={() => locked ? null : onHoverStars(index)} onMouseLeave={() => locked ? null : setStars([false, false, false, false, false])}><AiOutlineStar className='text-2xl'/></div>))}
                </div>
                <textarea className='break-all border w-[80%] h-28 resize-none p-2' name="" id="" cols="30" rows="2" onChange={(e)=> setComment(e.target.value)} ></textarea>
                <button className='bg-white w-28 h-7 border rounded-sm hover:bg-zinc-700 hover:text-gray-500 transition-all duration-500' onClick={()=> postAddReview()} >Add</button>
            </div>) :
            (<div className='flex justify-center'>
                <button className='bg-white w-48 h-7 border rounded-sm hover:bg-zinc-700 hover:text-gray-500 transition-all duration-500' onClick={() => onClickAddReview()}>Add review</button>
            </div>)
            }
        </div>
    )
}

export default AddReview