import React, { useEffect, useCallback, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useCart } from "../CartContext"; // Import the useCart hook
import logo from "../assets/logo.svg";
import { useAuth } from "../AuthContext";
import { useUser } from "../UserContext";
import { useWishlist } from "../WishlistContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, usersignupdata, setUsersignupdata } = useUser();
  const { cartItems } = useCart(); // Get cart items from CartContext
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { filteredDatas = [] } = useCart();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { wishlistItems } = useWishlist();
  const dropdownRef = useRef(null); // Ref for dropdown
  const mobileMenuRef = useRef(null); // Ref for mobile menu

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  }; 

  const handleLogout = () => {
    setUsersignupdata(null);
    setUser(null);
    logout(); // Call logout to reset authentication state
    navigate("/login");
  };

  const filteredData = user
    ? filteredDatas.filter((item) => item.userid === user.id)
    : [];

  const filteredDatawishlist = user
    ? wishlistItems.filter((item) => item.userid === user.id)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white p-4 shadow-md flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <div className="text-green-600 text-2xl font-bold">Grocery Store</div>
        </div>
      </Link>

      <div className="hidden md:flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="border rounded-lg px-4 py-2 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          onClick={handleSearch}
          className="text-green-600 hover:text-green-800"
        >
          <BsSearch size={20} />
        </button>
      </div>

      <div className="hidden md:flex space-x-6 items-center text-green-600">
        <Link to="/" className="hover:text-green-800">
          <FaHome size={22} />
        </Link>
        <Link to="/wishlist" className="relative hover:text-green-800">
          <FaHeart size={22} />
          {filteredDatawishlist.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
              {filteredDatawishlist.length}
            </span>
          )}
        </Link> 
        <Link to="/cart" className="relative hover:text-green-800">
          <FaShoppingCart size={22} />
          {filteredData.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
              {filteredData.length}
            </span>
          )}
        </Link> 

        {user || usersignupdata ? (
          <div ref={dropdownRef} className="relative z-[45]">
            <FaUserCircle
              size={28}
              className="cursor-pointer hover:text-green-800"
              onClick={toggleDropdown}
            />  
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-4">
                <p className="text-gray-700 font-semibold">
                  Username:{" "}
                  {(user?.username || usersignupdata?.username) ?? "Guest"}
                </p> 
                <p className="text-gray-600">
                  Phone:{" "}
                  {(user?.phoneNumber || usersignupdata?.phoneNumber) ?? "N/A"}
                </p>

                <Link to="/myorder">
                  <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    My Order
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="text-green-600 hover:text-green-800">
              Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Login
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-green-600 hover:text-green-800 focus:outline-none"
        >
          <FaBars size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 z-[1] left-0 w-full bg-white shadow-lg md:hidden"
        >
          <div className="flex flex-col items-center space-y-4 p-4">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-4 py-2 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="text-green-600 hover:text-green-800">
              <BsSearch size={20} />
            </button>

            <Link to="/" className="hover:text-green-800" onClick={() => setIsMenuOpen(false)}>
              <FaHome size={22} />
            </Link>
            <Link to="/wishlist" className="hover:text-green-800" onClick={() => setIsMenuOpen(false)}>
              <FaHeart size={22} />
            </Link>
            <Link to="/cart" className="hover:text-green-800" onClick={() => setIsMenuOpen(false)}>
              <FaShoppingCart size={22} />
            </Link>

            {user || usersignupdata ? (
              <>
                <div className="text-green-600">
                  Username:{" "}
                  {(user?.username || usersignupdata?.username) ?? "Guest"}
                </div>

                <Link
                  to="/myorder"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    My Order
                  </button>
                </Link>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-green-600 hover:text-green-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 


// import React, { useEffect, useCallback, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaHeart,
//   FaShoppingCart,
//   FaBars,
//   FaUserCircle,
// } from "react-icons/fa";
// import { BsSearch } from "react-icons/bs";
// import { useCart } from "../CartContext"; // Import the useCart hook
// import logo from "../assets/logo.svg";
// import { useAuth } from "../AuthContext";
// import { useUser } from "../UserContext";
// import { useWishlist } from "../WishlistContext";
// // import axios from "axios";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, setUser, usersignupdata, setUsersignupdata } = useUser();
//   const { cartItems } = useCart(); // Get cart items from CartContext
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const { filteredDatas = [] } = useCart();
//   const [searchQuery, setSearchQuery] = useState(""); // State for search input
//   const { wishlistItems } = useWishlist();
//   // const [data, setData] = useState([]);

//   const toggleDropdown = () => { 
//     setIsOpen(!isOpen);
//   }; 


//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   // const handleLogout = () => {
//   //   setUsersignupdata(null);
//   //   setUser(null);
//   //   navigate('/login');
//   // };

//   const handleLogout = () => {
//     setUsersignupdata(null);
//     setUser(null);
//     logout(); // Call logout to reset authentication state
//     navigate("/login");
//   };

//   const filteredData = user
//     ? filteredDatas.filter((item) => item.userid === user.id)
//     : [];

//   const filteredDatawishlist = user
//     ? wishlistItems.filter((item) => item.userid === user.id)
//     : [];

//   return (
//     <nav className="sticky top-0 z-50 bg-white p-4 shadow-md flex justify-between items-center">
//       <Link to="/">
        
//         <div className=" flex items-center space-x-2">
//           <img src={logo} alt="Logo" className="h-12 w-12" />
//           <div className="text-green-600 text-2xl font-bold">Grocery Store</div>
//         </div>
//       </Link>

//       <div className="hidden md:flex items-center space-x-2">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search"
//           className="border rounded-lg px-4 py-2 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
//         />
//         <button
//           onClick={handleSearch}
//           className="text-green-600 hover:text-green-800"
//         >
//           <BsSearch size={20} />
//         </button>
//       </div>

//       <div className="hidden md:flex space-x-6 items-center text-green-600">
//         <Link to="/" className="hover:text-green-800">
//           <FaHome size={22} />
//         </Link> 
//         <Link to="/wishlist" className="relative hover:text-green-800">
//           <FaHeart size={22} />
//           {filteredDatawishlist.length > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//               {filteredDatawishlist.length}
//             </span>
//           )}
//         </Link>
//         <Link to="/cart" className="relative hover:text-green-800">
//           <FaShoppingCart size={22} />
//           {/* Display cart count */}
//           {filteredData.length > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//               {filteredData.length}
//             </span>
//           )}
//         </Link>

//         {/* Check if user is logged in */}
//         {user || usersignupdata ? (
//           <div className="relative z-[45]">
//             <FaUserCircle
//               size={28}
//               className="cursor-pointer hover:text-green-800"
//               onClick={toggleDropdown}
//             />
//             {isOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-4">
//                 <p className="text-gray-700 font-semibold">
//                   Username:{" "}
//                   {(user?.username || usersignupdata?.username) ?? "Guest"}
//                 </p>
//                 <p className="text-gray-600">
//                   Phone:{" "}
//                   {(user?.phoneNumber || usersignupdata?.phoneNumber) ?? "N/A"}
//                 </p>

//                 <Link to="/myorder">
//                   <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition">
//                     My Order
//                   </button> 
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link to="/signup" className="text-green-600 hover:text-green-800">
//               Register
//             </Link>
//             <Link to="/login">
//               <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
//                 Login
//               </button>
//             </Link>
//           </>
//         )}
//       </div>  

//       <div className="md:hidden">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-green-600 hover:text-green-800 focus:outline-none"
//         >
//           <FaBars size={24} />
//         </button>
//       </div>

//       {isMenuOpen && (
//         <div className="absolute top-16 z-[1] left-0 w-full bg-white shadow-lg md:hidden">
//           <div className="flex flex-col items-center space-y-4 p-4">
//             <input
//               type="text"
//               placeholder="Search"
//               className="border rounded-lg px-4 py-2 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
//             />
//             <button className="text-green-600 hover:text-green-800">
//               <BsSearch size={20} />
//             </button>

//             <Link to="/" className="hover:text-green-800">
//               <FaHome size={22} />
//             </Link>
//             <Link to="/wishlist" className="hover:text-green-800">
//               <FaHeart size={22} />
             
              
//             </Link>
//             <Link to="/cart" className="relative hover:text-green-800">
//               <FaShoppingCart size={22} />
//               {/* Display cart count */}
//               {cartItems.length > 0 && (
//                 <span className="absolute top-0 right-0 bg-red-400 text-white rounded-full text-xs px-1">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>

//             {user || usersignupdata ? (
//               <>
//                 <div className="text-green-600">
//                   Username:{" "}
//                   {(user?.username || usersignupdata?.username) ?? "Guest"}
//                 </div>

//                 <Link to="/myorder">
//                   <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition">
//                     My Order
//                   </button>
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/signup"
//                   className="text-green-600 hover:text-green-800"
//                 >
//                   Register
//                 </Link>
//                 <Link to="/login">
//                   <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
//                     Login
//                   </button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
