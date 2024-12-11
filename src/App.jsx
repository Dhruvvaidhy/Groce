import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import { LogProvider } from "./LogContext";
import ProtectedRoute from "./ProtectedRoute"; // To protect login/signup from authenticated users
// import AuthenticatedRoute from './AuthenticatedRoute'; // To protect pages that require authentication
import Error from "./components/Error";
import Checkout from "./components/Checkout";
import OrderComplete from "./components/OrderComplete";
import AllDairyProducts from "./components/AllDairyProducts";
import AllProductsPage from "./components/AllProductsPage";
import MyOrders from "./components/MyOrders";
import AllOilGhee from "./components/AllOilGhee";
import AllRiceFlour from "./components/AllRiceFlour";
import AllSnacksBiscuits from "./components/AllSnacksBiscuits";
import AllSpecialMasala from "./components/AllSpecialMasala";
import AllSweetsDryFruits from "./components/AllSweetsDryFruits";
import ExploreCategories from "./components/ExploreCategories ";
import CategoryPage from "./components/CategoryPage";
import SearchResults from "./components/SearchResults";



function App() {
  return (
    <AuthProvider>
      <LogProvider>
      <CartProvider>
        <WishlistProvider>
 

         <Navbar/>
         
          
          <Routes>
            
            {/* Home is accessible to everyone */}
            <Route path="/" element={<Home />} />

            {/* Prevent authenticated users from accessing login/signup */}
            <Route
              path="/signup"
              element={
                <ProtectedRoute>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />

            {/* Only authenticated users can access Cart and Wishlist */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
      
            <Route path="/checkout" element={<Checkout/>} />
            
          

            <Route path="/complete" element={<OrderComplete/>} />
            <Route path="/all" element={<AllDairyProducts/>} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/oilghee" element={<AllOilGhee/>} />
            <Route path="/rice" element={<AllRiceFlour/>} />
            <Route path="/snacks" element={<AllSnacksBiscuits/>}/>
            <Route path="/masala" element={<AllSpecialMasala/>} />
            <Route path="/sweet" element={<AllSweetsDryFruits/>} />
            {/* <Route path="/myorder" element={<MyOrders />} /> */}
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/category" element={<ExploreCategories />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResults />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
      </LogProvider>
    </AuthProvider>
  );
}

export default App;


