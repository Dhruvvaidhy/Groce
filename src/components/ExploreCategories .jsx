import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExploreCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched categories:", data); // Debug log
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []); 

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`); // Redirect to category page
  }; 

  return (
    <div className="mt-10">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center mb-6 md:text-3xl">
        Explore Categories
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            // className={`p-4 rounded-lg text-center w-32 sm:w-40 md:w-48 shadow-lg cursor-pointer hover:shadow-xl transition-shadow  ${category.bgcolor}`}
            className={`p-4 rounded-lg text-center w-32 sm:w-40 md:w-48 shadow-lg cursor-pointer hover:shadow-xl transition-shadow ${category.bgcolor}`}

            onClick={() => handleCategoryClick(category.name)}
          > 
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 md:w-24 md:h-24 object-cover mx-auto mb-3 rounded"
            />
            <h3 className="text-sm md:text-lg font-semibold capitalize">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  ); 
}; 

export default ExploreCategories;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ExploreCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:5000/categories")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []); 

//   const handleCategoryClick = (categoryName) => {
//     navigate(`/category/${encodeURIComponent(categoryName)}`); // Redirect to category page
//   };

//   return (
//     <div className="mt-10">
//       {/* Header */}
//       <h2 className="text-2xl font-semibold text-center mb-6 md:text-3xl">
//         Explore Categories
//       </h2>

//       {/* Categories */}
//       <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//         {categories.map((category) => (
//           <div
//             key={category.id}
//           className={`p-4 rounded-lg text-center w-32 sm:w-40 md:w-48 shadow-lg cursor-pointer hover:shadow-xl transition-shadow bg-white ${category.bgcolor}`}
//             onClick={() => handleCategoryClick(category.name)}
//           >
//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-20 h-20 md:w-24 md:h-24 object-cover mx-auto mb-3 rounded"
//             />
//             <h3 className="text-sm md:text-lg font-semibold capitalize">
//               {category.name}
//             </h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ExploreCategories;





