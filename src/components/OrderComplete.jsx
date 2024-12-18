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
