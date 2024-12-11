import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ban1 from "../assets/ban1.jpg";
import ban3 from "../assets/bannner.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required Swiper modules
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";

export default function Banner() {
  return (
    <div className="overflow-hidden w-full bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        keyboard={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2000}
        className="h-full banner"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <img
            src={ban1}
            alt="Banner 1"
            className="responsive-img"
          />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <img
            src="https://www.sweetnspice.in/web/image/homepagepreferences.websitemaincarousel/5/carousel"
            alt="Banner 3"
            className="responsive-img"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}




// import React from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import ban1 from "../assets/ban1.jpg";
// import ban3 from "../assets/ban3.jpg";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // Import required Swiper modules
// import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";

// export default function Banner() {
//   return (
//     <div className="overflow-hidden w-full bg-gray-100">
//       <Swiper
//         modules={[Navigation, Pagination, Keyboard, Autoplay]}
//         navigation={true}
//         pagination={{ clickable: true }}
//         keyboard={true}
//         loop={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}  
//         speed={2000}
//         className="h-full"
//      >  
//         {/* Slide 1 */} 
//         <SwiperSlide className="flex justify-center items-center bg-white">
//           <img
//             src={ban1}
//             alt="Banner 1"
//             className="w-full h-[600px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
//           />   
//         </SwiperSlide>    
        
//         {/* Slide 2 */} 
//         <SwiperSlide className="flex justify-center items-center bg-white">
//           <img
//             src={ban3}
//             alt="Banner 3"
//             className="w-full h-[600px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
//           />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   ); 
// }







