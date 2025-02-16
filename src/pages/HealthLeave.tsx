import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, CalendarCheck, PlusCircle } from "lucide-react";

// Initial Data for Health & Leave
const initialHealthData = [
  { date: "2025-02-10", description: "Routine Checkup", doctor: "Dr. Mehta", status: "Completed" },
  { date: "2025-01-28", description: "Fever & Cold", doctor: "Dr. Joshi", status: "Prescribed Medicine" },
];

const initialLeaveData = [
  { date: "2025-02-18", reason: "Personal Work", duration: "2 Days", status: "Pending" },
  { date: "2025-02-05", reason: "Health Issues", duration: "1 Day", status: "Approved" },
];

const HealthLeave = () => {
  const [healthData, setHealthData] = useState(initialHealthData);
  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [newHealth, setNewHealth] = useState({ date: "", description: "", doctor: "", status: "" });
  const [newLeave, setNewLeave] = useState({ date: "", reason: "", duration: "", status: "Pending" });

  // Handle Input Change
  const handleHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHealth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLeaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add New Health Record
  const addHealthEntry = () => {
    if (!newHealth.date || !newHealth.description || !newHealth.doctor) {
      alert("Please fill in all fields for Health Entry.");
      return;
    }

    setHealthData([...healthData, newHealth]);
    setNewHealth({ date: "", description: "", doctor: "", status: "" });
  };

  // Add New Leave Request
  const addLeaveEntry = () => {
    if (!newLeave.date || !newLeave.reason || !newLeave.duration) {
      alert("Please fill in all fields for Leave Request.");
      return;
    }

    setLeaveData([...leaveData, newLeave]);
    setNewLeave({ date: "", reason: "", duration: "", status: "Pending" });
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      {/* Page Title */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Health & Leave Management</h1>
        <p className="text-lg text-gray-600">Track your health records and leave requests efficiently.</p>
      </motion.div>

      {/* Health & Leave Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div className="p-6 rounded-2xl shadow-soft bg-green-100 text-green-600 flex items-center">
          <HeartPulse className="w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Total Health Records</h2>
            <p className="text-lg">{healthData.length}</p>
          </div>
        </motion.div>
        <motion.div className="p-6 rounded-2xl shadow-soft bg-blue-100 text-blue-600 flex items-center">
          <CalendarCheck className="w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Total Leave Requests</h2>
            <p className="text-lg">{leaveData.length}</p>
          </div>
        </motion.div>
      </div>

      {/* Health Records Table */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-soft border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Health Records</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Doctor</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {healthData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">{item.doctor}</td>
                <td className="py-2 px-4">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Leave Requests Table */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-soft border mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Leave Requests</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Reason</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.reason}</td>
                <td className="py-2 px-4">{item.duration}</td>
                <td className="py-2 px-4">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Add New Health Record */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-soft border mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add Health Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="date" name="date" value={newHealth.date} onChange={handleHealthChange} className="border p-2 rounded-md" />
          <input type="text" name="description" placeholder="Description" value={newHealth.description} onChange={handleHealthChange} className="border p-2 rounded-md" />
          <input type="text" name="doctor" placeholder="Doctor Name" value={newHealth.doctor} onChange={handleHealthChange} className="border p-2 rounded-md" />
          <button onClick={addHealthEntry} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusCircle className="w-5 h-5 mr-2" /> Add Health Record
          </button>
        </div>
      </motion.div>

      {/* Add New Leave Request */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-soft border mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Request Leave</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="date" name="date" value={newLeave.date} onChange={handleLeaveChange} className="border p-2 rounded-md" />
          <input type="text" name="reason" placeholder="Reason" value={newLeave.reason} onChange={handleLeaveChange} className="border p-2 rounded-md" />
          <input type="text" name="duration" placeholder="Duration" value={newLeave.duration} onChange={handleLeaveChange} className="border p-2 rounded-md" />
          <button onClick={addLeaveEntry} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusCircle className="w-5 h-5 mr-2" /> Request Leave
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthLeave;
