import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';



const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const [errMessage, setErrMessage] = useState("");

  useEffect(()=>{
    fetch('https://fresh-kicks.up.railway.app/api/logout', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response =>{
        
    })
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
          fetch('https://fresh-kicks.up.railway.app/api/admin/account/isAdmin')
          .then(response => response.json())
          .then(json =>{ 
            if(!json.errMessage)
            {
              if(json.isAdmin)
              {
                  router.push({
                      pathname: '/administrate/products',
                  });
              }
              else
              {
                  setErrMessage("This is not an admin account");
              }
            }
          });
        }
      }
    })
    
  };

  return (
    <div>
      <div className='flex flex-col content-center flex-wrap h-[100vh]'>
        <div className='mb-16 mt-32'>
            <span className='font-poppins text-4xl'>Admin login</span>
        </div>
        <div className='xs:w-[70%] lg:w-[35%]'>
            <div className='flex flex-col justify-center' action="">
                
                <label className='font-poppins mb-2' htmlFor="">Email:</label>
                <input id='email' className='border w-[90%] h-9 mb-6 pl-3' type="text" onChange={(e) => setCredentials((credentials) => {return {...credentials, email: e.target.value}})} required />

                <label className='font-poppins mb-2' htmlFor="">Password:</label>
                <input className='border w-[90%] h-9 mb-8 pl-3' type="password" onChange={(e) => setCredentials((credentials) => {return {...credentials, password: e.target.value}})} required />

                <button className='bg-black mt-3 mb-2 xs:w-36 sss:w-52 h-10 text-white font-bold rounded-full mr-6 hover:bg-zinc-700 transition-all duration-500' type='submit' onClick={()=> sendCredentials()} >Login</button>
                
                <div className='h-[16px] w-fit'><span className='text-xs text-red-600 '>{errMessage}</span></div>
                <span className='font-poppins text-zinc-500'>admin@admin.com</span>
                <span className='font-poppins text-zinc-500'>Adminadmin123</span>
            </div>
        </div>
          
      </div>
    </div>
  )
}

export default AdminLogin