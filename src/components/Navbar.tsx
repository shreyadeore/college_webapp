import React, { useState, createContext, useContext } from "react";
import { Bell, Moon, Sun, User, Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Create User Context
export const UserContext = createContext(null);

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // User Data (Mock Data)
  const user = {
    name: "Shreya Deore",
    role: "Student",
    id: "STU98765",
    degree: "B.Tech",
    department: "Computer Science",
  };

  return (
    <UserContext.Provider value={user}>
      <nav className="bg-white border-b border-powder-100 fixed w-full z-30 top-0 shadow-soft">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center justify-start space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-powder-600 to-powder-400 bg-clip-text text-transparent">
                College Management
              </h1>
              <div className="hidden md:flex items-center bg-powder-50 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-powder-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm text-powder-800 placeholder-powder-400"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-powder-50 text-powder-600"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Notification Bell */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-powder-50 text-powder-600 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              {/* Profile Section */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-powder-50 rounded-full px-3 py-1.5 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-powder-200 flex items-center justify-center">
                    <User className="w-4 h-4 text-powder-600" />
                  </div>
                  <span className="text-sm font-medium text-powder-800">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-powder-600" />
                </motion.div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50"
                  >
                    <p className="font-bold text-lg">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.role}</p>
                    <p className="text-sm">ID: {user.id}</p>
                    <p className="text-sm">Degree: {user.degree}</p>
                    <p className="text-sm">Department: {user.department}</p>

                    <button
                      onClick={() => navigate("/settings")}
                      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                    >
                      Go to Settings
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </UserContext.Provider>
  );
};

export default Navbar;
