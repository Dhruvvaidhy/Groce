import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import basketImage from "../assets/basketbg.jpg";
import { useUser } from "../UserContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fetchPhoneNumbers, setFetchPhoneNumbers] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUsersignupdata } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth")
      .then((res) => {
        const numbers = res.data.map((item) => item.phoneNumber);
        setFetchPhoneNumbers(numbers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSignup = async () => {
    if (!username || !phoneNumber || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits long");
      return;
    }

    if (fetchPhoneNumbers && fetchPhoneNumbers.includes(phoneNumber)) {
      setError("Phone number already registered.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth", {
        username,
        phoneNumber,
        password,
      });

      const userData = response.data;
      if (userData) {
        setUsersignupdata(userData);
        navigate("/login");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-full max-w-3xl">
        {/* Basket Image Section */}
        <div className="hidden lg:block lg:w-1/2 bg-green-100 rounded-l-lg">
          <img
            src={basketImage}
            alt="Groceries"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onInput={(e) => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10);
                }
              }}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <button
            onClick={handleSignup}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import basketImage from "../assets/basketbg.jpg";
// import { useUser } from "../UserContext"; 

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [fetchPhoneNumbers, setFetchPhoneNumbers] = useState([]); // Initialize as an array
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { setUsersignupdata } = useUser();
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/auth")
//       .then((res) => {
//         const numbers = res.data.map((item) => item.phoneNumber);
//         setFetchPhoneNumbers(numbers); 
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   console.log("fetchPhoneNumbers", fetchPhoneNumbers); 

//   const handleSignup = async () => {
//     // Validate all fields
//     if (!username || !phoneNumber || !password || !confirmPassword) {
//       setError("All fields are required");
//       return;
//     }

//     // Validate phone number
//     if (phoneNumber.length !== 10) {
//       setError("Phone number must be 10 digits long");
//       return;
//     }

//     // Validate if phone number is already registered
//     if (fetchPhoneNumbers && fetchPhoneNumbers.includes(phoneNumber)) {
//       setError("Phone number already registered.");
//       return;
//     }

//     // Validate password match
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       // Send API request for signup
//       // await axios.post("http://localhost:5000/auth", {
//       //   username,
//       //   phoneNumber,
//       //   password,
//       // });

//       // navigate("/"); // Redirect on successful registration

//       const response = await axios.post("http://localhost:5000/auth", {
//         username,
//         phoneNumber,
//         password,
//       });

//       const userData = response.data;
//       if (userData) {
//         setUsersignupdata(userData); // Save the user data to the context
//         navigate("/login"); // Redirect to home page
//       }
//     } catch (error) {
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
//       <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl">
//         {/* # Grocery Basket Image */}
//         <div className="hidden lg:block lg:w-1/2 bg-green-100 rounded-l-lg">
//           <img
//             src={basketImage}
//             alt="Groceries"
//             className="object-cover w-full h-full"
//           /> 
//         </div>

//         {/* Form */}
//         <div className="w-full lg:w-1/2 p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg w-full"
//             />

//             <input
//               type="number"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               onInput={(e) => {
//                 if (e.target.value.length > 10) {
//                   e.target.value = e.target.value.slice(0, 10);
//                 }
//               }}
//               className="border border-gray-300 p-3 rounded-lg w-full"
//             />

//             <input
//               type="password"
//               placeholder="Create Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg w-full"
//             />

//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg w-full"
//             />
//           </div>

//           {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

//           <button
//             onClick={handleSignup}
//             className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700 transition"
//           >
//             Sign Up
//           </button>

//           <div className="mt-6 text-center">
//             <p>
//               Already have an account?{" "}
//               <Link to="/login" className="text-green-600">
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
