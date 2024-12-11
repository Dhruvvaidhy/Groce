
import React from "react";
import ad1 from "../assets/ad1.png"; // Assuming this is the path to the image you uploaded
import ad2 from "../assets/ad2.png"; // Assuming this is the path to the image you uploaded
import adbg from "../assets/adbg.svg";

const posterData = [
  {
    id: 1,
    title: "Free delivery",
    subtitle: "Shop ₹2000 product and get free delivery.",
    buttonText: "Shop Now",
    image: ad1,
    bgColor: "bg-yellow-100",
  },
  {
    id: 2,
    title: "Organic Food",
    subtitle: "Save up to 60% off on your first order.",
    buttonText: "Order Now",
    image: ad2,
    bgColor: "bg-green-100",
  },
];

const Poster = () => {
  return (
    <div className="flex flex-col mt-14 md:flex-row justify-around items-center p-0 space-y-8 md:space-y-0">
      {posterData.map(({ id, title, subtitle, buttonText, image, bgColor }) => (
        <div
          key={id}
          className={`${bgColor} rounded-lg  w-full md:w-1/3 relative text-left shadow-lg`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "contain", // Ensure the image scales properly
            backgroundPosition: "right", // Set to align image to the right
            backgroundRepeat: "no-repeat",
            height: " 227px",
            opacity: "1",
          }}
        >
          <div className="relative z-10 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="mt-4 text-md  text-gray-700">{subtitle}</p>
            <button className="mt-6 bg-green-500 text-white py-3 px-8 rounded-full font-semibold text-sm hover:bg-green-600 transition">
              {buttonText} →
            </button> 
          </div>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${adbg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.3,
            }}
          /> 
          
        </div>
      ))}
    </div>
  );
};

export default Poster;
