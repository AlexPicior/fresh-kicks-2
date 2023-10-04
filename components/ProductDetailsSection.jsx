import React, {useState, useEffect} from 'react'
import {AiOutlineHeart, AiFillHeart, AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
import {Review, AddReview} from "../components"
import { useStateContext } from '../context/StateContext';


const ProductDetailsSection = ({ product }) => {
  const {onAdd, favsItems, onAddFavs, onRemoveFavs, triggerRerender} = useStateContext();
  const isInFavsItems = (product) =>{
    const check = favsItems.find((item) => item.id === product.id);
    if(check) return true;
    else return false;
  }

  const convert = (product) =>{
    let {name, price, age_type, gender, color, images, brand} = product;

    switch(age_type){
      case 0:
        age_type = "Adult";
        break;
      case 1:
        age_type = "Kid";
    }

    switch(gender){
      case 0:
        gender = "Men";
        break;
      case 1:
        gender = "Women";
        break;
      case 2:
        gender = "Unisex";
        break;
    }

    switch(color){
      case 0:
        color = "White";
        break;
      case 1:
        color = "Black";
        break;
      case 2:
        color = "Beige";
        break;
      case 3:
        color = "Red";
        break;
      case 4:
        color = "Green";
        break;
    }

    switch(brand){
      case 0:
        brand = "Nike";
        break;
      case 1:
        brand = "Addidas";
        break;
      case 2:
        brand = "New Balance";
        break;
      case 3:
        brand = "Puma";
        break;
      case 4:
        brand = "Converse";
        break;
      case 5:
        brand = "Vans";
        break;
    }

    return {name, price, age_type, gender, color, images, brand};
  }
  let {name, price, age_type, gender, color, images, brand} = convert(product);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [displayReviews, setDisplayReviews] = useState(false);
  const [image, setImage] = useState(images[0]);
  const [size, setSize] = useState(40);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setImage(images[0]);
  }, [product]);

  useEffect(() =>{
    fetch(`https://fresh-kicks.up.railway.app/api/reviews/${product.id}`)
    .then(response => response.json())
    .then(json =>{ 
      setReviews(json);
    });
  }, []);

  const displayDetailsTReviewsF = (display_Reviews) =>{
    if(display_Reviews == true)
    {
      setDisplayReviews(false);
    }
    setDisplayDetails(true);
  }

  const displayReviewsTDetailsF = (display_Details) =>{
    if(display_Details == true)
    {
      setDisplayDetails(false);
    }
    setDisplayReviews(true);
  }

  const showBlock = (display_Details, display_Reviews) => {
    if(display_Details || display_Reviews) return true;
    return false;
  }

  

  return (
    <div className='flex xs:flex-col lg:flex-row xs:h-[1200px] lg:h-[750px] w-full mt-16 xs:px-3 ss:px-10'>
        <div className='lg:pl-20'>
            <img className='xs:w-[350px] lg:w-[550px] xs:h-[80%] lg:h-[550px]' src={image} alt="" />
            <div className='flex mt-5 justify-evenly xs:w-[300px] lg:w-[400px]'>
                <img className='xs:w-12 lg:w-16' onMouseEnter={() => setImage(images[0])} src={images[0]} alt="" />
                <img className='xs:w-12 lg:w-16' onMouseEnter={() => setImage(images[1])} src={images[1]} alt="" />
                <img className='xs:w-12 lg:w-16' onMouseEnter={() => setImage(images[2])} src={images[2]} alt="" />
                <img className='xs:w-12 lg:w-16' onMouseEnter={() => setImage(images[3])} src={images[3]} alt="" />
                <img className='xs:w-12 lg:w-16' onMouseEnter={() => setImage(images[4])} src={images[4]} alt="" />
            </div>
        </div>
        <div className='lg:ml-16 xs:py-6 lg:p-6 flex flex-col lg:relative'>
          <span className='font-poppins font-medium text-3xl'>{name}</span>
          <span className='font-poppins font-bold text-red-600 text-xl my-10'>{price} RON</span>

          <label className='font-poppins font-medium text-base my-2' htmlFor="">Choose size:</label>
          <select className='w-10' name="" id="" onChange={(event) => setSize(event.target.value)}>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
          </select>

          <div className='my-10'>
            <button className='bg-black w-36 h-12 text-white font-bold rounded-full mr-6 hover:bg-zinc-700 transition-all duration-500' onClick={() => onAdd({...product, size: size})}>Add to cart</button>
            {isInFavsItems(product) ? <button className='' onClick={() => onRemoveFavs(product)}><AiFillHeart className='h-7 w-7 relative top-2'/></button> : <button className='' onClick={() => onAddFavs(product)}><AiOutlineHeart className='h-7 w-7 relative top-2'/></button>}
          </div>

          <div className={`${displayDetails ? "h-[150px]" : "h-[44.8px]"} border-b-[1.5px] xs:w-[280px] ss:w-[300px] lg:w-[500px] py-2 pl-2 pr-3 relative z-10 transition-all duration-700`}>
            <div className='flex justify-between'>
              <span className='font-sans text-zinc-800 text-lg'>Details</span>
              <button onClick={() => displayDetails ? setDisplayDetails(false) : displayDetailsTReviewsF(displayReviews)}>
                {displayDetails ? <AiOutlineUp className='relative top-1'/> : <AiOutlineDown className='relative top-1'/>}
              </button>
            </div>
          </div>
          <div className={`${displayDetails ? "visible" : "invisible"} grid grid-cols-2 grid-rows-4 mt-1 p-1 xs:pl-2 ss:pl-8 lg:pl-0 xs:w-[250px] ss:w-[300px] lg:w-[450px] absolute z-0 xs:top-[940px] sss:top-[995px] ss:top-[990px] lg:top-[395px] left-8 transition-all ${displayDetails ? "" : "delay-300"}`}>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 pl-1 xs:w-[200px] lg:w-[300px]'>AGE:</span>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 text-center w-[100px]'>{age_type}</span>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 pl-1'>GENDER:</span>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 text-center w-[100px]'>{gender}</span>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 pl-1'>BRAND:</span>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 text-center w-[100px]'>{brand}</span>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 pl-1'>COLOR:</span>
              <span className='font-mono border-b-[1px] border-b-white bg-zinc-50 text-center w-[100px]'>{color}</span>
          </div>

          <div className='bg-white relative lg:z-10 h-[12px] xs:w-[300px] lg:w-[500px]'></div>
          <div className={`${displayReviews ? "h-[175px]" : "h-[44.8px]"} border-b-[1.5px] xs:w-[280px] ss:w-[300px] lg:w-[500px] py-2 pl-2 pr-3 bg-white relative z-10 transition-all duration-700`}>
            <div className='flex justify-between'>
              <span className='font-sans text-zinc-800 text-lg'>Reviews</span>
              <button onClick={() => displayReviews ? setDisplayReviews(false) : displayReviewsTDetailsF(displayDetails)}>
                  {displayReviews ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
              </button>
            </div>

            <div className={`${displayReviews ? "visible" : "invisible"} xs:w-[300px] lg:w-[475px] ${displayReviews ? "h-[134px]" : "h-[0px]"} mt-1 p-1 relative z-20 overflow-y-auto transition-all duration-700 ${displayReviews ? "" : ""}`}>
              {reviews.length > 0 ? (
                <div>
                  {reviews.map((review, index) => <Review key={index} review={review} />)}
                </div>
              ):(
                <div className='flex justify-center content-center flex-wrap '>
                  <span className='text-sm text-slate-300'></span>
                </div>
              )}
              <AddReview productId = {product.id}/>
            </div>
          </div>
          
          <div className={`${showBlock(displayDetails, displayReviews) ? "h-[45px]" : "h-[175px]"} bg-white relative z-30 xs:w-[300px] lg:w-[500px] transition-all duration-700`}></div>
        </div>
        
    </div>
  )
}



export default ProductDetailsSection