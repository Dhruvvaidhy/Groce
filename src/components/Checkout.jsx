import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

export default function Checkout() {
  const { filteredDatas , getCartItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  }); 
  const { clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ address: "" });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  }); 

  // Calculate filtered items based on the user and valid quantity
  const filteredData = user
    ? filteredDatas.filter((item) => item.userid === user.id && item.quantity > 0)
    : [];

  const handleBillingChange = (e) =>
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  const handleShippingChange = (e) =>
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  const calculateTotal = () => {
    return filteredDatas
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    getCartItems()
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted")

    // Validate each required field according to specified requirements
    const phoneValid = /^\d{10}$/.test(billingInfo.phone);
    const cardNumberValid = /^\d{16}$/.test(paymentInfo.cardNumber);
    const expiryDateValid = /^(0[1-9]|1[0-2])\/(2[6-9]|3[0-9])$/.test(
      paymentInfo.expiryDate
    );
    const cvvValid = /^\d{3}$/.test(paymentInfo.cvv);

    // Ensure there are no empty fields or invalid input
    if (
      billingInfo.name &&
      billingInfo.email &&
      billingInfo.phone &&
      billingInfo.address &&
      shippingInfo.address &&
      paymentInfo.cardNumber &&
      paymentInfo.expiryDate &&
      paymentInfo.cvv &&
      phoneValid &&
      cardNumberValid &&
      expiryDateValid &&
      cvvValid
    ) {
      if (filteredData.length > 0) {
        const order = {
          id: Math.random().toString(36).substring(2, 10),
          items: filteredData,
          userid: user.id,
          total: calculateTotal(),
          date: new Date().toISOString(),
        };
      
        console.log("Order created successfully:", {
          order,
          billingInfo, 
          shippingInfo,
          paymentInfo,
        });
      
        clearCart();
        navigate("/complete");
      } else {
        console.error("No valid items found, order was not created.");
      }
    } else {
      alert("Please fill in all required fields with valid information.");
    }
  };

  return (
    <section className="h-full bg-gray-100 py-10">
      <div className="container mx-auto px-5 md:flex md:space-x-6">
        {/* Order Summary Section */} 
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul className="space-y-3">
            {filteredData.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="flex justify-between border-t pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{calculateTotal()}</span>
            </li>
          </ul>
        </div> 

        {/* Checkout Form Section */}
        <form
          onSubmit={handleSubmit} // Attach handleSubmit to the form submission event
          className="bg-white rounded-lg shadow-md p-6 mt-6 md:mt-0 w-full md:w-2/3"
        >
          {/* Billing Information */}
          <h2 className="text-xl font-bold mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={billingInfo.name}
                onChange={handleBillingChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={billingInfo.email}
                onChange={handleBillingChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={billingInfo.phone}
                onChange={handleBillingChange}
                className="w-full p-2 border rounded"
                maxLength="10"
                required
                title="Please enter a 10-digit phone number"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-700">Billing Address</label>
              <input
                type="text"
                name="address"
                value={billingInfo.address}
                onChange={handleBillingChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Shipping Information */}
          <h2 className="text-xl font-bold mt-6 mb-4">Shipping Information</h2>
          <div>
            <label className="block text-gray-700">Shipping Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Payment Information */}
          <h2 className="text-xl font-bold mt-6 mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                className="w-full p-2 border rounded"
                maxLength="16"
                required
                pattern="\d{16}"
                title="Please enter a 16-digit card number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
                className="w-full p-2 border rounded"
                placeholder="MM/YY"
                required
                pattern="(0[1-9]|1[0-2])\/(2[6-9]|3[0-9])"
                title="Enter a valid expiry date in MM/YY format between 26 and 39"
              />
            </div>
            <div>
              <label className="block text-gray-700">CVV</label>
              <input
                type="password"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                className="w-full p-2 border rounded"
                maxLength="3"
                required
                pattern="\d{3}"
                title="Please enter a 3-digit CVV"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-6"
          >
            Complete Order
          </button>
        </form>
      </div>
    </section>
  );
}


// import React, { useState } from "react";
// import { useCart } from "../CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cartItems } = useCart();
//   const navigate = useNavigate();
//   const [billingInfo, setBillingInfo] = useState({ name: "", email: "", address: "" });
//   const [shippingInfo, setShippingInfo] = useState({ address: "" });
//   const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", expiryDate: "", cvv: "" });

//   const handleBillingChange = (e) => setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
//   const handleShippingChange = (e) => setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
//   const handlePaymentChange = (e) => setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

//   const calculateTotal = () => {
//     return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Checkout info:", { billingInfo, shippingInfo, paymentInfo });
//   };

//   return (
//     <section className="h-full bg-gray-100 py-10">
//       <div className="container mx-auto px-5 md:flex md:space-x-6">

//         {/* Order Summary Section */}
//         <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           <ul className="space-y-3">
//             {cartItems.map((item) => (
//               <li key={item.id} className="flex justify-between">
//                 <span>{item.name} (x{item.quantity})</span>
//                 <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//             <li className="flex justify-between border-t pt-2">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">₹{calculateTotal()}</span>
//             </li>
//           </ul>
//         </div>

//         {/* Checkout Form Section */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mt-6 md:mt-0 w-full md:w-2/3">

//           {/* Billing Information */}
//           <h2 className="text-xl font-bold mb-4">Billing Information</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={billingInfo.name}
//                 onChange={handleBillingChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={billingInfo.email}
//                 onChange={handleBillingChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-gray-700">Billing Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={billingInfo.address}
//                 onChange={handleBillingChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>

//           {/* Shipping Information */}
//           <h2 className="text-xl font-bold mt-6 mb-4">Shipping Information</h2>
//           <div>
//             <label className="block text-gray-700">Shipping Address</label>
//             <input
//               type="text"
//               name="address"
//               value={shippingInfo.address}
//               onChange={handleShippingChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           {/* Payment Information */}
//           <h2 className="text-xl font-bold mt-6 mb-4">Payment Information</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700">Card Number</label>
//               <input
//                 type="number"
//                 name="cardNumber"
//                 value={paymentInfo.cardNumber}
//                 onChange={handlePaymentChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Expiry Date</label>
//               <input
//                 type="text"
//                 name="expiryDate"
//                 value={paymentInfo.expiryDate}
//                 onChange={handlePaymentChange}
//                 className="w-full p-2 border rounded"
//                 placeholder="MM/YY"
//                 required
//               />

//             </div>
//             <div>
//               <label className="block text-gray-700">CVV</label>
//               <input
//                 type="password"
//                 name="cvv"
//                 value={paymentInfo.cvv}
//                 onChange={handlePaymentChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             onClick={() => navigate("/complete")}
//             className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-6"
//           >
//             Complete Order
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

