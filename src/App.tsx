import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Elections from './pages/Elections';
import Complaints from './pages/Complaints';
import Approvals from './pages/Approvals';
import FacilityBooking from './pages/FacilityBooking';
import Budget from "./pages/Budget";  
import HealthLeave from "./pages/HealthLeave";
import Settings from "./pages/Settings"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="elections" element={<Elections />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="booking" element={<FacilityBooking />} />
          <Route path="budget" element={<Budget/>} />
          <Route path="health-leave" element={<HealthLeave />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;