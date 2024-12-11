import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/order");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const filteredData = user
    ? orders.filter((item) => item.userid === user.id && item.items.length > 0)
    : [];

  return (
    <section className="h-full bg-gray-100 py-10">
      <div className="container mx-auto px-5">
        {/* Header Section with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <button
            onClick={() => navigate(-1)} // Navigate back
            className="text-gray-600 hover:text-red-500 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Orders Content */}
        {loading ? (
          <p>Loading orders...</p>
        ) : filteredData.length > 0 ? (
          filteredData.map((order, ind) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-xl font-bold mb-2">Order #{ind + 1}</h2>
              <p className="text-gray-600 mb-4">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <ul className="space-y-3">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
                <li className="flex justify-between border-t pt-2 font-bold">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </div>
    </section>
  );
}


// import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useUser();
//   // const { filteredDatas , getCartItems } = useCart();


//   console.log("user", user);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/order");
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders");
//       }
//       const data = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchOrders();
//     }
//   }, [user]);

//   const filteredData = user
//     ? orders.filter((item) => item.userid === user.id && item.items.length > 0) // Filter out empty items
//     : [];

//   console.log("filteredData", filteredData);

//   return (
//     <section className="h-full bg-gray-100 py-10">
//       <div className="container mx-auto px-5">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
//         {loading ? (
//           <p>Loading orders...</p>
//         ) : filteredData.length > 0 ? (
//           filteredData.map((order, ind) => (
//             <div key={order.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
//               <h2 className="text-xl font-bold mb-2">Order #{ind + 1}</h2>
//               <p className="text-gray-600 mb-4">Date: {new Date(order.date).toLocaleDateString()}</p>
//               <ul className="space-y-3">
//                 {order.items.map((item) => (
//                   <li key={item.id} className="flex justify-between">
//                     <span>{item.name} (x{item.quantity})</span>
//                     <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//                   </li>
//                 ))}
//                 <li className="flex justify-between border-t pt-2 font-bold">
//                   <span>Total</span>
//                   <span>₹{order.total}</span>
//                 </li>
//               </ul>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No orders found.</p>
//         )}
//       </div>
//     </section>
//   );
// }


