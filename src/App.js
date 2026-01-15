import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components & Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";

// Helper component to manage browser tab titles dynamically
function TitleHandler() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home | Market Station",
      "/marketplace": "Explore Presets",
      "/upload": "Upload New Preset",
      "/profile": "My Profile",
      "/login": "Sign In",
      "/register": "Create Account",
    };
    // Update document title based on current path, or use a default
    document.title = titles[location.pathname] || " Market Station";
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleHandler />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnHover
          theme="light"
        />

        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Catch-all route for 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="text-center py-20">404 - Page Not Found</div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
