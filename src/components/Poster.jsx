
// import React from "react";
// import ad1 from "../assets/ad1.png"; // Assuming this is the path to the image you uploaded
// import ad2 from "../assets/ad2.png"; // Assuming this is the path to the image you uploaded
// import adbg from "../assets/adbg.svg";

// const posterData = [
//   {
//     id: 1,
//     title: "Free delivery",
//     subtitle: "Shop ₹2000 product and get free delivery.",
//     buttonText: "Shop Now",
//     image: ad1,
//     bgColor: "bg-yellow-100",
//   },
//   {
//     id: 2,
//     title: "Organic Food",
//     subtitle: "Save up to 60% off on your first order.",
//     buttonText: "Order Now",
//     image: ad2,
//     bgColor: "bg-green-100",
//   },
// ];

// const Poster = () => {
//   return (
//     <div className="flex flex-col mt-14 md:flex-row justify-around items-center p-0 space-y-8 md:space-y-0">
//       {posterData.map(({ id, title, subtitle, buttonText, image, bgColor }) => (
//         <div
//           key={id}
//           className={`${bgColor} rounded-lg  w-full md:w-1/3 relative text-left shadow-lg`}
//           style={{
//             backgroundImage: `url(${image})`,
//             backgroundSize: "contain", // Ensure the image scales properly
//             backgroundPosition: "right", // Set to align image to the right
//             backgroundRepeat: "no-repeat",
//             height: " 227px",
//             opacity: "1",
//           }}
//         >
//           <div className="relative z-10 p-6 rounded-lg">
//             <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
//             <p className="mt-4 text-md  text-gray-700">{subtitle}</p>
//             <button className="mt-6 bg-green-500 text-white py-3 px-8 rounded-full font-semibold text-sm hover:bg-green-600 transition">
//               {buttonText} →
//             </button> 
//           </div>
//           <div
//             className="absolute inset-0 z-0"
//             style={{
//               backgroundImage: `url(${adbg})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               opacity: 0.3,
//             }}
//           /> 
          
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Poster;




// import React from "react";
// import ad1 from "../assets/ad1.png";
// import ad2 from "../assets/ad2.png";
// import adbg from "../assets/adbg.svg";
 
// const posters = [
//   {
//     id: 1,
//     title: "Free delivery over $50",
//     subtitle: "Shop $50 product and get free delivery anywhere.",
//     buttonText: "Shop Now",
//     image: ad1,
//     bgColor: "bg-yellow-100",
//   },
//   {
//     id: 2,
//     title: "Organic Food",
//     subtitle: "Save up to 60% off on your first order",
//     buttonText: "Order Now",
//     image: ad2,
//     bgColor: "bg-green-100",
//   },
// ];

// const PosterPage = () => {
//   return (
//     <div className="flex flex-wrap gap-6 justify-center items-center py-10">
//       {posters.map((poster) => (
//         <div
//           key={poster.id}
//           className={`relative rounded-xl shadow-lg overflow-hidden ${poster.bgColor} w-full sm:w-[45%] max-w-md`}
//         >
//           <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${adbg})` }}></div>
//           <div className="p-6 flex flex-col items-start">
//             <span className="inline-block bg-orange-300 text-orange-800 text-sm font-semibold px-2 py-1 rounded mb-2">
//               {poster.id === 1 ? "Free delivery" : "60% off"}
//             </span> 
//             <h2 className="text-xl font-bold text-gray-800 mb-2">{poster.title}</h2>
//             <p className="text-gray-600 mb-4">{poster.subtitle}</p>
//             <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
//               {poster.buttonText}
//             </button>
//           </div>
//           <div className=" bottom-0 right-0">
//           <img
//             src={poster.image}
//             alt={poster.title}
//             className="w-48 h-36  object-contain absolute"
//            />
//           </div> 
//         </div>
//       ))}
//     </div>
//   );
// }; 

// export default PosterPage;

import React from "react";
import ad1 from "../assets/ad1.png";
import ad2 from "../assets/ad2.png";
import adbg from "../assets/adbg.svg";

const posters = [
  {
    id: 1,
    title: "Free delivery over $50",
    subtitle: "Shop $50 product and get free delivery anywhere.",
    buttonText: "Shop Now",
    image: ad1,
    bgColor: "bg-yellow-100",
  },
  {
    id: 2,
    title: "Organic Food",
    subtitle: "Save up to 60% off on your first order",
    buttonText: "Order Now",
    image: ad2,
    bgColor: "bg-green-100",
  },
];

const PosterPage = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center items-center py-10">
      {posters.map((poster) => (
        <div
          key={poster.id}
          className={`relative rounded-xl shadow-lg overflow-hidden ${poster.bgColor} w-full sm:w-[45%] max-w-md`}
        >
          {/* Main background overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${adbg})` }}
          ></div>

          {/* Poster image as background */}
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-right opacity-[0.8]"
            style={{ backgroundImage: `url(${poster.image})` }}
          ></div>

          {/* Content on top */}
          <div className="relative p-6 flex flex-col items-start z-10">
            <span className="inline-block bg-orange-300 text-orange-800 text-sm font-semibold px-2 py-1 rounded mb-2">
              {poster.id === 1 ? "Free delivery" : "60% off"}
            </span>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{poster.title}</h2>
            <p className="text-gray-600 mb-4">{poster.subtitle}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              {poster.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PosterPage;
