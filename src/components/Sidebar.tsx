import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Vote, 
  MessageSquare, 
  ClipboardCheck, 
  Calendar, 
  PieChart,
  HeartPulse,
  Settings
} from 'lucide-react';
import { NavigationItem } from '../types';
import { motion } from 'framer-motion';

const navigation: NavigationItem[] = [
  { name: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { name: 'Elections', path: '/elections', icon: 'Vote' },
  { name: 'Complaints', path: '/complaints', icon: 'MessageSquare' },
  { name: 'Approvals', path: '/approvals', icon: 'ClipboardCheck' },
  { name: 'Facility Booking', path: '/booking', icon: 'Calendar' },
  { name: 'Budget', path: '/budget', icon: 'PieChart' },
  { name: 'Health & Leave', path: '/health-leave', icon: 'HeartPulse' },
  { name: 'Settings', path: '/settings', icon: 'Settings' }, 
];

const iconComponents = {
  LayoutDashboard,
  Vote,
  MessageSquare,
  ClipboardCheck,
  Calendar,
  PieChart,
  HeartPulse,
  Settings,
};

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-[73px] w-64 h-[calc(100vh-73px)] bg-white border-r border-powder-100">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = iconComponents[item.icon as keyof typeof iconComponents];
              return (
                <motion.li key={item.path} whileHover={{ x: 5 }}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-powder-50 text-powder-600 shadow-sm'
                          : 'text-gray-600 hover:bg-powder-50 hover:text-powder-600'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </NavLink>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
