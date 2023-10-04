import React, {useState, useEffect} from 'react'
import { Banner, BestShoesSection, NewShoesSection} from '../components'
import {Layout} from '../components'


export const Home = () => {
  
  const [products, setProducts] = useState(null);
  useEffect(() =>{
    fetch('https://fresh-kicks.up.railway.app/api/products')
    .then(response => response.json())
    .then(json =>{ 
      setProducts(json);
    });
  }, []);
  

  return (
    <Layout>
      <div>
        <Banner />
        
        <BestShoesSection />

        {products && <NewShoesSection products = {products}/>}
      </div>
    </Layout>
    
  )
}
/*
export const getServerSideProps = async () =>{
  let products = [];
  fetch('https://fresh-kicks.up.railway.app/api/products')
  .then(response => response.json())
  .then(json => {
    products = [...json];
  });

  return {
    props: { products }
  }
}
*/
export default Home