import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ColorRing } from 'react-loader-spinner';

const ProfileComponent = () => {
    const router = useRouter();
    const [info, setInfo] = useState({});
    const [calledPush, setCalledPush] = useState(false);
    const [isBusy, setBusy] = useState(false);
    useEffect(()=>{
        if (calledPush) {
            return; 
          }
        const verifyAuth = async ()=>{
            fetch(`https://fresh-kicks.up.railway.app/api/isNotAuth`)
            .then(response => {
                console.log(response)
                if(response.redirected)
                {
                    router.push({
                        pathname: response.url,
                    });
                }
                else
                {
                    setBusy(true);
                }
            })
            setCalledPush(true);
        }
        
        verifyAuth();
        
        
    }, [])

    useEffect(()=>{
        if(isBusy){
            
            fetch('https://fresh-kicks.up.railway.app/api/user/profile')
            .then(response => response.json())
            .then(json =>{
                if(!json.errMessage) setInfo(json);
            });
            
        }
    },[isBusy])

    const logOut = ()=>{
        fetch('https://fresh-kicks.up.railway.app/api/logout', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response =>{
            window.location.reload(false);
        })
        
    }
  return (
    <div>
        {isBusy ? (<div>
        <div className=' h-24 flex content-center flex-wrap xs:ml-10 lg:ml-20 xs:mt-2 lg:mt-7 w-[80%] border-b'>
            <span className='text-3xl font-thin '>Your profile</span>
        </div>
        <div className='xs:mt-7 lg:mt-10 xs:ml-12 lg:ml-32'>
            <div className='mb-5' ><span className=' font-medium text-xl'>PERSONAL INFO</span></div>
        </div>
        <div className='grid grid-cols-2 gap-y-2 mt-5 mb-3 xs:ml-16 lg:ml-36 xs:w-[60%] lg:w-[30%]'>
            <span className=' font-medium text-sm'>NAME: </span>
            <span className=' text-sm'>{info.name}</span>
            <span className=' font-medium text-sm'>EMAIL: </span>
            <span className=' text-sm'>{info.email}</span>
        </div>
        <div className='mt-10 xs:ml-12 lg:ml-32'>
            <div className='mb-5' ><span className=' font-medium text-xl'>DELIVERY INFO</span></div>
        </div>
        <div className='grid grid-cols-2 gap-y-2 mt-5 mb-3 xs:ml-16 lg:ml-36 xs:w-[60%] lg:w-[30%]'>
            <span className=' font-medium text-sm'>TEL.NR.: </span>
            <span className=' text-sm'>{info.tel_nr ? info.tel_nr : "-"}</span>
            <span className=' font-medium text-sm'>COUNTRY: </span>
            <span className=' text-sm'>{info.country ? info.country : "-"}</span>
            <span className=' font-medium text-sm'>CITY: </span>
            <span className=' text-sm'>{info.city ? info.city : "-"}</span>
            <span className=' font-medium text-sm'>ADDRESS: </span>
            <span className=' text-sm'>{info.address ? info.address : "-"}</span>
            <span className=' font-medium text-sm'>ZIP CODE:</span>
            <span className=' text-sm'>{info.zip_code ? info.zip_code : "-"}</span>
        </div>
        <Link href="/edit_profile">
            <div className='xs:ml-16 lg:ml-36 mb-8'>
                <button className='bg-black mt-3 mb-2 w-28 h-10 text-white font-bold rounded-full mr-6 hover:bg-zinc-700 transition-all duration-500' type='submit' >Edit</button>
            </div>
        </Link>
        <div className='w-[80%] flex justify-end'>
            <div className='mb-32'>
                <button className='bg-black mt-3 mb-2 w-28 h-10 text-white font-bold rounded-full mr-6 hover:bg-zinc-700 transition-all duration-500' onClick={()=> logOut()} type='submit' >Log out</button>
            </div>
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

export default ProfileComponent