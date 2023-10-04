import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [showFavs, setShowFavs] = useState(false);
  const [favsItems, setFavsItems] = useState([]);
  const [totalFavsQty, setTotalFavsQty] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");

  const [triggerRerender, setTriggerRerender] = useState(false);

  let foundProduct;

  const onAdd = (product) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id && item.size === product.size);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct.id === product.id && cartProduct.size === product.size) return {
          ...cartProduct,
          quantity: cartProduct.quantity + 1
        }
        return cartProduct;
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = 1;
      
      setCartItems([...cartItems, { ...product }]);
    }
    
    toast.success(`${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id && item.size === product.size);
    const newCartItems = cartItems.filter((item) => {
      if (item.id !== product.id) return true;
      else if(item.size !== product.size) return true;
      return false;
    });

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, size, value) => {
    foundProduct = cartItems.find((item) => item.id === id && item.size === size)
    const newCartItems = cartItems.filter((item) => item.id !== id && item.size !== size)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  const onAddFavs = (product) => {
    setTotalFavsQty((prevTotalFavQty) => prevTotalFavQty + 1);
    setFavsItems([...favsItems, {...product}]);
  }

  const onRemoveFavs = (product) => {
    const newFavsItems = favsItems.filter((item) => {
      if (item.id !== product.id) return true;
      return false;
    });

    setTotalFavsQty((prevTotalFavQty) => prevTotalFavQty - 1);
    setFavsItems(newFavsItems);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        showFavs,
        setShowFavs,
        favsItems,
        setFavsItems,
        totalFavsQty, 
        setTotalFavsQty,
        onAddFavs,
        onRemoveFavs,
        user,
        setUser, 
        userName,
        setUserName,
        triggerRerender,
        setTriggerRerender,
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);