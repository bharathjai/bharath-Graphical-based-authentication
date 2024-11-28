import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Analytics } from "@vercel/analytics/react";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    {/* Wrapping the app in a container with fade-in animation */}
    <div className="fade-in-container">
      {/* Toast notifications */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        rtl={false} 
        theme="dark"
      />
      {/* Main App Component */}
      <App />
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  </React.StrictMode>
);
