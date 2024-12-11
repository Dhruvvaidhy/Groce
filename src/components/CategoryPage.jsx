import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import { StarRating } from "./ProductCard";

const categoryEndpoints = {
  "Fruits & Vegetables": "http://localhost:5000/products",
  "Dairy": "http://localhost:5000/dairy",
  "Snacks & Biscuits": "http://localhost:5000/snacksBiscuits",
  "Sweets & Dry Fruits": "http://localhost:5000/sweetsDryFruits",
  "Special Masala": "http://localhost:5000/specialMasala",
  "Rice & Flour": "http://localhost:5000/riceFlour",
  "Oil & Ghee": "http://localhost:5000/oilGhee",
};

const CategoryPage = () => {
  const { name } = useParams(); // Get the category name from URL params
  const navigate = useNavigate(); // Initialize useNavigate
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const endpoint = categoryEndpoints[name];
    if (endpoint) {
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setLoading(false));
    }
  }, [name]);

  return (
    <div className="CategoryPage mx-4 mt-10">
      {/* Header Section with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold capitalize">{name}</h2>
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="text-gray-600 hover:text-red-500 transition"
        >
          <FaTimes size={24} />
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg bg-gray-50 border-current text-center shadow-md"
            >
              {/* Product Image */}
              <div className="h-36 flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover h-full rounded"
                />
              </div>
              {/* Product Details */}
              <h3 className="text-lg font-semibold truncate">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <div className="text-gray-700 font-bold">₹{product.price}</div>
              <StarRating rating={product.rating} />
              {/* Action Buttons */}
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center bg-green-500 space-x-2 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                  <FaShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <FaHeart
                  className="text-gray-600 hover:text-red-500 cursor-pointer transition"
                  size={24}
                  onClick={() => addToWishlist(product)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
