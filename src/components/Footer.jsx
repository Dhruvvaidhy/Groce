import React from "react";
import {
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCopyright,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Brand Info */}
          <div className="flex-col mr-6">
            <h2 className="text-lg font-bold text-green-500 mb-2">Groceyish</h2>
            <p className="text-gray-300 flex items-center">
              <Link
               target="_blank"
                to="https://maps.app.goo.gl/ChAMBE9iDo8Kd7CQ9"
                className="mr-[10px] flex items-center"
              >
                {/* <a href="" target="_blank" rel="noopener noreferrer"/> */}
                <FaMapMarkerAlt className="mr-2" />
                <span>
                  <strong>Address :</strong> 801, Silver Trade Center, Surat
                </span>
              </Link>
            </p>
            <br />
            <p className="text-gray-300 flex items-center">
              <div className="mr-[10px]">
                <FaPhoneAlt className="mr-2" />
              </div>
              <span>
                <strong>Call Us :</strong> 9313292974
              </span>
            </p>
            <br />
            <p className="text-gray-300 flex items-center">
              <div className="mr-[10px]">
                <FaEnvelope className="mr-2" />
              </div>
              <span>
                <strong>Email :</strong> dhulu786@gmail.com
              </span>
            </p>
            <br />
            <p className="text-gray-300 flex items-center">
              <div className="mr-[10px]">
                <FaClock className="mr-2" />
              </div>
              <span>
                <strong>Work hours :</strong> 09:30 - 6:30, Monday - Saturday
              </span>
            </p>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/wishlist" className="hover:text-green-500">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-green-500">
                  Cart
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Shipping Details
                </a>
              </li> 
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Useful Links
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-green-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Hot Deals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Promotions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  New Products
                </a>
              </li>
            </ul>
          </div>    

          {/* Help Center */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Help Center
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-green-500">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Refund
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Checkout
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Q&A
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 flex items-center gap-1">
            <FaCopyright className="text-gray-400" /> 2024, All rights reserved
          </p>

          {/* Payment Icons */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://img.icons8.com/color/48/000000/mastercard.png"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://img.icons8.com/color/48/000000/maestro.png"
              alt="Maestro"
              className="h-6"
            />
            <img
              src="https://img.icons8.com/color/48/000000/amex.png"
              alt="Amex"
              className="h-6"
            />
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 sm:mt-0">

            <a href="https://www.youtube.com/@RockyGaming_23" target="_blank" className="text-gray-500 hover:text-red-600">
              <FaYoutube  className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-800">
              <FaFacebookSquare className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/dhruv-vaidhy-4230552b7/" target="_blank" className="text-gray-500 hover:text-blue-700">
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-800">
              <FaSquareInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
