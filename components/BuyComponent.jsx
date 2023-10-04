import React , {useState, useEffect} from 'react'
import { useStateContext } from '../context/StateContext';
import { CartItem } from '.'
import { AiFillCreditCard } from 'react-icons/ai'
import { BsCash } from 'react-icons/bs'
import { useRouter } from 'next/router';
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';






const BuyComponent = () => {
    const router = useRouter();
    const [info, setInfo] = useState({});
    const [calledPush, setCalledPush] = useState(false);
    const [isBusy, setBusy] = useState(false);
    const {cartItems, totalQuantities, totalPrice, userName} = useStateContext();
    const [cardPay, setCardPay] = useState(true);
    const [auth, setAuth] = useState(false);
    const [errMsg, setErrMsg] = useState("");


    useEffect(()=>{
        if (calledPush) {
            return; 
          }
        
        if(userName == "")
        {
            setAuth(false);
            setBusy(true);
        }
        else
        {
            fetch('https://fresh-kicks.up.railway.app/api/user/profile')
            .then(response => response.json())
            .then(json =>{
                if(!json.errMessage) {
                    setInfo(json);
                }
            });
            setAuth(true);
            setBusy(true);

        }
            
        
        setCalledPush(true);
        
    }, [])

    

    const sendInfo = () =>{
        if(auth)
        {
            if(info.tel_nr == null) info.tel_nr = "null";
            if(info.country == null) info.country = "null";
            if(info.city == null) info.city = "null";
            if(info.address == null) info.address = "null";
            if(info.zip_code == null) info.zip_code = "null";

            fetch('https://fresh-kicks.up.railway.app/api/user/profile/edit',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info)
            })
            .then(response => response.json())
            .then(json =>{
                if(json.succMessage) {
                    router.push({
                        pathname: '/profile',
                    });
                }
            });
        }
        else{
            router.push({
                pathname: '/sign_in',
            });
        }
    };

    const verifyPurchaseInfo = async () =>{
        if(cartItems.length < 1) setErrMsg("Cart is empty.");
        else if(!info.country || info.country.trim().length === 0) setErrMsg("Must fill country field.");
        else if(!info.city || info.city.trim().length === 0) setErrMsg("Must fill city field.");
        else if(!info.tel_nr || info.tel_nr.trim().length === 0) setErrMsg("Must fill tel. nr. field.");
        else if(!info.zip_code || info.zip_code.trim().length === 0) setErrMsg("Must fill zip code field.");
        else if(!info.address || info.address.trim().length === 0) setErrMsg("Must fill address field.");
        else {
            setErrMsg("");
            if(cardPay) await handleCheckout();
            else 
            {
                router.push({
                    pathname: '/success',
                });
            }
        }
    }

    const handleCheckout = async () => {
        const stripe = await getStripe();
    
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItems),
        });
    
        if(response.statusCode === 500) return;
        
        const data = await response.json();
    
        toast.loading('Redirecting...');
        if(!data) console.log("nu-l asteapta");
        console.log(data);
        if(!data) console.log("nu-l asteapta");
    
        stripe.redirectToCheckout({ sessionId: data.id });
      }
  return (
    <div>
        {isBusy ? (<div>
    <div>
        <div className=' h-16 flex content-center flex-wrap xs:ml-8 ss:ml-10 lg:ml-20 mt-7 w-[80%] border-b'>
                <span className='text-2xl font-thin '>Cart items</span>
        </div>
        <div className='xs:mt-7 lg:mt-10 xs:ml-12 lg:ml-32 w-[40%]'>
            {cartItems.length < 1 && (
                <div className='flex  content-center flex-wrap h-[100px]'>
                <span className='text-2xl text-slate-300'>Your cart is empty</span>
                </div>
            )}
            {cartItems.length >= 1 && (
                <div className='xs:w-[250px] lg:w-full'>
                <div className='xs:mt-7 lg:mt-10 overflow-y-auto h-fit'>
                    {cartItems.map((item, index) => <CartItem key={index} item={item}/>)}
                </div>
                <div className='flex mt-10 mb-3'>
                    <span className='font-poppins font-bold text-lg'>Total:</span>
                    <span className='font-poppins text-lg ml-2'>{totalPrice.toFixed(2)} RON</span>
                </div>
                
                
                </div>
          )}
        </div>

        <div className=' h-16 flex content-center flex-wrap xs:ml-8 ss:ml-10 lg:ml-20 mt-7 w-[80%] border-b'>
                <span className='text-2xl font-thin '>Paying method</span>
        </div>
        <div className='mt-6 xs:ml-12 lg:ml-32 w-[40%]'>
            <div className='flex mb-3'>
                <input type="radio" name="" id="" checked={ cardPay ? true : false} onChange={() => setCardPay(true)} />
                <label className='font-poppins ml-2 mr-1' htmlFor="">Card </label>
                <AiFillCreditCard className='relative top-1' />
            </div>
            <div className='flex'>
                <input type="radio" name="" id="" checked={ cardPay ? false : true} onChange={() => setCardPay(false)} />
                <label className='font-poppins ml-2 mr-1' htmlFor="">Cash</label>
                <BsCash className='relative top-1' />
            </div>
            
        </div>

        <div className=' h-16 flex content-center flex-wrap xs:ml-8 ss:ml-10 lg:ml-20 mt-7 w-[80%] border-b'>
                <span className='text-2xl font-thin '>Delivery Info</span>
        </div>
        <div className='xs:mt-7 lg:mt-10 xs:ml-12 lg:ml-32 xs:w-[70%] lg:w-[40%]'>

            <div className='grid grid-cols-2 gap-y-2 '>
                <label className='font-poppins mb-2 text-sm' htmlFor="">COUNTRY:</label>
                <label className='font-poppins mb-2 text-sm' htmlFor="">CITY:</label>
                <input  className='border w-[90%] h-6 mb-6 ml-2 pl-3 text-sm' type="text" value={info.country ? info.country : ""} onChange={(e) => setInfo((info) => {return {...info, country: e.target.value}})} />
                <input  className='border w-[90%] h-6 mb-6 ml-2 pl-3 text-sm' type="text" value={info.city ? info.city : ""} onChange={(e) => setInfo((info) => {return {...info, city: e.target.value}})} />
                
            </div>
            <div className='grid grid-cols-2 gap-y-2 '>
                <label className='font-poppins mb-2 text-sm' htmlFor="">TEL.NR.:</label>
                <label className='font-poppins mb-2 text-sm' htmlFor="">ZIP CODE:</label>
                <input  className='border w-[90%] h-6 mb-6 ml-2 pl-3 text-sm' type="text" value={info.tel_nr ? info.tel_nr : ""} onChange={(e) => setInfo((info) => {return {...info, tel_nr: e.target.value}})} />
                <input  className='border w-[40%] h-6 mb-6 ml-2 pl-3 text-sm' type="text" value={info.zip_code ? info.zip_code : ""} onChange={(e) => setInfo((info) => {return {...info, zip_code: e.target.value}})} />
            </div>
            <div className='flex flex-col'>
                <label className='font-poppins mb-2 text-sm' htmlFor="">ADDRESS:</label>
                <input  className='border w-[95%] h-6 mb-6 ml-2 pl-3 text-sm' type="text" value={info.address ? info.address : ""} onChange={(e) => setInfo((info) => {return {...info, address: e.target.value}})} />
            </div>
            
        </div>
        
        <div className='xs:ml-12 lg:ml-32 mb-10'>
            <button className='bg-black mt-3 mb-2 w-28 h-10 text-white font-bold rounded-full mr-6 hover:bg-zinc-700 transition-all duration-500' type='submit' onClick={()=> sendInfo()}>Save</button>
        </div>

        <div className='flex justify-center mb-3'>
            <button className='bg-black mt-3 mb-2 xs:w-[70%] lg:w-[30%] h-10 text-white font-bold rounded-full lg:mr-6 hover:bg-zinc-700 transition-all duration-500' type='submit' onClick={verifyPurchaseInfo} >Make purchase</button>
            
        </div>
        <div className='h-[16px] flex justify-center mb-32 '><span className='text-xs text-red-600 '>{errMsg}</span></div>
    </div>
    </div>) : (
            <div className='h-[80vh] w-full flex justify-center content-center flex-wrap'>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
            </div>
            )}
    </div>
  )
}

export default BuyComponent