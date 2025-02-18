import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Clock, CheckCircle2, XCircle, FileText, Calendar, PenTool as Tool } from 'lucide-react'

interface Approval {
  id: number;
  title: string;
  type: 'event' | 'budget' | 'leave' | 'equipment';
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  department: string;
  date: string;
  description: string;
  amount?: number;
}

const initialApprovals: Approval[] = [
  {
    id: 1,
    title: "Annual Tech Fest Budget",
    type: "budget",
    status: "pending",
    requestedBy: "Tech Club",
    department: "Computer Science",
    date: "2024-03-15",
    description: "Budget request for organizing the annual technology festival including workshops, competitions, and guest lectures.",
    amount: 25000
  },
  {
    id: 2,
    title: "Laboratory Equipment Purchase",
    type: "equipment",
    status: "approved",
    requestedBy: "Dr. Sarah Wilson",
    department: "Physics",
    date: "2024-03-12",
    description: "Request for new spectroscopy equipment for advanced research projects.",
    amount: 15000
  },
  {
    id: 3,
    title: "Cultural Night Event",
    type: "event",
    status: "pending",
    requestedBy: "Cultural Committee",
    department: "Student Affairs",
    date: "2024-03-20",
    description: "Organizing an intercultural evening showcasing diverse traditions and performances."
  }
];

const Approvals = () => {
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false);

  // State for New Request Form
  const [newRequestTitle, setNewRequestTitle] = useState("");
  const [newRequestType, setNewRequestType] = useState<Approval['type']>("event");
  const [newRequestRequestedBy, setNewRequestRequestedBy] = useState("");
  const [newRequestDepartment, setNewRequestDepartment] = useState("");
  const [newRequestDate, setNewRequestDate] = useState("");
  const [newRequestDescription, setNewRequestDescription] = useState("");
  const [newRequestAmount, setNewRequestAmount] = useState<number | undefined>(undefined);

  const openNewRequestModal = () => {
    setNewRequestModalOpen(true);
  };

  const closeNewRequestModal = () => {
    setNewRequestModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewRequestTitle("");
    setNewRequestType("event");
    setNewRequestRequestedBy("");
    setNewRequestDepartment("");
    setNewRequestDate("");
    setNewRequestDescription("");
    setNewRequestAmount(undefined);
  };

  const handleCreateRequest = () => {
    if (!newRequestTitle || !newRequestRequestedBy || !newRequestDepartment || !newRequestDate || !newRequestDescription) {
      alert("Please fill in all required fields.");
      return;
    }

    const newApproval: Approval = {
      id: approvals.length > 0 ? Math.max(...approvals.map(a => a.id)) + 1 : 1, // Generate a new unique ID
      title: newRequestTitle,
      type: newRequestType,
      status: "pending",
      requestedBy: newRequestRequestedBy,
      department: newRequestDepartment,
      date: newRequestDate,
      description: newRequestDescription,
      amount: newRequestAmount,
    };

    setApprovals([...approvals, newApproval]);
    closeNewRequestModal();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'budget':
        return <FileText className="w-5 h-5 text-powder-600" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-powder-600" />;
      case 'equipment':
        return <Tool className="w-5 h-5 text-powder-600" />;
      case 'leave':
        return <Clock className="w-5 h-5 text-powder-600" />;
      default:
        return <FileText className="w-5 h-5 text-powder-600" />;
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Approvals</h1>
            <p className="text-lg text-gray-600">Track and manage approval requests across departments.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-powder-500 text-white rounded-xl font-medium hover:bg-powder-600 transition-colors flex items-center gap-2"
            onClick={openNewRequestModal}
          >
            <ClipboardCheck className="w-4 h-4" />
            New Request
          </motion.button>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 gap-6">
        {approvals.map((approval) => (
          <motion.div
            key={approval.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-soft border border-powder-100 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-powder-50 flex items-center justify-center">
                  {getTypeIcon(approval.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{approval.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{approval.date}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                      {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              {approval.amount && (
                <div className="text-right">
                  <span className="text-sm text-gray-600">Amount</span>
                  <p className="text-xl font-bold text-powder-600">${approval.amount?.toLocaleString()}</p>
                </div>
              )}
            </div>
            <p className="text-gray-700 mb-4">{approval.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Requested by:</span>
                <span className="text-sm font-medium text-powder-600">{approval.requestedBy}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-powder-600">{approval.department}</span>
              </div>
              {approval.status === 'pending' && (
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Request Modal */}
      {newRequestModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                New Approval Request
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Enter the details for the new approval request.
                </p>
              </div>

              {/* Form */}
              <div className="mt-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input
                  type="text"
                  id="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newRequestTitle}
                  onChange={(e) => setNewRequestTitle(e.target.value)}
                />

                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Type:</label>
                <select
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value as Approval['type'])}
                >
                  <option value="event">Event</option>
                  <option value="budget">Budget</option>
                  <option value="leave">Leave</option>
                  <option value="equipment">Equipment</option>
                </select>
                <label htmlFor="requestedBy" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Requested By:</label>
                <input
                  type="text"
                  id="requestedBy"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newRequestRequestedBy}
                  onChange={(e) => setNewRequestRequestedBy(e.target.value)}
                />

                <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Department:</label>
                <input
                  type="text"
                  id="department"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newRequestDepartment}
                  onChange={(e) => setNewRequestDepartment(e.target.value)}
                />

                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Date:</label>
                <input
                  type="date"
                  id="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newRequestDate}
                  onChange={(e) => setNewRequestDate(e.target.value)}
                />

                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Description:</label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newRequestDescription}
                  onChange={(e) => setNewRequestDescription(e.target.value)}
                />

                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Amount (Optional):</label>
                <input
                  type="number"
                  id="amount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newRequestAmount || ''}
                  onChange={(e) => setNewRequestAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                />
              </div>

              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                  onClick={closeNewRequestModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 ml-2 bg-powder-500 text-white rounded-md hover:bg-powder-700 focus:outline-none focus:shadow-outline"
                  onClick={handleCreateRequest}
                >
                  Create Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Approvals;


