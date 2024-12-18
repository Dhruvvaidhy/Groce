import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaShoppingCart, FaTimes, FaStar , FaRegStar  } from "react-icons/fa";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarRating } from "./ProductCard";
import { Modal } from "./ProductCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAuth } from "../AuthContext";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SpecialMasala = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const productContainerRef = useRef(null);
  const { wishlistItems } = useWishlist();


  useEffect(() => {
    // Fetch dairy products from API
    const fetchDairyProducts = async () => {
      try {  
        const response = await axios.get("http://localhost:5000/specialMasala");
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

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  console.log("wishlistItems" , wishlistItems);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to the cart");
      navigate("/login"); // Redirect to login page
    } else {
      addToCart(product);
    }
  };

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to the wishlist");
      navigate("/login"); // Redirect to login page
    } else {
      addToWishlist(product);
    }
  };


  return (
    <div className="ProductCard mt-4 md:mt-10">
      <h2 className="text-lg md:text-2xl font-semibold mb-4">Special Masala</h2>
      <div className="mb-2 flex justify-end">
        <Link to="/masala" className="text-blue-500 hover:underline">
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
export default SpecialMasala;

