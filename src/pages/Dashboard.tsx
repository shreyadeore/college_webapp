import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import { DashboardStat } from '../types';
import { Calendar, Users, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const stats: DashboardStat[] = [
  { title: 'Active Elections', value: 2, change: 50, icon: 'vote' },
  { title: 'Pending Complaints', value: 15, change: -10, icon: 'message-square' },
  { title: 'Pending Approvals', value: 8, change: 25, icon: 'clipboard-check' },
  { title: 'Budget Utilization', value: 75, change: 15, icon: 'pie-chart' },
];

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handler functions for the buttons
  const handleViewAllClick = () => {
    navigate('/recent-activities'); // Replace '/recent-activities' with the actual route
  };

  const handleViewCalendarClick = () => {
    navigate('/calendar'); // Replace '/calendar' with the actual route
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-lg text-gray-600">Here's what's happening in your college today.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard stat={stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-soft border border-powder-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            <button
              className="text-sm font-medium text-powder-600 hover:text-powder-700"
              onClick={handleViewAllClick} // Added onClick handler
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-start p-4 rounded-xl bg-powder-50">
                <div className="w-10 h-10 rounded-full bg-powder-100 flex items-center justify-center mr-4">
                  {index === 0 && <Calendar className="w-5 h-5 text-powder-600" />}
                  {index === 1 && <Users className="w-5 h-5 text-powder-600" />}
                  {index === 2 && <Bell className="w-5 h-5 text-powder-600" />}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {index === 0 && "New event scheduled: Annual Sports Meet"}
                    {index === 1 && "Student Council meeting at 2 PM"}
                    {index === 2 && "Budget approval request pending"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {index === 0 && "2 hours ago"}
                    {index === 1 && "4 hours ago"}
                    {index === 2 && "6 hours ago"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-soft border border-powder-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <button
              className="text-sm font-medium text-powder-600 hover:text-powder-700"
              onClick={handleViewCalendarClick} // Added onClick handler
            >
              View Calendar
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="p-4 rounded-xl bg-powder-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-powder-600">
                    {index === 0 && "Mar 15"}
                    {index === 1 && "Mar 18"}
                    {index === 2 && "Mar 20"}
                  </span>
                  <span className="text-xs font-medium text-gray-600">
                    {index === 0 && "10:00 AM"}
                    {index === 1 && "2:30 PM"}
                    {index === 2 && "11:00 AM"}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  {index === 0 && "Department Meeting"}
                  {index === 1 && "Student Council Elections"}
                  {index === 2 && "Campus Cleanup Drive"}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
