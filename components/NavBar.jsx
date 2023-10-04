import React, {useEffect, useState} from 'react'
import {AiOutlineShopping, AiOutlineSearch, AiOutlineHeart, AiOutlineUser, AiOutlineMenu, AiOutlineLeft, AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
import Link from 'next/link';
import Cart from './Cart';
import { Favs } from '.';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';
import {FaUser} from 'react-icons/fa'



const NavBar = () => {
  const router = useRouter();
  const {query} = router;
  const {setShowCart, totalQuantities, setShowFavs, totalFavsQty, user, setUser, userName, setUserName, showMenu, setShowMenu} = useStateContext();
  const [filters, setFilters] = useState({age_type:"Adult", gender:"Men"});
  const [displaySliders, setDisplaySliders] = useState([false, false, false]);


  useEffect(() =>{
    fetch('https://fresh-kicks.up.railway.app/api/user')
    .then(response => response.json())
    .then(json =>{ 
      if(!json.errMessage)
      {
        setUser(json);
      }
    });

    fetch('https://fresh-kicks.up.railway.app/api/user/profile')
    .then(response => response.json())
    .then(json =>{
        if(!json.errMessage) setUserName(json.name);
    });
  }, [router.pathname]);

  const handleSearch = (e) =>{
    if(e.key == "Enter")
    {
      query.sort_by = "Newest";
      query.search = e.target.value;
      e.target.value = "";
      setShowMenu(false);
      router.push({
        pathname: "/products",
        query: query,
    });
    }
  }

  return (
    <div className='sticky top-0 z-50'>
      <div className='relative z-50 xs:px-4 ss:px-8 py-4 border-b border-zinc-700 flex justify-between bg-white'>
        <Link href='/'>
          <div>
            <span className='text-poppins w-[100px] leading-6 flex text-3xl font-extrabold'>FRESH KICKS</span>
          </div>
        </Link>
        <div className='xs:hidden lg:flex '>
          <Link href='/products?sort_by=Newest&age_type=Adult&gender=Men'><button className='border-r p-5 bg-white hover:bg-zinc-300 transition-all duration-500' onMouseOver={() => {setFilters({age_type:"Adult", gender:"Men"}); onHover("subNav");}} onMouseOut={() => onMouseOut("subNav", 0)}>MEN</button></Link>
          <Link href='/products?sort_by=Newest&age_type=Adult&gender=Women'><button className='border-r p-5 bg-white hover:bg-zinc-300 transition-all duration-500' onMouseOver={() => {setFilters({age_type:"Adult", gender:"Women"}); onHover("subNav");}} onMouseOut={() => onMouseOut("subNav", 0)}>WOMEN</button></Link>
          <Link href='/products?sort_by=Newest&age_type=Kid'><button className='border-r p-5 bg-white hover:bg-zinc-300 transition-all duration-500' onMouseOver={() => {setFilters({age_type:"Kid", gender:"MenWomen"}); onHover("subNav");}} onMouseOut={() => onMouseOut("subNav", 0)}>KIDS</button></Link>
          <Link href='/products?sort_by=Newest'><button className='border-r p-5 bg-white hover:bg-zinc-300 transition-all duration-500'>SALES</button></Link>
          <Link href='/products?sort_by=Newest'><button className='p-5 bg-white hover:bg-zinc-300 transition-all duration-500'>NEW STUFF</button></Link>
        </div>

        <div className='flex content-center flex-wrap '>
          <div className='xs:hidden lg:flex'>
            <AiOutlineSearch className='relative left-7 top-1 h-6 w-6'/>
            <input className='h-8 border rounded-full pl-8' type="text" placeholder='Search' onKeyDown={(e) => handleSearch(e)}/>
          </div>
          
          <button className='relative xs:bottom-0 lg:bottom-[2px]' onClick={() => setShowFavs(true)}>
            <AiOutlineHeart className='h-7 w-7 ml-5' />
          </button>
          <div className='rounded-full relative right-[11px] bg-red-600 text-white w-[16px] h-[16px] text-[10px] text-center'>{totalFavsQty}</div>
          <button className='relative xs:bottom-0 lg:bottom-[2px]' onClick={() => setShowCart(true)}>
            <AiOutlineShopping className='h-7 w-7'/>
          </button>
          <div className='rounded-full relative right-[13px] bg-red-600 text-white w-[16px] h-[16px] text-[10px] text-center'>{totalQuantities}</div>
          <Link href='/profile'>
            <div className='flex relative '>
              {userName ? <FaUser className='relative top-[1px] h-6 w-6'/> : <AiOutlineUser className='h-7 w-7'/>}
              <div className='xs:hidden xl:block lg:w-[150px] h-fit ml-2'><span>{userName ? userName : ""}</span></div>
            </div>
            
          </Link>
          <button className='xs:block lg:hidden relative'  >
            <AiOutlineMenu className='h-7 w-7 ml-5' onClick={() => setShowMenu(true)} />
          </button>

          
        </div>
      </div>

      <div id='subNav' className='opacity-0 absolute z-40 w-full h-[300px] bg-white border-b border-zinc-700 hidden flex-col pl-20 py-7 transition-all delay-150' onMouseOver={() => onHover("subNav")} onMouseOut={() => onMouseOut("subNav", 1)}>
        <span className='text-xl mb-1 border-b border-zinc-700 w-fit'>Sneakers</span>
        <div className='flex flex-col h-[200px] justify-evenly'>
          <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Addidas`}><span>Addidas</span></Link>
          <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Nike`}><span>Nike</span></Link>
          <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=NewBalance`}><span>New Balance</span></Link>
          <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Puma`}><span>Puma</span></Link>
          <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Converse`}><span>Converse</span></Link>
          <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Vans`}><span>Vans</span></Link>
        </div>
        
      </div>
      
      <Cart/>

      <Favs/>

      <div className = {`${showMenu ? 'flex' : 'hidden'} flex-row absolute top-0 z-[60] w-full`}>
        <div className='xs:w-2/12 lg:w-8/12 h-[100vh] bg-black opacity-50' onClick={() => setShowMenu(false)}></div>
        <div className='top-0 z-[60] h-[100vh] xs:w-10/12 lg:w-4/12 bg-white'>
          <div className='xs:px-5 lg:px-10'>
            <div className='border-b py-4 pr-4 mb-4 flex justify-between'>
              <div className='flex'>
                <button className='relative xs:right-[15px] lg:right-[25px]' onClick={() => setShowMenu(false)}>
                  <AiOutlineLeft></AiOutlineLeft>
                </button>
                <span className='text-xl font-poppins'>Menu</span>
              </div>
              <div className='flex'>
                <AiOutlineSearch className='relative left-7 top-[2px] h-6 w-6'/>
                <input className='h-7 w-36 border rounded-full pl-8' type="text" placeholder='Search' onKeyDown={(e) => handleSearch(e)}/>
              </div>
            </div>


            <div className={`${displaySliders[0] ? "h-[240px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <Link href='/products?sort_by=Newest&age_type=Adult&gender=Men'><span className='font-sans text-zinc-800 '>MEN</span></Link>
                  <button onClick={() => displaySliders[0] ? setDisplaySliders([false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 0 ? true : false))}>
                      {displaySliders[0] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              

                <div className={`${displaySliders[0] ? "visible" : "invisible"} w-[200px]  ${displaySliders[0] ? "h-[210px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                  <div className='flex flex-col h-[200px] justify-evenly'>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Addidas`}><span>Addidas</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Nike`}><span>Nike</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=NewBalance`}><span>New Balance</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Puma`}><span>Puma</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Converse`}><span>Converse</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Vans`}><span>Vans</span></Link>
                  </div>
                </div>
            </div>

            <div className={`${displaySliders[1] ? "h-[240px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <Link href='/products?sort_by=Newest&age_type=Adult&gender=Women'><span className='font-sans text-zinc-800 '>WOMEN</span></Link>
                  <button onClick={() => displaySliders[1] ? setDisplaySliders([false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 1 ? true : false))}>
                      {displaySliders[1] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              
                <div className={`${displaySliders[1] ? "visible" : "invisible"} w-[200px] ${displaySliders[1] ? "h-[210px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                  <div className='flex flex-col h-[200px] justify-evenly'>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Addidas`}><span>Addidas</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Nike`}><span>Nike</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=NewBalance`}><span>New Balance</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Puma`}><span>Puma</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Converse`}><span>Converse</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Vans`}><span>Vans</span></Link>
                  </div>
                </div>
            </div>

            <div className={`${displaySliders[2] ? "h-[240px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <Link href='/products?sort_by=Newest&age_type=Kid'><span className='font-sans text-zinc-800 '>KIDS</span></Link>
                  <button onClick={() => displaySliders[2] ? setDisplaySliders([false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 2 ? true : false))}>
                      {displaySliders[2] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              

                <div className={`${displaySliders[2] ? "visible" : "invisible"} w-[200px] ${displaySliders[2] ? "h-[210px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                  <div className='flex flex-col h-[200px] justify-evenly'>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Addidas`}><span>Addidas</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Nike`}><span>Nike</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=NewBalance`}><span>New Balance</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Puma`}><span>Puma</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Converse`}><span>Converse</span></Link>
                    <Link href={`/products?sort_by=Newest&age_type=${filters.age_type}&gender=${filters.gender}&brand=Vans`}><span>Vans</span></Link>
                  </div>
                </div>
            </div>

            <Link href='/products?sort_by=Newest'>
              <div className='h-[35px] border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60]'>
                <div className='flex justify-between'>
                  <span className='font-sans text-zinc-800 '>SALES</span>
                </div>
              </div>
            </Link>

            <Link href='/products?sort_by=Newest'>
              <div className='h-[35px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60]'>
                <div className='flex justify-between'>
                  <span className='font-sans text-zinc-800 '>NEW STUFF</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}


function onHover(id)
{
  let x = document.getElementById(id);
  x.style.display = 'flex';
  x.style.opacity = '100';
}

function onMouseOut(id, e)
{
  let x = document.getElementById(id);
  x.style.opacity = '0';
  if(e == 1) x.style.display = 'none';
}
export default NavBar