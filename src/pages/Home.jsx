import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ExploreCategories from "../components/ExploreCategories ";
import Footer from "../components/Footer";
import Adds from "../components/Adds";
import Poster from "../components/Poster";
// import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import DairyProducts from "../components/DairyProducts";
import SnacksBiscuits from "../components/SnacksBiscuits";
import SweetsDryFruits from "../components/SweetsDryFruits";
import RiceFlour from "../components/RiceFlour";
import SpecialMasala from "../components/SpecialMasala";
import OilGhee from "../components/OilGhee";

const Home = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  

 

  // Fetch products from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/products") // URL of the json-server API
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the product data:", error);
      });
  }, []);




  return (
  <>
 
    <div className="min-h-screen bg-[#faf8f8] p-4 mb-4">
      {/* Banner Section */} 
      <Banner/>
      
      <ExploreCategories/>
      <Poster />
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
        
          <ProductCard />
          <DairyProducts  />
          <SnacksBiscuits  />
          <SweetsDryFruits  />
          <RiceFlour  /> 
          <SpecialMasala  />
          <OilGhee  /> 

        
      
  
      <Adds/>
      <Footer/>
    </div>
    </>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";
// import bannerbg from "../assets/banner.svg";
// import heroimg from "../assets/Hero.svg";
// import ExploreCategories from "../components/ExploreCategories ";
// import Footer from "../components/Footer";
// import Adds from "../components/Adds";
// import Poster from "../components/Poster";
// import { LuSend } from "react-icons/lu";
// import Navbar from "../components/Navbar";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   // const [searchQuery, setSearchQuery] = useState("");
//   const [cartCount, setCartCount] = useState(0); // For cart count
//   const [wishlistCount, setWishlistCount] = useState(0); // For wishlist count

//   // Fetch products from the API
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/products") // URL of the json-server API
//       .then((response) => {
//         setProducts(response.data);
//       }) 
//       .catch((error) => {
//         console.error("Error fetching the product data:", error);
//       });
//   }, []);

//   return (
//     <>
//     <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
//     <div className="min-h-screen bg-[#faf8f8] p-4 mb-4">
//       {/* Banner Section */}
//       <div className="relative w-full h-[300px] sm:h-[400px] bg-[#ceeae2] rounded-lg mb-8">
//         <img
//           src={bannerbg}
//           alt="Grocery banner"
//           className="absolute inset-0 w-full h-full object-cover opacity-[0.2]"
//         />
//         {/* Top-right Image */}
//         {/* <div className="absolute top-0 right-0 z-10 m-0 hidden sm:block">
//           <img
//             src={heroimg} // Replace with the actual image URL
//             alt="Promotional Item"
//             className="h-[15rem] w-[20rem] sm:h-[25rem] sm:w-[38rem] object-cover"
//           />
//         </div> */}
//         {/* Top-right Image */}
// <div className="absolute top-0 right-0 z-10 m-0">
//   <img
//     src={heroimg} // Replace with the actual image URL
//     alt="Promotional Item"
//     className="
//       h-[10rem] w-[15rem] 
//       sm:h-[15rem] sm:w-[20rem] 
//       md:h-[20rem] md:w-[30rem] 
//       lg:h-[25rem] lg:w-[38rem] 
//       object-cover
//       block"
//   />
// </div>

//         <h1 className="flex py-12 sm:py-24 px-4 sm:pl-24 text-wrap text-white text-2xl sm:text-4xl font-bold">
//           Fresh Groceries Delivered To Your Doorstep
//         </h1>
//         {/* Search Bar */}
//         {/* <div className="flex absolute top-[60%] left-[5%] sm:top-[50%] sm:left-[10%] w-full sm:w-auto pr-4">
//           <input
//             type="text"
//             placeholder="Search" 
//             className="w-full sm:w-auto px-4 py-2 rounded-lg text-lg bg-white"
//           />
         
//           <button className="bg-gray-50 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 ml-2">
//             Subscribe
//           </button>
//         </div> */}
// <div className="flex items-center z-10 mx-4 sm:mx-8 lg:mx-24 space-x-2 bg-white p-2 rounded-full shadow-lg w-full max-w-md">
//       {/* Icon for email input */}
//       <div className="flex items-center px-2">
//         <LuSend className="text-gray-400" />
//       </div>

//       {/* Input for email address */}
//       <input
//         type="email"
//         placeholder="Enter your email address"
//         className="flex-grow px-4 py-2 text-sm sm:text-lg border-none focus:outline-none"
//       />

//       {/* Subscribe button */}
//       <button className="bg-green-500 text-white px-4 py-2 text-sm sm:text-lg rounded-full font-semibold hover:bg-green-600 transition">
//         Subscribe
//       </button>
//       </div>
//       </div>

//       <Poster />

//       {/* Explore Categories */}
//       <ExploreCategories />

//       {/* Products Section */}
   
        
//       <ProductCard  updateWishlistCount={setWishlistCount} />
         

//       {/* Advertisement Section */}
//       <Adds />

//       {/* Footer Section */}
//       <Footer />
//     </div>
//     </>
//   );
// };

// export default Home;

