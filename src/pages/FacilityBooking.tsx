import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, PlusCircle, Upload } from "lucide-react";

interface BudgetEntry {
  category: string;
  amount: number;
  date: string;
  notes: string;
  receipts?: string[]; // URLs of uploaded receipts
  status?: 'pending' | 'approved' | 'rejected'; // Approval status
  approverRole?: 'faculty' | 'incharge' | null;
}

// Initial Budget Data (Simulating Budget.tsv)
const initialBudgetData: BudgetEntry[] = [
  { category: "Rent", amount: 10000, date: "2025-02-15", notes: "Monthly rent", status: 'approved' },
  { category: "Groceries", amount: 5000, date: "2025-02-14", notes: "Weekly groceries", status: 'approved' },
  { category: "Utilities", amount: 3000, date: "2025-02-10", notes: "Electricity & water bills", status: 'approved' },
];

const Budget = () => {
  const [budgetData, setBudgetData] = useState(initialBudgetData);
  const [newEntry, setNewEntry] = useState({ category: "", amount: "", date: "", notes: "" });
  const [receipts, setReceipts] = useState<File[]>([]); // State for uploaded receipts in the form
  const [newEntryStatus, setNewEntryStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [newEntryApproverRole, setNewEntryApproverRole] = useState<'faculty' | 'incharge'>('faculty');

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReceipts(Array.from(e.target.files));
    }
  };


  // Add New Budget Entry
  const addBudgetEntry = async () => {
    if (!newEntry.category || !newEntry.amount || !newEntry.date) {
      alert("Please fill in Category, Amount, and Date.");
      return;
    }

    // Simulate uploading receipts and getting URLs
    const receiptUrls = receipts.map(file => `https://example.com/receipts/${file.name}`);

    const formattedEntry: BudgetEntry = {
      category: newEntry.category,
      amount: parseFloat(newEntry.amount), // Convert to number
      date: newEntry.date,
      notes: newEntry.notes || "—",
      receipts: receiptUrls, // Add receipt URLs to the entry
      status: newEntryStatus,
      approverRole: newEntryApproverRole
    };

    setBudgetData([...budgetData, formattedEntry]);
    setNewEntry({ category: "", amount: "", date: "", notes: "" }); // Reset Form
    setReceipts([]); // Reset receipts
    setNewEntryStatus('pending'); //reset Status
    setNewEntryApproverRole('faculty'); //reset Approver Role
  };


  return (
    <div className="container mx-auto mt-20 px-4">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Budget Management</h1>
        <p className="text-lg text-gray-600">Track your expenses and manage your budget effectively.</p>
      </motion.div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div className="p-6 rounded-2xl shadow-soft bg-blue-100 text-blue-600 flex items-center">
          <Wallet className="w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Total Budget</h2>
            <p className="text-lg">₹{budgetData.reduce((acc, item) => acc + item.amount, 0)}</p>
          </div>
        </motion.div>
        <motion.div className="p-6 rounded-2xl shadow-soft bg-green-100 text-green-600 flex items-center">
          <TrendingUp className="w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Income</h2>
            <p className="text-lg">₹50,000</p>
          </div>
        </motion.div>
        <motion.div className="p-6 rounded-2xl shadow-soft bg-red-100 text-red-600 flex items-center">
          <TrendingDown className="w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Expenses</h2>
            <p className="text-lg">₹{budgetData.reduce((acc, item) => acc + item.amount, 0)}</p>
          </div>
        </motion.div>
      </div>

      {/* Budget Table */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-soft border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Breakdown</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Notes</th>
              <th className="py-2 px-4">Receipts</th> {/* New column */}
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Approver</th>
            </tr>
          </thead>
          <tbody>
            {budgetData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">₹{item.amount}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.notes}</td>
                <td className="py-2 px-4">
                  {item.receipts && item.receipts.length > 0 ? (
                    item.receipts.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                        Receipt {i + 1}
                      </a>
                    ))
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-2 px-4">{item.status}</td>
                <td className="py-2 px-4">{item.approverRole}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Add New Budget Entry */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-soft border mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Budget</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newEntry.category}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newEntry.amount}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            name="date"
            value={newEntry.date}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
           <select
              value={newEntryStatus}
              onChange={(e) => setNewEntryStatus(e.target.value as 'pending' | 'approved' | 'rejected')}
              className="border p-2 rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={newEntryApproverRole}
              onChange={(e) => setNewEntryApproverRole(e.target.value as 'faculty' | 'incharge')}
              className="border p-2 rounded-md"
            >
              <option value="faculty">Faculty</option>
              <option value="incharge">Incharge</option>
            </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="notes"
            placeholder="Notes (Optional)"
            value={newEntry.notes}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <div>
            <label htmlFor="receipts" className="block text-gray-700 text-sm font-bold mb-2">
              Receipts:
            </label>
            <input
              type="file"
              id="receipts"
              multiple
              onChange={handleReceiptChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {receipts.length > 0 && (
              <div className="mt-2">
                {receipts.map((file, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {file.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={addBudgetEntry}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add Budget Entry
        </button>
      </motion.div>
    </div>
  );
};

export default Budget;

