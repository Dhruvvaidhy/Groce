import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAuth } from "../AuthContext";
import { Pagination, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

export const StarRating = ({ rating }) => (
  <div className="flex justify-center mb-2">
    {Array(5)
      .fill(0)
      .map((_, index) =>
        index < rating ? (
          <FaStar key={index} className="h-5 w-5 text-yellow-400 transition-transform duration-150 hover:scale-110" />
        ) : (
          <FaRegStar key={index} className="h-5 w-5 text-gray-300" />
        )
      )}
  </div>
);

export const Modal = ({ product, onClose, handleAddToCart, handleAddToWishlist }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    > 
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-sm md:max-w-lg w-full relative transform transition-transform scale-95 md:scale-100">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <FaTimes className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover mb-4 w-32 h-32 md:w-48 md:h-48"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-green-500 text-lg md:text-xl mb-4">₹{product.price}</p>
          <StarRating rating={product.rating} />
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleAddToCart(product);
              }}
              className="flex items-center bg-green-500 text-white p-2 px-4 rounded hover:bg-green-600 focus:ring-2 ring-green-300"
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
      </div>
    </div>
  );
};

const ProductCard = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = searchTerm
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products;
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
    <div className="ProductCard mt-2 md:mt-10">
      <h2 className="text-lg md:text-2xl font-semibold mb-4">Vegetable & Fruits Products</h2>
      <div className="mb-2 mt-2 flex justify-end">
        <Link to="/products" className="text-blue-500 hover:underline">
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

export default ProductCard;



// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaStar, FaRegStar, FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
// import { useCart } from "../CartContext";
// import { useWishlist } from "../WishlistContext";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { useAuth } from "../AuthContext";
// import { Pagination, Navigation } from "swiper/modules";
// import { Link, useNavigate } from "react-router-dom";

// export const StarRating = ({ rating }) => {
//   const stars = Array(5).fill(0);

//   return (
//     <div className="flex justify-center mb-2">
//       {stars.map((_, index) =>
//         index < rating ? (
//           <FaStar key={index} className="h-5 w-5 text-yellow-400" />
//         ) : (
//           <FaRegStar key={index} className="h-5 w-5 text-gray-300" />
//         )
//       )}
//     </div>
//   );
// };

// export const Modal = ({ product, onClose, handleAddToCart, handleAddToWishlist }) => {
//   if (!product) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
//       <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-sm md:max-w-lg w-full relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-600 hover:text-gray-900"
//         >
//           <FaTimes className="h-5 w-5 md:h-6 md:w-6" />
//         </button>
//         <div className="flex flex-col items-center">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="object-cover mb-4 w-32 h-32 md:w-48 md:h-48"
//           />
//           <h2 className="text-xl md:text-2xl font-bold mb-2">{product.name}</h2>
//           <p className="text-gray-600 mb-2">{product.category}</p>
//           <p className="text-green-500 text-lg md:text-xl mb-4">₹{product.price}</p>
//           <StarRating rating={product.rating} />
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={(event) => {
//                 event.stopPropagation();
//                 handleAddToCart(product);
//               }}
//               className="flex items-center justify-center mt-4 bg-green-500 space-x-2 text-white p-2 rounded"
//             >
//               <FaShoppingCart size={18} md:size={22} /> <span>Add to Cart</span>
//             </button>
//             <FaHeart
//               className="flex items-center justify-center mt-3 text-red-500 cursor-pointer"
//               size={24}
//               md:size={36}
//               onClick={(event) => {
//                 event.stopPropagation();
//                 handleAddToWishlist(product);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductCard = ({ searchTerm }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/products");
//         setProducts(response.data);
//         setFilteredProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = products;

//     if (searchTerm) {
//       filtered = filtered
//         .filter((product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .sort((a, b) => {
//           const aMatch = a.name
//             .toLowerCase()
//             .startsWith(searchTerm.toLowerCase());
//           const bMatch = b.name
//             .toLowerCase()
//             .startsWith(searchTerm.toLowerCase());
//           return bMatch - aMatch;
//         });
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
//     <div className="ProductCard mt-4 md:mt-10">
//       <h2 className="text-lg md:text-2xl font-semibold mb-4">Vegetable & Fruits Products</h2>
//       <div className="mb-2 flex justify-end">
//         <Link to="/products" className="text-blue-500 hover:underline">
//           View All
//         </Link>
//       </div>

//       <div className="w-full">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={10}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 },
//           }}
//           loop={true}
//           pagination={{ clickable: true }}
//           navigation={true}
//           modules={[Pagination, Navigation]}
//           className="mySwiper"
//         > 
//           {filteredProducts.map((product) => (
//             <SwiperSlide key={product.id}>
//               <div
//                 className="p-3 rounded-lg text-center cursor-pointer h-[300px] md:h-[340px] bg-white "
//                 onClick={() => setSelectedProduct(product)}
//               >
//                 <div className="flex justify-center h-[120px] md:h-[140px]">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="object-cover h-[80%] w-auto mx-auto mb-3"
//                   />
//                 </div>
//                 <h3 className="text-md md:text-lg font-semibold">{product.name}</h3>
//                 <p className="text-gray-600">{product.category}</p>
//                 <div className="text-gray-700">₹{product.price}</div>
//                 <StarRating rating={product.rating} />
//                 <div className="flex items-center justify-center mt-4 space-x-4">
//                   <button
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       handleAddToCart(product);
//                     }}
//                     className="flex items-center bg-green-500 space-x-2 text-white p-2 rounded"
//                   >
//                     <FaShoppingCart size={18} md:size={22} /> <span>Add to Cart</span>
//                   </button>  
//                   <FaHeart
//                     className="text-gray-600 cursor-pointer"
//                     size={24}
//                     md:size={30}
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       handleAddToWishlist(product);
//                     }}
//                   />
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
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

// export default ProductCard;

