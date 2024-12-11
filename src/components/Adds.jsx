import React from 'react';
import bg from '../assets/adbg.svg';
import appPoster from '../assets/App.svg'; // Phone image (adjust path as per your project)
import appstore from '../assets/image 13.svg'; // App Store Badge (add image in assets folder)
import playstore from '../assets/image 14.svg'; // Play Store Badge (add image in assets folder)

const Adds = () => {
  return (
    <div className="relative bg-[#daf0ea] mt-3 py-10">
      {/* Background pattern image */}
      <div
        className="absolute inset-0 opacity-[0.2] bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center text-center md:flex-row md:justify-between md:text-left">
        
        {/* Text section */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:text-3xl md:text-4xl">
            Shop Faster With Groceryish App
          </h2>
          <p className="text-base text-gray-600 mb-6 sm:text-lg">
            Available on both iOS & Android
          </p>

          {/* App store buttons */}
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://apps.apple.com" target="_blank">
              <img src={appstore} alt="Download on App Store" className="w-28 sm:w-32 md:w-40" />
            </a>
            <a href="https://play.google.com" target="_blank">
              <img src={playstore} alt="Get it on Google Play" className="w-28 sm:w-32 md:w-40" />
            </a>
          </div>
        </div>

        {/* Phone image */}
        <div className="mt-4 md:mt-0 md:w-1/2 flex justify-center">
          <img src={appPoster} alt="Groceryish App Phone" className="w-[200px] sm:w-[300px] md:w-[400px] h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Adds;

