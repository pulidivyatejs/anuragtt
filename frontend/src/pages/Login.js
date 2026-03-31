import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Package, UserCircle, Truck, Shield } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'customer') {
      setEmail('customer@swiftdrop.com');
      setPassword('customer123');
    } else if (selectedRole === 'agent') {
      setEmail('agent@swiftdrop.com');
      setPassword('agent123');
    } else if (selectedRole === 'admin') {
      setEmail('admin@swiftdrop.com');
      setPassword('admin123');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if ((email === 'customer@swiftdrop.com' && password === 'customer123') ||
          (email === 'agent@swiftdrop.com' && password === 'agent123') ||
          (email === 'admin@swiftdrop.com' && password === 'admin123')) {
        
        const user = { 
          name: email === 'customer@swiftdrop.com' ? 'Priya Sharma' : 
                 email === 'agent@swiftdrop.com' ? 'Sneha Patel' : 'Admin User',
          email: email,
          role: role,
          phone: '+91 98765 43210'
        };
        
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful!');
        
        if (role === 'customer') navigate('/customer/dashboard');
        else if (role === 'agent') navigate('/agent/dashboard');
        else navigate('/admin/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
              <Package className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SwiftDrop</h1>
          <p className="text-blue-200">Delivery Management System</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { id: 'customer', label: 'Customer', icon: UserCircle },
            { id: 'agent', label: 'Agent', icon: Truck },
            { id: 'admin', label: 'Admin', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleRoleSelect(id)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                role === id
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-white/60 text-xs text-center mb-3">Demo Credentials:</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <p className="text-blue-300 font-semibold">Customer</p>
              <p className="text-white/50">customer@swiftdrop.com</p>
              <p className="text-white/50">customer123</p>
            </div>
            <div className="text-center">
              <p className="text-green-300 font-semibold">Agent</p>
              <p className="text-white/50">agent@swiftdrop.com</p>
              <p className="text-white/50">agent123</p>
            </div>
            <div className="text-center">
              <p className="text-purple-300 font-semibold">Admin</p>
              <p className="text-white/50">admin@swiftdrop.com</p>
              <p className="text-white/50">admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
