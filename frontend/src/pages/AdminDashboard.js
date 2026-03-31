import React, { useState, useEffect } from 'react';
import {
  Package, LogOut, Users, Truck, DollarSign, TrendingUp,
  CheckCircle, Clock, AlertCircle, UserCheck, UserPlus,
  Settings, Bell, Search, Filter, Edit, Trash2, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Mock data
    setOrders([
      { id: 'ORD-1042', customer: 'Priya Sharma', items: 'Electronics', pickup: 'HSR Layout', delivery: 'Koramangala', agent: 'Ravi Kumar', status: 'Delivered', amount: 95, date: '2024-03-20' },
      { id: 'ORD-1043', customer: 'Priya Sharma', items: 'Food Parcel', pickup: 'Indiranagar', delivery: 'Whitefield', agent: 'Sneha Patel', status: 'In Transit', amount: 120, date: '2024-03-20' },
      { id: 'ORD-1044', customer: 'Vinod Rao', items: 'Documents', pickup: 'Jayanagar', delivery: 'MG Road', agent: 'Kiran Rao', status: 'Assigned', amount: 85, date: '2024-03-20' },
      { id: 'ORD-1045', customer: 'Meera Nair', items: 'Medicine', pickup: 'Koramangala', delivery: 'Indiranagar', agent: '', status: 'Pending', amount: 110, date: '2024-03-20' },
      { id: 'ORD-1046', customer: 'Rajesh Kumar', items: 'Groceries', pickup: 'Whitefield', delivery: 'HSR Layout', agent: '', status: 'Pending', amount: 75, date: '2024-03-20' }
    ]);

    setAgents([
      { id: 1, name: 'Ravi Kumar', status: 'On Delivery', rating: 4.8, deliveries: 156, earnings: 12450, phone: '+91 98765 43220' },
      { id: 2, name: 'Sneha Patel', status: 'Available', rating: 4.9, deliveries: 203, earnings: 18450, phone: '+91 98765 43221' },
      { id: 3, name: 'Kiran Rao', status: 'Available', rating: 4.7, deliveries: 98, earnings: 8450, phone: '+91 98765 43222' },
      { id: 4, name: 'Pooja Nair', status: 'On Break', rating: 4.6, deliveries: 145, earnings: 11250, phone: '+91 98765 43223' }
    ]);

    setCustomers([
      { id: 1, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', orders: 12, totalSpent: 12450, joinDate: '2024-01-15' },
      { id: 2, name: 'Vinod Rao', email: 'vinod@example.com', phone: '+91 98765 43213', orders: 5, totalSpent: 4850, joinDate: '2024-02-01' },
      { id: 3, name: 'Meera Nair', email: 'meera@example.com', phone: '+91 98765 43214', orders: 8, totalSpent: 7650, joinDate: '2024-01-20' }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const assignOrder = (orderId, agentName) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, agent: agentName, status: 'Assigned' } : order
    ));
    toast.success(`Order ${orderId} assigned to ${agentName}`);
    setSelectedOrder(null);
  };

  const updateAgentStatus = (agentId, newStatus) => {
    setAgents(agents.map(agent =>
      agent.id === agentId ? { ...agent, status: newStatus } : agent
    ));
    toast.success(`Agent status updated`);
  };

  const stats = {
    totalOrders: orders.length,
    inTransit: orders.filter(o => o.status === 'In Transit').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    assigned: orders.filter(o => o.status === 'Assigned').length,
    pending: orders.filter(o => o.status === 'Pending').length,
    totalEarnings: orders.reduce((sum, o) => sum + (o.amount || 0), 0),
    totalAgents: agents.length,
    totalCustomers: customers.length,
    avgRating: (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">SwiftDrop Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-purple-200 text-sm">Administrator</p>
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

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'orders', label: 'All Orders', icon: Package },
              { id: 'assign', label: 'Assign Orders', icon: UserCheck },
              { id: 'agents', label: 'Agents', icon: Truck },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'earnings', label: 'Earnings', icon: DollarSign }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition ${activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
                  </div>
                  <Package className="h-10 w-10 text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Earnings</p>
                    <p className="text-3xl font-bold text-gray-800">₹{stats.totalEarnings}</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Agents</p>
                    <p className="text-3xl font-bold text-gray-800">{agents.filter(a => a.status === 'Available').length}</p>
                  </div>
                  <Truck className="h-10 w-10 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Avg Rating</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.avgRating}★</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Delivered', value: stats.delivered, color: 'bg-green-500', icon: CheckCircle },
                    { label: 'In Transit', value: stats.inTransit, color: 'bg-blue-500', icon: Truck },
                    { label: 'Assigned', value: stats.assigned, color: 'bg-yellow-500', icon: UserCheck },
                    { label: 'Pending', value: stats.pending, color: 'bg-gray-500', icon: Clock }
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </span>
                        <span className="text-sm font-semibold">{item.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.value / stats.totalOrders) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Agent Availability</h3>
                <div className="space-y-3">
                  {agents.map(agent => (
                    <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{agent.name}</p>
                        <p className="text-xs text-gray-500">{agent.rating}★ • {agent.deliveries} deliveries</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${agent.status === 'Available' ? 'bg-green-100 text-green-800' :
                          agent.status === 'On Delivery' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Package className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Order #1045 placed by Vinod Rao</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Ravi Kumar delivered #1042 — rated 5★</p>
                    <p className="text-xs text-gray-500">8 min ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Truck className="h-5 w-5 text-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Sneha Patel picked up #1043</p>
                    <p className="text-xs text-gray-500">18 min ago</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Assign Orders Tab */}
        {activeTab === 'assign' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Assign Orders to Agents</h2>
              <p className="text-gray-500 mt-1">Select an order and assign to available agent</p>
            </div>
            <div className="divide-y divide-gray-200">
              {orders.filter(o => o.status === 'Pending').map(order => (
                <div key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer} • {order.items}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Pickup: {order.pickup} → Delivery: {order.delivery}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₹{order.amount}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      onChange={(e) => assignOrder(order.id, e.target.value)}
                      className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Agent</option>
                      {agents.filter(a => a.status === 'Available').map(agent => (
                        <option key={agent.id} value={agent.name}>{agent.name} ({agent.rating}★)</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {orders.filter(o => o.status === 'Pending').length === 0 && (
                <div className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-500">All orders have been assigned!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Agent Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deliveries</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {agents.map(agent => (
                    <tr key={agent.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{agent.name}</p>
                          <p className="text-xs text-gray-500">{agent.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={agent.status}
                          onChange={(e) => updateAgentStatus(agent.id, e.target.value)}
                          className={`px-2 py-1 text-xs rounded-full border ${agent.status === 'Available' ? 'bg-green-100 text-green-800' :
                              agent.status === 'On Delivery' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          <option>Available</option>
                          <option>On Delivery</option>
                          <option>On Break</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{agent.rating}★</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{agent.deliveries}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">₹{agent.earnings}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map(customer => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-500">{customer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">₹{customer.totalSpent}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{customer.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;