import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";

export const clearCart = async (ids, setFilteredItem) => {
  try {
    await Promise.all(
      ids.map((id) => axios.delete(`http://localhost:5000/cart/${id}`))
    );
    setFilteredItem([]);
    console.log("All items in the cart have been deleted.");
  } catch (error) {
    console.error("Error clearing the cart:", error);
  }
};

function Cart() {
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    getCartItems,
    filteredDatas = [],
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const [filteredItem, setFilteredItem] = useState([]);

  useEffect(() => {
    setFilteredItem(filteredDatas);
  }, [filteredDatas]);

  const calculateTotal = () => {
    return filteredItem
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const ids = filteredItem.map((item) => item.id);

  if (!user) {
    return (
      <section className="h-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">
            You must be logged in to view your cart.
          </p>
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="h-full bg-gradient-to-r from-purple-400 to-blue-500 p-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Your Cart</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
            {Array.isArray(filteredItem) && filteredItem.length === 0 ? (
              <p className="text-center text-lg font-semibold">
                Your cart is empty.
              </p>
            ) : (
              filteredItem.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center mb-4 bg-gray-100 rounded-lg p-4"
                >
                  <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full rounded-lg hover:scale-105 transition-all"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Category: {item.category}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="text-gray-600 hover:text-red-500"
                        onClick={async () => {
                          try {
                            await removeFromCart(item.id);
                          } catch (error) {
                            console.error(
                              "Error removing item from cart:",
                              error
                            );
                          }
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          decreaseQuantity(item.id, item.name);
                        }}
                        className="px-2 py-1 bg-gray-300 text-gray-600 rounded"
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        className="border text-center w-16 py-1"
                        value={item.quantity}
                        readOnly
                      />  
                      <button
                        onClick={() => {
                          increaseQuantity(item.id, item.name);
                        }}
                        className="px-2 py-1 bg-gray-300 text-gray-600 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <p className="font-bold text-gray-700">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Section */}
          <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
            <h5 className="text-xl font-bold mb-4">Summary</h5>
            <ul className="mb-4">
              <li className="flex justify-between border-b pb-2">
                <span>Products</span>
                <span>₹{calculateTotal()}</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Shipping</span>
                <span>Free</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>
                  <strong>Total</strong>
                </span>
                <span>
                  <strong>₹{calculateTotal()}</strong>
                </span>
              </li>
            </ul>
            <button
              onClick={async () => {
                await clearCart(ids, setFilteredItem);
                getCartItems();
              }}
              
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-4"
            >
              Clear Cart
            </button>
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Checkout
            </button> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;



// import React, { useEffect, useState } from "react";
// import { useCart } from "../CartContext";
// import { useUser } from "../UserContext";
// import { useNavigate } from "react-router-dom";
// import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
// import axios from "axios";

// // Move `clearCart` outside the `Cart` component
// export const clearCart = async (ids, setFilteredItem) => {
//   try {
//     await Promise.all(
//       ids.map((id) => axios.delete(`http://localhost:5000/cart/${id}`))
//     );
//     setFilteredItem([]);
//     console.log("All items in the cart have been deleted.");
//   } catch (error) {
//     console.error("Error clearing the cart:", error);
//   }
// };

// function Cart() {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const {
//     getCartItems,
//     filteredDatas = [],
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useCart();
//   const [filteredItem, setFilteredItem] = useState([]);

//   useEffect(() => {
//     setFilteredItem(filteredDatas);
//   }, [filteredDatas]);

//   console.log("Filtered Data:", filteredDatas);  


//   const calculateTotal = () => {
//     return filteredItem
//       .reduce((acc, item) => acc + item.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   const ids = filteredItem.map((item) => item.id);

//   if (!user) {
//     return (
//       <section className="h-full bg-gradient-to-r from-purple-400 to-blue-500 overflow-x-hidden">
//         <div className="container mx-auto ml-2 py-5">
//           <div className="flex justify-center my-4">
//             <div className="w-full md:w-2/3 text-center">
//               <p className="text-lg">
//                 You must be logged in to view your cart.
//               </p>
//               <button
//                 onClick={() => navigate("/login", { replace: true })}
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//               >
//                 Go to Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="h-full bg-gradient-to-r from-purple-400 to-blue-500 overflow-x-hidden">
//       <div className="container mx-auto ml-2 py-5">
//         <div className="flex justify-center my-4">
//           <div className="w-full md:w-2/3">
//             <div className="bg-white shadow-md mb-4 rounded p-4">
//               {Array.isArray(filteredItem) && filteredItem.length === 0 ? (
//                 <p className="text-center text-lg">Your cart is empty.</p>
//               ) : (
//                 filteredItem.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex flex-wrap mb-4 items-center bg-gray-100 rounded-lg p-4"
//                   >
//                     <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full rounded-lg hover:scale-105 transition-all"
//                       />
//                     </div>
//                     <div className="w-full lg:w-1/2 px-4">
//                       <h3 className="text-lg font-semibold">{item.name}</h3>
//                       <p className="text-gray-600">Category: {item.category}</p>
//                       <p className="text-gray-600">Price: ₹{item.price}</p>
//                       <div className="flex space-x-2 mt-2">
//                         <button
//                           className="text-gray-600 hover:text-red-500"
//                           onClick={async () => {
//                             try {
//                               await removeFromCart(item.id); 
//                             } catch (error) {
//                               console.error(
//                                 "Error removing item from cart:",
//                                 error
//                               );
//                             }
//                           }}
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="w-full lg:w-1/4 flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => {
//                             decreaseQuantity(item.id, item.name);
//                           }}
//                           className="px-2 py-1 bg-gray-300 text-gray-600 rounded"
//                         >
//                           <FaMinus />
//                         </button>
//                         <input
//                           type="number"
//                           className="border text-center w-16 py-1"
//                           value={item.quantity}
//                           readOnly
//                         />
//                         <button
//                           onClick={() => {
//                             increaseQuantity(item.id, item.name); 
//                           }}
//                           className="px-2 py-1 bg-gray-300 text-gray-600 rounded"
//                         >
//                           <FaPlus />
//                         </button>
//                       </div>
//                       <p className="font-bold text-gray-700">
//                         ₹{(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           <div className="w-full md:w-1/3">
//             <div className="bg-white shadow-md rounded mr-4 ml-4 mb-4">
//               <div className="p-4 border-b">
//                 <h5 className="text-xl font-bold">Summary</h5>
//               </div>
//               <div className="p-4">
//                 <ul>
//                   <li className="flex justify-between border-b pb-2">
//                     <span>Products</span>
//                     <span>₹{calculateTotal()}</span>
//                   </li>
//                   <li className="flex justify-between py-2">
//                     <span>Shipping</span>
//                     <span>Free</span>
//                   </li>
//                   <li className="flex justify-between border-b pb-2">
//                     <span>
//                       <strong>Total</strong>
//                     </span>
//                     <span>
//                       <strong>₹{calculateTotal()}</strong>
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="pt-4">
//                 <button
//                   onClick={() => clearCart(ids, setFilteredItem)}
//                   className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//                 >
//                   Clear Cart
//                 </button>
//               </div>

//               <div className="pt-4">
//                 <button
//                   onClick={() => {
//                     (navigate("/checkout") , getCartItems);
//                   }}
//                   className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
//                 >
//                   Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Cart;
