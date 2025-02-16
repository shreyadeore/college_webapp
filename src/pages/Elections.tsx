import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User2, CheckCircle2, Timer, BarChart3, AlertCircle } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  position: string;
  department: string;
  votes: number;
  manifesto: string;
  imageUrl: string;
}

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Student Body President",
    department: "Computer Science",
    votes: 145,
    manifesto: "Focusing on improving campus technology infrastructure and promoting inclusive student activities.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Student Body President",
    department: "Business Administration",
    votes: 132,
    manifesto: "Advocating for more internship opportunities and enhanced career development programs.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Cultural Secretary",
    department: "Fine Arts",
    votes: 98,
    manifesto: "Planning diverse cultural events and promoting artistic expression across campus.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];

const Elections = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates); // Manage candidates with state
  const [selectedPosition, setSelectedPosition] = useState<string>("Student Body President");
  const [votedFor, setVotedFor] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState("2 days 14 hours");

  // New state for form inputs
  const [newCandidateName, setNewCandidateName] = useState<string>("");
  const [newCandidateDepartment, setNewCandidateDepartment] = useState<string>("");
  const [newCandidateManifesto, setNewCandidateManifesto] = useState<string>("");
  const [newCandidateImageUrl, setNewCandidateImageUrl] = useState<string>("");


  const filteredCandidates = candidates.filter(c => c.position === selectedPosition);
  const totalVotes = filteredCandidates.reduce((acc, curr) => acc + curr.votes, 0);

  const positions = Array.from(new Set(candidates.map(c => c.position)));

  const handleAddCandidate = () => {
    // Basic validation - expand as needed
    if (!newCandidateName || !newCandidateDepartment || !newCandidateManifesto || !newCandidateImageUrl) {
      alert("Please fill in all the candidate details.");
      return;
    }

    const newCandidate: Candidate = {
      id: candidates.length > 0 ? Math.max(...candidates.map(c => c.id)) + 1 : 1, // Generate a unique ID
      name: newCandidateName,
      position: selectedPosition, // Add to the currently selected position
      department: newCandidateDepartment,
      votes: 0,
      manifesto: newCandidateManifesto,
      imageUrl: newCandidateImageUrl
    };

    setCandidates([...candidates, newCandidate]);
    // Clear the form
    setNewCandidateName("");
    setNewCandidateDepartment("");
    setNewCandidateManifesto("");
    setNewCandidateImageUrl("");
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Elections 2025</h1>
            <p className="text-lg text-gray-600">Cast your vote for the future leaders of our college.</p>
          </div>
          <div className="flex items-center gap-3 bg-powder-50 px-4 py-2 rounded-xl">
            <Timer className="w-5 h-5 text-powder-600" />
            <span className="text-sm font-medium text-powder-800">Time remaining: {timeLeft}</span>
          </div>
        </motion.div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
          {positions.map((position) => (
            <motion.button
              key={position}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPosition(position)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${
                selectedPosition === position
                  ? 'bg-powder-500 text-white shadow-sm'
                  : 'bg-powder-50 text-powder-600 hover:bg-powder-100'
              }`}
            >
              {position}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-soft border border-powder-100 overflow-hidden"
          >
            <div className="relative">
              <img
                src={candidate.imageUrl}
                alt={candidate.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
                <p className="text-powder-100">{candidate.department}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Manifesto</h4>
                <p className="text-gray-800">{candidate.manifesto}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Current Votes</span>
                  <span className="text-sm font-medium text-powder-600">
                    {((candidate.votes / totalVotes) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-powder-50 rounded-full h-2">
                  <div
                    className="bg-powder-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(candidate.votes / totalVotes) * 100}%` }}
                  />
                </div>
              </div>

              {votedFor === null ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVotedFor(candidate.id)}
                  className="w-full py-3 px-4 bg-powder-500 text-white rounded-xl font-medium hover:bg-powder-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Vote for Candidate
                </motion.button>
              ) : votedFor === candidate.id ? (
                <div className="w-full py-3 px-4 bg-green-50 text-green-600 rounded-xl font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Vote Recorded
                </div>
              ) : (
                <div className="w-full py-3 px-4 bg-gray-50 text-gray-400 rounded-xl font-medium flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Already Voted
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Candidate Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-2xl shadow-soft border border-powder-100 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Candidate</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="candidateName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-powder-500 focus:ring-powder-500 sm:text-sm"
              value={newCandidateName}
              onChange={(e) => setNewCandidateName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="candidateDepartment" className="block text-sm font-medium text-gray-700">Department:</label>
            <input
              type="text"
              id="candidateDepartment"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-powder-500 focus:ring-powder-500 sm:text-sm"
              value={newCandidateDepartment}
              onChange={(e) => setNewCandidateDepartment(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="candidateManifesto" className="block text-sm font-medium text-gray-700">Manifesto:</label>
            <textarea
              id="candidateManifesto"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-powder-500 focus:ring-powder-500 sm:text-sm"
              value={newCandidateManifesto}
              onChange={(e) => setNewCandidateManifesto(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="candidateImageUrl" className="block text-sm font-medium text-gray-700">Image URL:</label>
            <input
              type="text"
              id="candidateImageUrl"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-powder-500 focus:ring-powder-500 sm:text-sm"
              value={newCandidateImageUrl}
              onChange={(e) => setNewCandidateImageUrl(e.target.value)}
            />
          </div>

          <button
            onClick={handleAddCandidate}
            className="w-full py-3 px-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            Add Candidate to {selectedPosition}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white rounded-2xl shadow-soft border border-powder-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Election Statistics</h2>
          <button className="text-sm font-medium text-powder-600 hover:text-powder-700 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            View Detailed Analytics
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-powder-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <User2 className="w-5 h-5 text-powder-600" />
              <h3 className="text-sm font-medium text-gray-900">Total Voters</h3>
            </div>
            <p className="text-2xl font-bold text-powder-600">1,234</p>
            <span className="text-sm text-gray-600">Out of 1,500 eligible voters</span>
          </div>
          <div className="bg-powder-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-powder-600" />
              <h3 className="text-sm font-medium text-gray-900">Votes Cast</h3>
            </div>
            <p className="text-2xl font-bold text-powder-600">82.3%</p>
            <span className="text-sm text-gray-600">Voter turnout</span>
          </div>
          <div className="bg-powder-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Timer className="w-5 h-5 text-powder-600" />
              <h3 className="text-sm font-medium text-gray-900">Time Remaining</h3>
            </div>
            <p className="text-2xl font-bold text-powder-600">{timeLeft}</p>
            <span className="text-sm text-gray-600">Until polls close</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Elections;
