import React, {useState, useEffect} from 'react'
import { AdminNavBar, Table } from '../../components'
import { ColorRing } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';



const profiles = () => {
  const router = useRouter();
  const [calledPush, setCalledPush] = useState(false);
  const [isBusy, setBusy] = useState(false);

  const [profilesList, setProfilesList] = useState([]);
  const [profileForm, setProfileForm] = useState({tel_nr: '', country: '', city: '', address: '', zip_code: ''});
  const defaultProfile = {tel_nr: '', country: '', city: '', address: '', zip_code: ''};

  const properties = [{name:'Name', type:'str'},{name:'Phone', type:'nr'},{name:'Country', type:'str'},{name:'City', type:'str'},{name:'Address', type:'str'},{name:'Zip code', type:'nr'}];
  const editProperties = [{name:'Phone', type:'str'},{name:'Country', type:'str'},{name:'City', type:'str'},{name:'Address', type:'str'},{name:'Zip code', type:'str'}];
  const convertor = (profile)=>{
      const {name, tel_nr, country, city, address, zip_code} = profile;
      const list = [name, tel_nr, country, city, address, zip_code];
      return list;
  }

  const deleteById = (id) =>{
    toast.error("You can not delete a profile! A profile is deleted when the associated account is deleted.");
  }

  const create = () =>{
    toast.error("You can not create a profile! A profile is created automatically when a new account is created.");
  }

  const update = () =>{
    fetch(`https://fresh-kicks.up.railway.app/api/admin/profile/${profileForm.id}`, {
      method: "PUT",
      body: JSON.stringify(profileForm),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      
      const updatedProfiles = profilesList.map((profile)=> profile.id === json.id ? json : profile);
          
      setProfilesList([...updatedProfiles]);
    });
  }

  const editForm = (value, type) =>{
    switch(type){
      case 'Phone':
        setProfileForm({...profileForm, tel_nr: value});
        break;
      case 'Country':
        setProfileForm({...profileForm, country: value});
        break;
      case 'City':
        setProfileForm({...profileForm, city: value});
        break;
      case 'Address':
        setProfileForm({...profileForm, address: value});
        break;
      case 'Zip code':
        setProfileForm({...profileForm, zip_code: value});
        break;
    }
  }

  const getInputValue = (type) =>{
    switch(type){
      case 'Phone':
        return profileForm.tel_nr;
        break;
      case 'Country':
        return profileForm.country;
        break;
      case 'City':
        return profileForm.city;
        break;
      case 'Address':
        return profileForm.address;
        break;
      case 'Zip code':
        return profileForm.zip_code;
        break;
        
    }
  }
  useEffect(()=>{
    fetch(`https://fresh-kicks.up.railway.app/api/admin/isNotAuth`)
    .then(response => {
      if(response.redirected)
      {
        router.push({
          pathname: '/administrate/admin_login',
        });
          
      }
      else
      {
        fetch('https://fresh-kicks.up.railway.app/api/admin/account/isAdmin')
        .then(response => response.json())
        .then(json =>{ 
          if(!json.errMessage)
          {
            if(json.isAdmin)
            {
              fetch('https://fresh-kicks.up.railway.app/api/admin/profiles')
              .then(response => response.json())
              .then(json =>{ 
                
                setProfilesList(json);
                setBusy(true);
              });
            }
            else
            {
              router.push({
                pathname: '/administrate/admin_login',
              });
            }
          }
        });
        
      }
        
    })
  },[])
  return (
    isBusy ? (
      <div>
        <AdminNavBar/>
        <div>
          <Table data={profilesList} properties={properties} editProperties={editProperties} convertor={convertor} deleteMethod={deleteById} editForm={editForm} form={profileForm} setForm={setProfileForm} defaultForm={defaultProfile} getInputValue={getInputValue} createMethod={create} updateMethod={update} color={'bg-cyan-700'} altColor={'hover:bg-cyan-500'} ></Table>
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
    )
  )
}

export default profiles