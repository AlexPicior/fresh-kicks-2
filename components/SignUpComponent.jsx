import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { ColorRing } from 'react-loader-spinner';


const SignUpComponent = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState(null);
    const [errMessage, setErrMessage] = useState("");

    const [calledPush, setCalledPush] = useState(false);
    const [isBusy, setBusy] = useState(false);
    useEffect(()=>{
        //document.getElementById('firstName').value = "";
        //document.getElementById('lastName').value = "";
        //document.getElementById('email').value = "";

        if (calledPush) {
            return; 
          }
        fetch(`https://fresh-kicks.up.railway.app/api/isAuth`)
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
    const sendCredentials = () =>{
        setErrMessage("");
        fetch('https://fresh-kicks.up.railway.app/api/createAccount',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(json =>{
            if(json.errMessage) setErrMessage(json.errMessage);
            if(json.succMessage) {
                router.push({
                    pathname: '/sign_in',
                });
            }
        });
    };
    return (
        <div className='flex justify-center mt-24 mb-36'>
            {isBusy ? (<div className='xs:w-[80%] lg:w-[40%]'>
            <div className='w-full '>
                <div className='flex flex-col justify-center'>
                    <div className='grid grid-cols-2 gap-y-2 mb-6'>
                        <label className='font-poppins xs:text-sm sss:text-base' htmlFor="">First name:</label>
                        <label className='font-poppins xs:text-sm sss:text-base' htmlFor="">Last name:</label>
                        <input id='firstName' className='border w-4/5 h-9 pl-3' type="text" onChange={(e) => setCredentials((credentials) => {return {...credentials, firstName: e.target.value}})} required />
                        <input id='lastName' className='border w-4/5 h-9 pl-3' type="text" onChange={(e) => setCredentials((credentials) => {return {...credentials, lastName: e.target.value}})} required />
                    </div>
                    
                    <label className='font-poppins xs:text-sm sss:text-base mb-2' htmlFor="">Email:</label>
                    <input id='email' className='border w-[90%] h-9 mb-6 pl-3' type="text" onChange={(e) => setCredentials((credentials) => {return {...credentials, email: e.target.value}})} required />

                    <div className='grid grid-cols-2 gap-y-2 mb-12'>
                        <label className='font-poppins xs:text-sm sss:text-base' htmlFor="">Password:</label>
                        <label className='font-poppins xs:text-sm sss:text-base' htmlFor="">Repeat password:</label>
                        <input className='border w-4/5 h-9 pl-3' type="password" onChange={(e) => setCredentials((credentials) => {return {...credentials, password: e.target.value}})} required />
                        <input className='border w-4/5 h-9 pl-3' type="password" onChange={(e) => setCredentials((credentials) => {return {...credentials, repeatPassword: e.target.value}})} required/>
                    </div>
                    
                    <button className='bg-black xs:w-44 sss:w-52 h-10 text-white font-bold rounded-full mb-2 mr-6 hover:bg-zinc-700 transition-all duration-500' type='submit' onClick={()=> sendCredentials()}>Create account</button>

                    <div className='h-[16px] w-fit'><span className='text-xs text-red-600'>{errMessage}</span></div>
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

export default SignUpComponent