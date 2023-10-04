import React, {useState} from 'react'
import Product from './Product'


const CarouselProd = ({similarProducts}) => {
  /*
  let bestProducts = [{name:"ADIDAS Pantofi Sport NITEBALL", price:729.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/FZ5/FZ5741/images/thumbs_900/FZ5741_900_900px.jpg.webp"], slug:"adidas-pantofi-sport-niteball"},
  {name:"ADIDAS Pantofi Sport ZX 22 BOO", price:729.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/HP2/HP2769/images/thumbs_900/HP2769_900_900px.jpg.webp"], slug:"adidas-pantofi-sport-zx-22-boo"},
  {name:"NIKE Pantofi Sport NIKE DUNK LOW NH", price:629.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/DX2/DX2654-200/images/thumbs_900/DX2654-200_900_900px.jpg.webp"], slug:"nike-pantofi-sport-nike-dunk-low-nh"},
  {name:"NIKE Pantofi Sport NIKE AIR FORCE 1 '07", price:799.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/DX2/DX2666-100/images/thumbs_900/DX2666-100_900_900px.jpg.webp"], slug:"nike-pantofi-sport-nike-air-force-1-07"},
  {name:"ADIDAS Pantofi Sport NITEBALL", price:729.99, images:["https://www.buzzsneakers.ro/files/thumbs/files/images/slike-proizvoda/media/FZ5/FZ5741/images/thumbs_900/FZ5741_900_900px.jpg.webp"], slug:"adidas-pantofi-sport-niteball"},];
  */
  return (
    <div className='flex justify-evenly mx-5 mt-10 mb-32'>
      {similarProducts?.map((product) => product && <Product key = {product.id} product = {product}/>)}
    </div>
  )
}

export default CarouselProd