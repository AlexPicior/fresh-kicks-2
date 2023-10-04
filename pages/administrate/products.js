import React, {useState, useEffect} from 'react'
import { AdminNavBar, Table } from '../../components'
import { ColorRing } from 'react-loader-spinner';
import { useRouter } from 'next/router';

const products = () => {
  const router = useRouter();
  const [calledPush, setCalledPush] = useState(false);
  const [isBusy, setBusy] = useState(false);

  const [productsList, setProductsList] = useState([]);
  const [productForm, setProductForm] = useState({name: '', price: 1, age_type: '', gender: 0, color: 0, images: ['','','','',''], brand: 0, slug: ''});
  const defaultProduct = {name: '', price: 1, age_type: 0, gender: 0, color: 0, images: ['','','','',''], brand: 0, slug: ''};

  const properties = [{name:'Name', type:'str'},{name:'Price', type:'nr'},{name:'Age', type:'nr'},{name:'Gender', type:'nr'},{name:'Color', type:'nr'},{name:'Brand', type:'nr'},{name:'Slug', type:'str'}];
  const age_types = [{name:'Adult', id:'0'}, {name:'Kid', id:'1'}];
  const genders = [{name:'Men', id:'0'}, {name:'Women', id:'1'}, {name:'Unisex', id:'2'}];
  const colors = [{name:'White', id:'0'}, {name:'Black', id:'1'}, {name:'Beige', id:'2'}, {name:'Red', id:'3'}, {name:'Green', id:'4'}, {name:'Blue', id:'5'}, {name:'Yellow', id:'6'}, {name:'Purple', id:'7'}];
  const brands = [{name:'Nike', id:'0'}, {name:'Addidas', id:'1'}, {name:'New Balance', id:'2'}, {name:'Puma', id:'3'}, {name:'Converse', id:'4'}, {name:'Vans', id:'5'}];
  const editProperties = [{name:'Name', type:'str'},{name:'Price', type:'nr'},{name:'Age type', type:'select', options: age_types},{name:'Gender', type:'select', options: genders},{name:'Color', type:'select', options: colors},{name:'Image 1', type:'str'},{name:'Image 2', type:'str'},{name:'Image 3', type:'str'},{name:'Image 4', type:'str'},{name:'Image 5', type:'str'},{name:'Brand', type:'select', options: brands},{name:'Slug', type:'str'}];

  const dbDataToString = (product) =>{
    let {name, price, age_type, gender, color, images, brand, slug} = product;

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

    return {name, price, age_type, gender, color, brand, slug};
  }
  const convertor = (product)=>{
      const {name, price, age_type, gender, color, brand, slug} = dbDataToString(product);
      const list = [name, price, age_type, gender, color, brand, slug];
      return list;
  }

  const deleteById = (id) =>{
      fetch(`https://fresh-kicks.up.railway.app/api/admin/product/${id}`, {
          method:'DELETE'
      })
      .then(() => {
          const updatedProducts = productsList.filter((product) => product.id !== id);
          setProductsList(updatedProducts);
      })
  }

  const create = () =>{
      
    fetch("https://fresh-kicks.up.railway.app/api/admin/product", {
      method: "POST",
      body: JSON.stringify(productForm),
      headers: {
          "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      setProductsList([...productsList, json]);
    });
  }

  const update = () =>{
    fetch(`https://fresh-kicks.up.railway.app/api/admin/product/${productForm.id}`, {
      method: "PUT",
      body: JSON.stringify(productForm),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      const updatedProducts = productsList.map((product)=> product.id === json.id ? json : product);
          
      setProductsList([...updatedProducts]);
    });
  }

  const editForm = (value, type) =>{
    switch(type){
      case 'Name':
        setProductForm({...productForm, name: value});
        break;
      case 'Price':
        setProductForm({...productForm, price: value});
        break;
      case 'Age type':
        setProductForm({...productForm, age_type: parseInt(value)});
        break;
      case 'Gender':
        setProductForm({...productForm, gender: parseInt(value)});
        break;
      case 'Color':
        setProductForm({...productForm, color: parseInt(value)});
        break;
      case 'Image 1':
        setProductForm({...productForm, images: productForm.images.map((e, i)=> i == 0 ? value : e)});
        break;
      case 'Image 2':
        setProductForm({...productForm, images: productForm.images.map((e, i)=> i == 1 ? value : e)});
        break;
      case 'Image 3':
        setProductForm({...productForm, images: productForm.images.map((e, i)=> i == 2 ? value : e)});
        break;
      case 'Image 4':
        setProductForm({...productForm, images: productForm.images.map((e, i)=> i == 3 ? value : e)});
        break;
      case 'Image 5':
        setProductForm({...productForm, images: productForm.images.map((e, i)=> i == 4 ? value : e)});
        break;
      case 'Brand':
        setProductForm({...productForm, brand: parseInt(value)});
        break;
      case 'Slug':
        setProductForm({...productForm, slug: value});
        break;
          
    }
  }

  const getInputValue = (type) =>{
    switch(type){
      case 'Name':
        return productForm.name;
        break;
      case 'Price':
        return productForm.price;
        break;
      case 'Image 1':
        return productForm.images[0];
        break;
      case 'Image 2':
        return productForm.images[1];
        break;
      case 'Image 3':
        return productForm.images[2];
        break;
      case 'Image 4':
        return productForm.images[3];
        break;
      case 'Image 5':
        return productForm.images[4];
        break;
      case 'Slug':
        return productForm.slug;
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
              fetch('https://fresh-kicks.up.railway.app/api/admin/products')
              .then(response => response.json())
              .then(json =>{ 
                
                setProductsList(json);
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
          <Table data={productsList} properties={properties} editProperties={editProperties} convertor={convertor} deleteMethod={deleteById} editForm={editForm} form={productForm} setForm={setProductForm} defaultForm={defaultProduct} getInputValue={getInputValue} createMethod={create} updateMethod={update} color={'bg-emerald-700'} altColor={'hover:bg-emerald-600'} ></Table>
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

export default products