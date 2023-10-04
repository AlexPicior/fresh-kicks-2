import React , {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { ColorRing } from 'react-loader-spinner';



const EditProfileComponent = () => {
    const router = useRouter();
    const [info, setInfo] = useState({});
    const [calledPush, setCalledPush] = useState(false);
    const [isBusy, setBusy] = useState(false);


    useEffect(()=>{
        if (calledPush) {
            return; 
          }
        fetch(`https://fresh-kicks.up.railway.app/api/isNotAuth`)
        .then(response => {
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

    const sendInfo = () =>{
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
    };
    return (
        <div>
            {isBusy ? (<div>
            <div className=' h-24 flex content-center flex-wrap xs:ml-8 ss:ml-10 lg:ml-20 xs:mt-2 lg:mt-7 w-[80%] border-b'>
                <span className='text-3xl font-thin '>Edit profile</span>
            </div>
            <div className='xs:mt-7 lg:mt-10 xs:ml-10 ss:ml-12 lg:ml-32 xs:w-[75%] lg:w-[40%]'>

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
            
            <div className='xs:ml-24 sss:ml-32 mb-32'>
                <button className='bg-black mt-3 mb-2 w-28 h-10 text-white font-bold rounded-full mr-6 hover:bg-zinc-700 transition-all duration-500' type='submit' onClick={()=> sendInfo()}>Save</button>
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

export default EditProfileComponent