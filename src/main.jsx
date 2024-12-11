import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Ensure you have BrowserRouter
import App from './App';
import { WishlistProvider } from './WishlistContext';
import { UserProvider } from './UserContext';
import './index.css' 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter> {/* This is required for useNavigate() */}
    <WishlistProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </WishlistProvider>
  </BrowserRouter>
);






// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css'
// import { UserProvider } from './UserContext';
// import { WishlistProvider } from './WishlistContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <WishlistProvider>
//   <UserProvider>
//     <App />
//   </UserProvider>
//   </WishlistProvider>
// );













// // App.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App'; // Assuming your main app component
// import { UserProvider } from './UserContext'; // Import UserProvider

// ReactDOM.render(
//   <BrowserRouter>
//     <UserProvider>
//       <App />
//     </UserProvider>
//   </BrowserRouter>,
//   document.getElementById('root')
// );















// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
