import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { ColorRing } from 'react-loader-spinner';



const SignInComponent = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const [errMessage, setErrMessage] = useState("");

  const [calledPush, setCalledPush] = useState(false);
  const [isBusy, setBusy] = useState(false);
  useEffect(()=>{
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
    fetch('https://fresh-kicks.up.railway.app/api/login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
      if(response.url)
      {
        if (response.url == "https://fresh-kicks.up.railway.app/sign_in") setErrMessage("Email or password incorrect");
        else if(response.url == "https://fresh-kicks.up.railway.app/") 
        {
          router.push({
            pathname: '/',
          });
        }
      }
    })
    
  };

  return (
    <div className='flex-col mt-24 mb-36'>
      {isBusy ? (<div>
      <div className='flex justify-center'>

        <div className='xs:w-[70%] lg:w-[35%]'>
            <div className='flex flex-col justify-center' action="">
                
                <label className='font-poppins mb-2' htmlFor="">Email:</label>
                <input id='email' className='border w-[90%] h-9 mb-6 pl-3' type="text" onChange={(e) => setCredentials((credentials) => {return {...credentials, email: e.target.value}})} required />

                <label className='font-poppins mb-2' htmlFor="">Password:</label>
                <input className='border w-[90%] h-9 mb-8 pl-3' type="password" onChange={(e) => setCredentials((credentials) => {return {...credentials, password: e.target.value}})} required />

                <div>
                    <span className='text-xs text-zinc-500'>Don't have an accout? Make one </span>
                    <a className='text-xs text-blue-500' href="/sign_up">here</a>
                </div>
                <button className='bg-black mt-3 mb-2 xs:w-36 sss:w-52 h-10 text-white font-bold rounded-full mr-6 hover:bg-zinc-700 transition-all duration-500' type='submit' onClick={()=> sendCredentials()} >Login</button>
                
                <div className='h-[16px] w-fit'><span className='text-xs text-red-600 '>{errMessage}</span></div>
                <span className='font-poppins text-zinc-500'>demo@demo.com</span>
                <span className='font-poppins text-zinc-500'>Demodemo123</span>
            </div>
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

export default SignInComponent