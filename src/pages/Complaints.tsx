import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Filter, Send, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Complaint {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  date: string;
  isAnonymous: boolean;
}

const complaints: Complaint[] = [
  {
    id: 1,
    title: "Wi-Fi Connectivity Issues in Library",
    description: "The Wi-Fi connection in the library has been unstable for the past week, making it difficult to access online resources.",
    category: "Infrastructure",
    status: "in-progress",
    priority: "high",
    date: "2024-03-10",
    isAnonymous: false
  },
  {
    id: 2,
    title: "Cafeteria Food Quality Concern",
    description: "Recent decline in food quality and variety in the college cafeteria.",
    category: "Facilities",
    status: "pending",
    priority: "medium",
    date: "2024-03-12",
    isAnonymous: true
  },
  {
    id: 3,
    title: "Laboratory Equipment Maintenance",
    description: "Several microscopes in the biology lab need immediate maintenance.",
    category: "Academic",
    status: "resolved",
    priority: "high",
    date: "2024-03-08",
    isAnonymous: false
  }
];

const categories = ["All", "Infrastructure", "Academic", "Facilities", "Administration"];
const priorities = ["All", "High", "Medium", "Low"];
const statuses = ["All", "Pending", "In Progress", "Resolved"];

const Complaints = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'resolved':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Complaints Portal</h1>
            <p className="text-lg text-gray-600">Submit and track complaints to improve our college.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSubmitting(true)}
            className="px-4 py-2 bg-powder-500 text-white rounded-xl font-medium hover:bg-powder-600 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            New Complaint
          </motion.button>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-powder-50 px-4 py-2 rounded-xl">
            <Filter className="w-4 h-4 text-powder-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-sm font-medium text-powder-800 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-powder-50 px-4 py-2 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-powder-600" />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-transparent text-sm font-medium text-powder-800 focus:outline-none"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-powder-50 px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-powder-600" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-sm font-medium text-powder-800 focus:outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {complaints.map((complaint) => (
          <motion.div
            key={complaint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-soft border border-powder-100 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{complaint.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{complaint.date}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              {complaint.isAnonymous && (
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Anonymous
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{complaint.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-powder-600 bg-powder-50 px-3 py-1 rounded-full">
                {complaint.category}
              </span>
              <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-powder-600 hover:text-powder-700">View Details</button>
                {complaint.status !== 'resolved' && (
                  <button className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit New Complaint</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-powder-100 focus:outline-none focus:ring-2 focus:ring-powder-500"
                  placeholder="Enter complaint title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 rounded-xl border border-powder-100 focus:outline-none focus:ring-2 focus:ring-powder-500 h-32"
                  placeholder="Describe your complaint in detail"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-powder-100 focus:outline-none focus:ring-2 focus:ring-powder-500">
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-powder-100 focus:outline-none focus:ring-2 focus:ring-powder-500">
                    {priorities.slice(1).map((priority) => (
                      <option key={priority} value={priority.toLowerCase()}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="anonymous" className="rounded text-powder-500 focus:ring-powder-500" />
                <label htmlFor="anonymous" className="text-sm text-gray-700">Submit anonymously</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsSubmitting(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-powder-500 text-white rounded-xl font-medium hover:bg-powder-600 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Complaint
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Complaints;