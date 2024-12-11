import React, { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

// Create the CartContext
const CartContext = createContext();

// Custom hook for using CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [cartItemsData, setCartItemsData] = useState([]);
  const { user } = useUser();

  // Fetch cart items from the backend
  const getCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCartItemsData(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Filter cart items based on the current user
  useEffect(() => {
    if (user) {
      const filtered = cartItemsData.filter(
        (item) => item.userid === user.id
      );
      setFilteredDatas(filtered);
    } else {
      setFilteredDatas([]);
    }
  }, [user, cartItemsData]);

  const addToCart = async (product) => {
    if (!user) {
      console.warn("User not logged in. Cannot add items to cart.");
      return;
    }

    const isProductInCart = cartItemsData.some(
      (item) => item.userid === user.id && item.name === product.name
    );

    if (isProductInCart) {
      alert("This product is already in your cart.");
      return;
    }

    try {
      const { id, ...productWithoutId } = product;

      await axios.post("http://localhost:5000/cart", {
        ...productWithoutId,
        userid: user.id,
        quantity: 1,
      });

      getCartItems(); // Refresh cart data
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const increaseQuantity = async (productId, name) => {
    try {
      const productInCart = cartItemsData.find(
        (item) => item.userid === user.id && item.name === name
      );

      if (productInCart) {
        const updatedQuantity = productInCart.quantity + 1;

        await axios.patch(`http://localhost:5000/cart/${productId}`, {
          quantity: updatedQuantity,
        });

        getCartItems();
      } else {
        console.log("Product not found for the user with the same name");
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (productId, name) => {
    try {
      const productInCart = cartItemsData.find(
        (item) => item.userid === user.id && item.name === name
      );

      if (productInCart) {
        const updatedQuantity = Math.max(productInCart.quantity - 1, 1);

        if (productInCart.quantity > 1) {
          await axios.patch(`http://localhost:5000/cart/${productId}`, {
            quantity: updatedQuantity,
          });

          getCartItems();
        } else {
          console.log("Minimum quantity reached. Cannot decrease further.");
        }
      } else {
        console.log("Product not found for the user with the same name");
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${productId}`);
      getCartItems(); // Refresh cart data
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const ids = filteredDatas.map((item) => item.id);
      await Promise.all(
        ids.map((id) => axios.delete(`http://localhost:5000/cart/${id}`))
      );
      getCartItems()
      setCartItemsData([]);
      setFilteredDatas([]);
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItemsData,
        filteredDatas,
        getCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

