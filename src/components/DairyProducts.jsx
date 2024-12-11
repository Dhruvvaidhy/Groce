import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarRating, Modal } from "./ProductCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAuth } from "../AuthContext";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DairyProducts = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchDairyProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dairy");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching dairy products:", error);
      }
    };

    fetchDairyProducts();
  }, []); 

  useEffect(() => {
    let filtered = products; 
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ); 
    }
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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

  return (
    <div className="ProductCard mt-4 md:mt-10">
      <h2 className="text-lg md:text-2xl font-semibold mb-4">Dairy</h2>
      <div className="mb-2 flex justify-end">
        <Link to="/all" className="text-blue-500 hover:underline">
          View All 
        </Link>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className="p-3 rounded-lg text-center cursor-pointer h-[300px] md:h-[340px] bg-white duration-200"
              onClick={() => setSelectedProduct(product)}
            > 
              <div className="flex justify-center h-[130px] md:h-[140px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover h-[90%] w-auto mx-auto mb-2"
                /> 
              </div>
              <h3 className="text-md md:text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <div className="text-gray-700">₹{product.price}</div>
              <StarRating rating={product.rating} />
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
                > 
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
                <FaHeart
                  className="text-red-500 cursor-pointer transition-transform transform hover:scale-125"
                  size={24}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToWishlist(product);
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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

export default DairyProducts;




// import React, { useState, useEffect, useRef } from "react";
// import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
// import { useCart } from "../CartContext";
// import { useWishlist } from "../WishlistContext";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { StarRating } from "./ProductCard";
// import { Modal } from "./ProductCard";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { useAuth } from "../AuthContext";
// import { Pagination, Navigation } from "swiper/modules";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const DairyProducts = ({ searchTerm }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     const fetchDairyProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/dairy");
//         setProducts(response.data);
//         setFilteredProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching dairy products:", error);
//       }
//     };

//     fetchDairyProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = products;

//     if (searchTerm) {
//       filtered = filtered.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredProducts(filtered);
//   }, [searchTerm, products]);

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

//   return (
//     <div className="DairyProducts mt-10 px-4 sm:px-6 md:px-8">
//       <h2 className="text-xl sm:text-2xl font-semibold mb-4">Dairy Products</h2>

//       <div className="mb-2 flex justify-end">
//         <Link to="/all" className="text-blue-500 hover:underline text-sm sm:text-base">
//           View All
//         </Link>
//       </div>

//       <div className="flex items-center space-x-4">
//         <div className="flex space-x-4 overflow-x-hidden w-full">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={15}
//             loop={true}
//             pagination={{ clickable: true }}
//             navigation={true}
//             modules={[Pagination, Navigation]}
//             className="mySwiper"
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               768: { slidesPerView: 3 },
//               1024: { slidesPerView: 4 },
//             }}
//           >
//             {filteredProducts.map((product) => (
//               <SwiperSlide key={product.id}>
//                 <div
//                   className="p-3 rounded-lg bg-white shadow-md text-center cursor-pointer h-[340px]"
//                   onClick={() => setSelectedProduct(product)}
//                 >
//                   <div className="h-[140px]">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="object-cover h-full w-auto mx-auto mb-3"
//                     /> 
//                   </div>
//                   <h3 className="text-base sm:text-lg font-semibold truncate">{product.name}</h3>
//                   <p className="text-sm text-gray-600">{product.category}</p>
//                   <div className="text-gray-700 text-sm sm:text-base">₹{product.price}</div>
//                   <StarRating rating={product.rating} />
//                   <div className="flex items-center justify-center mt-4 space-x-4">
//                     <button
//                       onClick={(event) => {
//                         event.stopPropagation();
//                         handleAddToCart(product);
//                       }}
//                       className="flex items-center bg-green-500 text-white text-sm p-2 rounded space-x-2"
//                     >
//                       <FaShoppingCart size={18} /> <span>Add to Cart</span>
//                     </button>
//                     <FaHeart
//                       className="text-gray-600 cursor-pointer"
//                       size={22}
//                       onClick={(event) => {
//                         event.stopPropagation();
//                         handleAddToWishlist(product);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))} 
//           </Swiper> 
//         </div>
//       </div>

//       {selectedProduct && (
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

// export default DairyProducts;



