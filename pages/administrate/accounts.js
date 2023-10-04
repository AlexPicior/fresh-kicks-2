import React, {useState, useEffect} from 'react'
import { AdminNavBar, Table } from '../../components'
import { ColorRing } from 'react-loader-spinner';
import { useRouter } from 'next/router';




const accounts = () => {
  const router = useRouter();
  const [calledPush, setCalledPush] = useState(false);
  const [isBusy, setBusy] = useState(false);

  const [accountsList, setAccountsList] = useState([]);
  const [accountForm, setAccountForm] = useState({firstName: '', lastName: '', email: '', password: '', isAdmin: false});
  const defaultAccount = {firstName: '', lastName: '', email: '', password: '', isAdmin: false};

  const properties = [{name:'First name', type:'str'},{name:'Last name', type:'str'},{name:'Email', type:'str'},{name:'Password', type:'str'},{name:'Admin', type:'nr'}];
  const editProperties = [{name:'First name', type:'str'},{name:'Last name', type:'str'},{name:'Email', type:'str'},{name:'Password', type:'str'},{name:'Admin', type:'select', options: [{name:'Yes', id:'true'}, {name:'No', id:'false'}]}];
  const convertor = (account)=>{
      const {firstName, lastName, email, password, isAdmin} = account;
      const list = [firstName, lastName, email, password, isAdmin ? "Yes" : "No"];
      return list;
  }

  const deleteById = (id) =>{
      fetch(`https://fresh-kicks.up.railway.app/api/admin/account/${id}`, {
          method:'DELETE'
      })
      .then(() => {
          const updatedAccounts = accountsList.filter((account) => account.id !== id);
          setAccountsList(updatedAccounts);
      })
  }

  const create = () =>{
      
    fetch("https://fresh-kicks.up.railway.app/api/admin/account", {
      method: "POST",
      body: JSON.stringify(accountForm),
      headers: {
          "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      let item = {...json, firstName: json.first_name, lastName: json.last_name, isAdmin: json.is_admin};
      delete item.first_name;
      delete item.last_name;
      delete item.is_admin;
      setAccountsList([...accountsList, item]);
    });
  }

  const update = () =>{
    fetch(`https://fresh-kicks.up.railway.app/api/admin/account/${accountForm.id}`, {
      method: "PUT",
      body: JSON.stringify(accountForm),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      let item = {...json, firstName: json.first_name, lastName: json.last_name, isAdmin: json.is_admin};
      delete item.first_name;
      delete item.last_name;
      delete item.is_admin;
      const updatedAccounts = accountsList.map((account)=> account.id === item.id ? item : account);
          
      setAccountsList([...updatedAccounts]);
    });
  }

  const editForm = (value, type) =>{
    switch(type){
      case 'First name':
        setAccountForm({...accountForm, firstName: value});
        break;
      case 'Last name':
        setAccountForm({...accountForm, lastName: value});
        break;
      case 'Email':
        setAccountForm({...accountForm, email: value});
        break;
      case 'Password':
        setAccountForm({...accountForm, password: value});
        break;
      case 'Admin':
        setAccountForm({...accountForm, isAdmin: value == 'true' ? true : false});
        break;
    }
  }

  const getInputValue = (type) =>{
    switch(type){
      case 'First name':
        return accountForm.firstName;
        break;
      case 'Last name':
        return accountForm.lastName;
        break;
      case 'Email':
        return accountForm.email;
        break;
      case 'Password':
        return accountForm.password;
        break;
      case 'Admin':
        return accountForm.isAdmin;
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
              fetch('https://fresh-kicks.up.railway.app/api/admin/accounts')
              .then(response => response.json())
              .then(json =>{ 
                const convertedProps = json.map((item)=>{
                  item = {...item, firstName: item.first_name, lastName: item.last_name, isAdmin: item.is_admin};
                  delete item.first_name;
                  delete item.last_name;
                  delete item.is_admin;
                  return item;
                })
                setAccountsList(convertedProps);
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
          <Table data={accountsList} properties={properties} editProperties={editProperties} convertor={convertor} deleteMethod={deleteById} editForm={editForm} form={accountForm} setForm={setAccountForm} defaultForm={defaultAccount} getInputValue={getInputValue} createMethod={create} updateMethod={update} color={'bg-indigo-700'} altColor={'hover:bg-indigo-500'} ></Table>
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

export default accounts