import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Moon, Sun, Bell, Save, Globe2, Trash2 } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    password: "",
    theme: localStorage.getItem("theme") || "light",
    notifications: true,
    language: localStorage.getItem("language") || "en", // Default language
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    if (storedProfile) {
      setSettings((prev) => ({ ...prev, ...storedProfile }));
    }

    // Apply theme from localStorage on initial load
    applyTheme(localStorage.getItem("theme") || "light");
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Update localStorage and apply theme whenever settings.theme changes
    localStorage.setItem("theme", settings.theme);
    applyTheme(settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    // Save language to localStorage whenever settings.language changes
    localStorage.setItem("language", settings.language);
  }, [settings.language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const applyTheme = (theme: string) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    setSettings((prev) => ({ ...prev, theme: newTheme }));
  };

  const toggleNotifications = () => {
    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setSettings((prev) => ({ ...prev, language: selectedLanguage }));
  };

  const saveSettings = () => {
    localStorage.setItem("userProfile", JSON.stringify({
      name: settings.name,
      email: settings.email,
      //Do not save password here, if it's necessary save it encrypted/hashed
    }));
    alert("Settings saved successfully!");
  };

  const deleteAccount = () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDeletion) {
      // Add logic to delete the account (API call, etc.)
      localStorage.removeItem("userProfile");
      alert("Account deleted successfully!");
      // Redirect to the login page or another appropriate page
      window.location.href = "/login"; // Replace "/login" with your login route
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Customize your preferences and profile settings.
        </p>
      </motion.div>

      <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <User className="w-6 h-6 mr-2 text-blue-500" /> Profile Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" value={settings.name} onChange={handleChange} placeholder="Full Name" className="border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white p-2 rounded-md" />
          <input type="email" name="email" value={settings.email} onChange={handleChange} placeholder="Email Address" className="border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white p-2 rounded-md" />
          <input type="password" name="password" value={settings.password} onChange={handleChange} placeholder="New Password" className="border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white p-2 rounded-md" />
        </div>
      </motion.div>
      
      <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-blue-500" /> Notifications
        </h2>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" checked={settings.notifications} onChange={toggleNotifications} className="w-5 h-5" />
          <span className="text-gray-900 dark:text-white">{settings.notifications ? "Enabled" : "Disabled"}</span>
        </label>
      </motion.div>

      <motion.div className="text-center">
        <button onClick={saveSettings} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center mx-auto transition-all duration-300">
          <Save className="w-5 h-5 mr-2" /> Save Settings
        </button>
      </motion.div>

      <motion.div className="text-center mt-8">
        <button onClick={deleteAccount} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center mx-auto transition-all duration-300">
          <Trash2 className="w-5 h-5 mr-2" /> Delete Account
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
