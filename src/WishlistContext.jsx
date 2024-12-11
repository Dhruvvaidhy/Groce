import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const userContext = useUser();
  const user = userContext?.user;
  const [wishlistItems, setWishlistItems] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/wishlist?userid=${user.id}`);
          setWishlistItems(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };

    // fetchWishlist();
  }, [user]);

  const getCartWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:5000/wishlist");
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  
  const addToWishlist = async (product) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }
  
    // Check if the product is already in the wishlist
    const isProductInWishlist = wishlistItems.some(
      (item) => item.userid === user.id && item.name === product.name
    );  
  
    if (isProductInWishlist) {
      alert("This product is already in your wishlist.");
      return;
    } 
  
    try {
      const { id, ...productWithoutId } = product;
  
      await axios.post("http://localhost:5000/wishlist", {
        ...productWithoutId,
        userid: user.id,
      }); 
  
      getCartWishlist(); // Refresh wishlist data
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  
  const filteredData = user
    ? wishlistItems.filter((item) => item.userid === user.id)
    : [];
  console.log("filteredData", filteredData);

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    try {
      await axios.delete(`http://localhost:5000/wishlist/${productId}`);
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
      getCartWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };   

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};



