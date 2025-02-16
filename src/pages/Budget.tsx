import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, PlusCircle } from "lucide-react";

// Initial Budget Data (Simulating Budget.tsv)
const initialBudgetData = [
  { category: "Rent", amount: 10000, date: "2025-02-15", notes: "Monthly rent" },
  { category: "Groceries", amount: 5000, date: "2025-02-14", notes: "Weekly groceries" },
  { category: "Utilities", amount: 3000, date: "2025-02-10", notes: "Electricity & water bills" },
];

const Budget = () => {
  const [budgetData, setBudgetData] = useState(initialBudgetData);
  const [newEntry, setNewEntry] = useState({ category: "", amount: "", date: "", notes: "" });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add New Budget Entry
  const addBudgetEntry = () => {
    if (!newEntry.category || !newEntry.amount || !newEntry.date) {
      alert("Please fill in Category, Amount, and Date.");
      return;
    }

    const formattedEntry = {
      category: newEntry.category,
      amount: parseFloat(newEntry.amount), // Convert to number
      date: newEntry.date,
      notes: newEntry.notes || "—",
    };

    setBudgetData([...budgetData, formattedEntry]);
    setNewEntry({ category: "", amount: "", date: "", notes: "" }); // Reset Form
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
            </tr>
          </thead>
          <tbody>
            {budgetData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">₹{item.amount}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Add New Budget Entry */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-soft border mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Budget</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <input
            type="text"
            name="notes"
            placeholder="Notes (Optional)"
            value={newEntry.notes}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
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
