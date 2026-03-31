import React, { useState, useEffect } from 'react';
import { Package, LogOut, CheckCircle, Truck, DollarSign, TrendingUp, Calendar, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AgentDashboard = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [available, setAvailable] = useState(true);
  const [earnings, setEarnings] = useState({
    weekly: 2850,
    monthly: 12450,
    total: 45680,
    thisWeek: 4850
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Mock assigned orders
    setAssignedOrders([
      { id: 'ORD-1043', customer: 'Priya Sharma', items: 'Food Parcel', pickup: 'Indiranagar', delivery: 'Whitefield', status: 'In Transit', amount: 120, time: '2:30 PM' },
      { id: 'ORD-1045', customer: 'Vinod Rao', items: 'Documents', pickup: 'Jayanagar', delivery: 'MG Road', status: 'Assigned', amount: 85, time: '3:00 PM' },
      { id: 'ORD-1046', customer: 'Meera Nair', items: 'Electronics', pickup: 'Koramangala', delivery: 'HSR Layout', status: 'Picked Up', amount: 150, time: '1:45 PM' }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setAssignedOrders(orders => orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} marked as ${newStatus}`);

    // Add earnings when order is delivered
    if (newStatus === 'Delivered') {
      const order = assignedOrders.find(o => o.id === orderId);
      if (order) {
        setEarnings(prev => ({
          ...prev,
          weekly: prev.weekly + order.amount,
          thisWeek: prev.thisWeek + order.amount
        }));
        toast.success(`₹${order.amount} added to your earnings!`);
      }
    }
  };

  const toggleAvailability = () => {
    setAvailable(!available);
    toast.success(available ? 'You are now offline' : 'You are now available for deliveries');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">SwiftDrop</h1>
              <span className="text-green-200 text-sm ml-2">Agent Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-green-200 text-sm">Rating: 4.9 ★</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Weekly Earnings</p>
                <p className="text-2xl font-bold text-gray-800">₹{earnings.weekly}</p>
                <p className="text-green-500 text-sm">+12% from last week</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">This Week</p>
                <p className="text-2xl font-bold text-gray-800">₹{earnings.thisWeek}</p>
                <p className="text-blue-500 text-sm">5 deliveries completed</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Deliveries</p>
                <p className="text-2xl font-bold text-gray-800">203</p>
                <p className="text-purple-500 text-sm">Lifetime deliveries</p>
              </div>
              <Truck className="h-10 w-10 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Rating</p>
                <p className="text-2xl font-bold text-gray-800">4.9 ★</p>
                <p className="text-yellow-500 text-sm">Based on 156 reviews</p>
              </div>
              <Star className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Availability Status</h3>
              <p className="text-gray-500 text-sm">Toggle to accept new deliveries</p>
            </div>
            <button
              onClick={toggleAvailability}
              className={`px-6 py-2 rounded-full font-semibold transition ${available
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
            >
              {available ? 'Available' : 'Busy'}
            </button>
          </div>
        </div>

        {/* Assigned Orders */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-2xl font-bold text-gray-800">My Assigned Orders</h2>
            <p className="text-gray-500 text-sm mt-1">Track and update delivery status</p>
          </div>
          <div className="divide-y divide-gray-200">
            {assignedOrders.map(order => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer} • {order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₹{order.amount}</p>
                    <p className="text-xs text-gray-500 flex items-center"><Clock className="h-3 w-3 mr-1" />{order.time}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Pickup</p>
                    <p className="text-sm font-medium">{order.pickup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivery</p>
                    <p className="text-sm font-medium">{order.delivery}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Picked Up' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                {order.status !== 'Delivered' && (
                  <div className="flex gap-2">
                    {order.status === 'Assigned' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Picked Up')}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                      >
                        Mark Picked Up
                      </button>
                    )}
                    {order.status === 'Picked Up' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'In Transit')}
                        className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
                      >
                        Start Transit
                      </button>
                    )}
                    {order.status === 'In Transit' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Earnings Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Earnings Breakdown</h3>
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="flex items-center space-x-4">
                <span className="w-12 text-sm text-gray-600">{day}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-4 rounded-full"
                    style={{ width: `${[65, 80, 72, 90, 85, 70, 45][index]}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">₹{[650, 800, 720, 900, 850, 700, 450][index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;