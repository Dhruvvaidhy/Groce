// Login.js







import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 
import { useUser } from "../UserContext"; // Import the useUser hook
import { useAuth } from '../AuthContext'; // Import the AuthContext 


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser from context
  const { login } = useAuth(); // Access login function from AuthContext 

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth", {
        params: { phoneNumber, password },
      }); 
      const user = response.data.find(
        (user) => user.phoneNumber === phoneNumber && user.password === password
      ); 
      if (user) {
        setUser(user); // Set user data in context
        console.log("user data", user);
        login(); 
        navigate("/"); // Redirect to Home after successful login
      } else {
        setError("Invalid phone number or password.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  }; 
 
  

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }} // use the image generated
    >
      <div className="max-w-md w-full p-8 bg-black bg-opacity-40 rounded-lg shadow-lg">
        <h2
          className="text-3xl font-bold  text-yellow-400 text-center mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Login
        </h2>
      
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
          }
          className="border text-gray-100 bg-transparent p-2 rounded w-full mb-4 focus:ring-2 focus:ring-blue-300"
          maxLength="10"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300  text-gray-100 bg-transparent p-2 rounded w-full mb-4 focus:ring-2 focus:ring-blue-300"
          required
        />
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded w-full hover:bg-gradient-to-l"
        >
          Login
        </button>
        {error && <p className="text-gray-900 mt-2">{error}</p>}
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-100">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios"; // Import axios for API calls
// import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [userdata, setUserdata] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize navigate

//   const handleLogin = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/auth", {               
//         params: { phoneNumber, password },
//       });
//       const user = response.data.find(
//         (user) => user.phoneNumber === phoneNumber && user.password === password
//       );
//         setUserdata(user)
//       if (user) {
//         console.log("user data" , userdata);
//         navigate("/"); // Redirect to Home after successful login
//       } else {
//         setError("Invalid phone number or password.");
//       }
//     } catch (error) {
//       setError("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex-col items-center justify-center m-6  max-w-md mx-auto p-6 bg-red-400 rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <input
//   type="text"
//   placeholder="Phone Number"
//   value={phoneNumber}
//   onChange={(e) => setPhoneNumber(e.target.value.replace("0,1,2,3,4,5,6,7,8,9"))} // Ensure only digits
//   onInput={(e) => {
//     if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
//   }} // Limit input to 10 digits
//   className="border border-gray-300 p-2 rounded w-full mb-4"
//   maxLength="10"
// />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border border-gray-300 p-2 rounded w-full mb-4"
//       />
//       <button
//         onClick={handleLogin}
//         className="bg-blue-300 text-white px-4 py-2 rounded w-full"
//       >
//         Login
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       {/* Link to Signup */}
//       <div className="mt-4 text-center">
//         <p>
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-900">
//             Sign up here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

