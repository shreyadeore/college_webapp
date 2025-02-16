import React from 'react';
import { motion } from 'framer-motion';
import { DashboardStat } from '../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  stat: DashboardStat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const isPositive = stat.change > 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-soft border border-powder-100 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-powder-50 rounded-full -mr-16 -mt-16 opacity-50" />
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-powder-600">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</h3>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            {Math.abs(stat.change)}%
          </span>
        </div>
        <div className="w-full bg-powder-100 rounded-full h-1.5">
          <div 
            className="bg-powder-500 h-1.5 rounded-full"
            style={{ width: `${Math.min(Math.abs(stat.change), 100)}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;