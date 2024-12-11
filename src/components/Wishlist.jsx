





import React from "react";
import { useWishlist } from "../WishlistContext";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { user } = useUser();
  const navigate = useNavigate();

  const filteredData = user
    ? wishlistItems.filter((item) => item.userid === user.id)
    : [];

  return (
    <section className="h-full bg-gradient-to-r from-purple-400 to-blue-500 p-5">
      <div className="container mx-auto py-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Your Wishlist</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full focus:outline-none"
            title="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Wishlist Items */}
        {Array.isArray(filteredData) && filteredData.length === 0 ? (
          <p className="text-white text-center">Your wishlist is empty!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover h-40 w-40 rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-center mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Category: {item.category}
                </p>
                <p className="text-gray-700 font-bold text-center">₹{item.price}</p>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition"
                >
                  <FaTrash size={18} />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;





// import React, { useEffect, useState } from 'react';
// import { useWishlist } from '../WishlistContext';
// import { FaTrash } from 'react-icons/fa';
// import { useUser } from "../UserContext";
// import axios from 'axios';

// const Wishlist = () => {
//   const { wishlistItems, removeFromWishlist } = useWishlist();
//   const [data, setData] = useState([]);
//   const { user } = useUser();


//   // let wishlistitemdata = () => {
//   //   axios.get("http://localhost:5000/wishlist").then((res) => {
//   //       // console.log("Cart data:", res.data);
//   //       setData(res.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching cart data:", error);
//   //     });
//   // };

//   // useEffect(() => {
//   //   if (user && user.id) {
//   //     wishlistitemdata();
//   //   }
//   // }, [user]);

//   const filteredData = user
//     ? wishlistItems.filter((item) => item.userid === user.id)
//     : [];
//   console.log("filteredData", filteredData);

//   return (
//     <section className="h-full bg-gradient-to-r from-purple-400 to-blue-500 p-5">
//       <div className="container mx-auto py-5">
//         <h2 className="text-2xl font-semibold mb-4 text-white">Your Wishlist</h2>
        
//         {Array.isArray(filteredData) && filteredData.length === 0 ? (
//           <p className="text-white">Your wishlist is empty!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Array.isArray(filteredData) && filteredData.map((item) => (
//               <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
//                 <img src={item.image} alt={item.name} className="object-cover mx-auto mb-3 rounded-lg" />
//                 <h3 className="text-lg font-semibold">{item.name}</h3>
//                 <p className="text-gray-600">Category: {item.category}</p>
//                 <p className="text-gray-700">₹{item.price}</p>

//                 <button
//                   onClick={() => {removeFromWishlist(item.id)}}
//                   className="flex items-center justify-center mt-4 bg-red-500 text-white p-2 rounded space-x-2"
//                 >
//                   <FaTrash size={22} /> <span>Remove from Wishlist</span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Wishlist;
