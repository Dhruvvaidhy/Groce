import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import { StarRating, Modal } from "./ProductCard";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
 
  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const endpoints = [
            "http://localhost:5000/dairy",
            "http://localhost:5000/snacksBiscuits",
            "http://localhost:5000/sweetsDryFruits",
            "http://localhost:5000/specialMasala",
            "http://localhost:5000/products",
            "http://localhost:5000/riceFlour",
            "http://localhost:5000/oilGhee",
          ];

          const allResults = await Promise.all(
            endpoints.map((url) =>
              axios.get(url).then((res) =>
                res.data.filter((item) =>
                  item.name.toLowerCase().includes(query.toLowerCase())
                )
              )
            )
          );

          setResults(allResults.flat());
        } catch (err) {
          setError("Failed to fetch data. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [query]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to the cart");
      navigate("/login");
    } else {
      addToCart(product);
    }
  };

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to the wishlist");
      navigate("/login");
    } else {
      addToWishlist(product);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Results for "{query}"</h2>
      <div className="absolute top-0 right-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black p-2"
        >
          <FaTimes size={24} />
        </button>
      </div>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-md text-center"
              onClick={() => setSelectedProduct(item)}
            >
              {/* Product Image */}
              <div className="h-50 flex items-center justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover h-[50%] w-[60%] rounded"
                />
              </div> 
              {/* Product Details */}
              <h3 className="text-lg font-semibold truncate">{item.name}</h3>
              <p className="text-gray-600">{item.category || "Category"}</p>
              <div className="text-gray-700 font-bold">₹{item.price}</div>
              <StarRating rating={item.rating || 0} />
              {/* Action Buttons */}
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                  onClick={() => addToCart(item)}
                  className="flex items-center bg-green-500 space-x-2 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                  <FaShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button> 
                <FaHeart
                  className="text-gray-600 hover:text-red-500 cursor-pointer transition"
                  size={24}
                  onClick={() => addToWishlist(item)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for "{query}".</p>
      )} 
      
      {selectedProduct && ( 
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          handleAddToCart={handleAddToCart}
          handleAddToWishlist={handleAddToWishlist}
        />
      )}
    </div> 
  );
};

export default SearchResults;  



// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useCart } from "../CartContext";
// import { useWishlist } from "../WishlistContext";
// import { useAuth } from "../AuthContext";
// import axios from "axios";
// import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
// import { StarRating , Modal } from "./ProductCard";
// import { useNavigate } from "react-router-dom";

// const SearchResults = () => {
//   const location = useLocation();
//   const [results, setResults] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { isAuthenticated } = useAuth();
//   // Get the search query from the URL
//   const query = new URLSearchParams(location.search).get("query");
//   const navigate = useNavigate();
//   // Hooks for Cart and Wishlist actions
//   const { addToCart } = useCart();
 
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     if (query) {
//       const fetchData = async () => {
//         setIsLoading(true); 
//         setError(null); 
//         try { 
//           // Replace these API endpoints with your actual ones
//           const endpoints = [
//             "http://localhost:5000/dairy",
//             "http://localhost:5000/snacksBiscuits",
//             "http://localhost:5000/sweetsDryFruits",
//             "http://localhost:5000/specialMasala",
//             "http://localhost:5000/products",
//             "http://localhost:5000/riceFlour",
//             "http://localhost:5000/oilGhee",
//           ]; 

//           const allResults = await Promise.all(
//             endpoints.map((url) =>
//               axios.get(url).then((res) =>
//                 res.data.filter((item) =>
//                   item.name.toLowerCase().includes(query.toLowerCase())
//                 )
//               )
//             )
//           ); 

//           setResults(allResults.flat()); // Combine all API results into a single array
//         } catch (err) { 
//           setError("Failed to fetch data. Please try again.");
//         } finally { 
//           setIsLoading(false);
//         } 
//       };  

//       fetchData();
//     } 
//   }, [query]);  

//   const handleAddToCart = (product) => {
//     if (!isAuthenticated) {
//       alert("Please log in to add items to the cart");
//       navigate("/login");
//     } else {
//       addToCart(product);
//     } 
//   }; 

//   const handleAddToWishlist = (product) => { 
//     if (!isAuthenticated) {
//       alert("Please log in to add items to the wishlist");
//       navigate("/login");
//     } else {
//       addToWishlist(product);
//     }
//   }; 

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>; 

//   return (
//     <div className="p-4">
         
//       <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
//       <button
//         onClick={() => navigate(-1)}
//         className=" items-center justify-end text-gray-600 hover:text-black mb-4"
//       >
//         <FaTimes className="mr-2" size={20} />
        
//       </button>
//       {results.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {results.map((item) => (
//             <div 
//               key={item.id}  
//               className="p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-md text-center"
//               onClick={() => setSelectedProduct(item)}
//             > 
//               {/* Product Image */}
//               <div className="h-50 flex items-center justify-center mb-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="object-cover h-[50%] w-[60%] rounded"
//                 />
//               </div> 
//               {/* Product Details */}
//               <h3 className="text-lg font-semibold truncate">{item.name}</h3>
//               <p className="text-gray-600">{item.category || "Category"}</p>
//               <div className="text-gray-700 font-bold">₹{item.price}</div>
//               <StarRating rating={item.rating || 0} />
//               {/* Action Buttons */}
//               <div className="flex items-center justify-center mt-4 space-x-4">
//                 <button
//                   onClick={() => addToCart(item)}
//                   className="flex items-center bg-green-500 space-x-2 text-white py-2 px-4 rounded hover:bg-green-600 transition"
//                 >
//                   <FaShoppingCart size={20} />
//                   <span>Add to Cart</span>
//                 </button>
//                 <FaHeart
//                   className="text-gray-600 hover:text-red-500 cursor-pointer transition"
//                   size={24}
//                   onClick={() => addToWishlist(item)}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No results found for "{query}".</p>
//       )}

// {selectedProduct && (
//         <Modal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           handleAddToCart={handleAddToCart}
//           handleAddToWishlist={handleAddToWishlist}
//         /> 
//       )}
//     </div>
//   );
// };

// export default SearchResults;