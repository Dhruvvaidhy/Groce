// import React, { useContext } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../CartContext"; // Assuming you have a CartContext

// export default function OrderComplete() {
//   const { cartItems } = useCart(); // Get cart items from context
//   const navigate = useNavigate();

//   // Calculate the total from cartItems
//   const calculateTotal = () => {
//     return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
//   };

//   return (
//     <section className="h-full bg-gray-100 py-10 flex items-center justify-center">
//       <div className="container mx-auto px-5">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto text-center">
//           <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h1>
//           <p className="text-gray-600 mb-6">
//             Your order has been successfully completed. A confirmation email with your order details has been sent to you.
//           </p>

//           {/* Order Summary */}
//           <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
//             <h2 className="text-lg font-bold text-gray-800 mb-3">Order Summary</h2>
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex justify-between mb-2">
//                 <span>{item.name} (x{item.quantity})</span>
//                 <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//             <div className="flex justify-between border-t pt-2 font-bold">
//               <span>Total</span>
//               <span>₹{calculateTotal()}</span>
//             </div>
//           </div>

//           {/* Next Steps */}
//           <button
//             onClick={() => navigate("/")}
//             className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// import React, { useEffect } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../CartContext";

// export default function OrderComplete() {
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const calculateTotal = () => {
//     return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
//   };

//   useEffect(() => {
//     // Prepare order data
//     const orderData = {
//       items: cartItems,
//       total: calculateTotal(),
//       date: new Date().toISOString(),
//     };

//     // Send order data to the API
//     const submitOrder = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/order", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderData),
//         });
//         if (!response.ok) {
//           throw new Error("Failed to submit order");
//         }
//         console.log("Order submitted successfully");
//       } catch (error) {
//         console.error("Error submitting order:", error);
//       }
//     };

//     submitOrder();
//   }, [cartItems]);

//   return (
//     <section className="h-full bg-gray-100 py-10 flex items-center justify-center">
//       <div className="container mx-auto px-5">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto text-center">
//           <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h1>
//           <p className="text-gray-600 mb-6">
//             Your order has been successfully completed. A confirmation email with your order details has been sent to you.
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useUser } from "../UserContext";
import axios from "axios";

export default function OrderComplete() {
  const { user } = useUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Ensure user exists before filtering cart items
  const filteredData = user
    ? cartItems.filter((item) => item.userid === user.id)
    : [];

    const quantity = filteredData.reduce((acc, item) => acc + item.quantity, 0);
  const price = filteredData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!user || filteredData.length === 0) return;

    // Prepare order data
    const orderData = {
      items: filteredData,
      userid: user.id,
      total: price,
      date: new Date().toISOString(),
    };

    // Send order data to the API
    const submitOrder = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/order",
          orderData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Order submitted successfully", response.data);
      } catch (error) {
        console.error(
          "Error submitting order:",
          error.response?.data || error.message
        );
      }
    };

    submitOrder();
  }, [cartItems, filteredData, user, price]); // Ensure all dependencies are included

  return (
    <section className="h-full bg-gray-100 py-10 flex items-center justify-center">
      <div className="container mx-auto px-5">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been successfully completed. A confirmation email
            with your order details has been sent to you.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
}
