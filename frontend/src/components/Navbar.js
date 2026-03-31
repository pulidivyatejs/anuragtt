import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Navbar = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center z-10 relative">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-600">
          <User className="w-5 h-5 mr-2" />
          <span className="font-medium">{user?.name} ({user?.role})</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700 transition"
        >
          <LogOut className="w-5 h-5 mr-1" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
