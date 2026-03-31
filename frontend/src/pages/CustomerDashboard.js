import React, { useState, useEffect } from 'react';
import { Package, LogOut, PlusCircle, List, MapPin, Star, Truck, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('place-order');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Order form state
  const [orderForm, setOrderForm] = useState({
    customerName: user.name || 'Priya Sharma',
    phoneNumber: user.phone || '+91 98765 43210',
    items: '',
    specialInstructions: '',
    pickupAddress: '',
    deliveryAddress: '',
    pickupTime: '14:00',
    priority: 'Standard',
    paymentMethod: 'Cash on Delivery'
  });

  const [estimatedCost, setEstimatedCost] = useState({ min: 85, max: 120 });

  // Calculate estimated cost based on items and distance
  useEffect(() => {
    const baseCost = 50;
    const itemCost = orderForm.items.length * 5;
    const priorityMultiplier = orderForm.priority === 'Express' ? 1.5 : orderForm.priority === 'Priority' ? 2 : 1;
    const min = Math.floor((baseCost + itemCost) * priorityMultiplier);
    const max = min + 35;
    setEstimatedCost({ min, max });
  }, [orderForm.items, orderForm.priority]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: orderForm.customerName,
      items: orderForm.items,
      pickup: orderForm.pickupAddress.split(',')[0],
      delivery: orderForm.deliveryAddress.split(',')[0],
      status: 'Placed',
      placedAt: new Date().toLocaleString(),
      estimatedCost: `₹${estimatedCost.min} - ₹${estimatedCost.max}`,
      paymentMethod: orderForm.paymentMethod,
      specialInstructions: orderForm.specialInstructions
    };

    try {
      // Try to save to backend
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/orders', newOrder, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders([response.data, ...orders]);
      toast.success('Order placed successfully!');

      // Reset form
      setOrderForm({
        ...orderForm,
        items: '',
        specialInstructions: '',
        pickupAddress: '',
        deliveryAddress: ''
      });
    } catch (error) {
      // Demo mode - save locally
      setOrders([newOrder, ...orders]);
      toast.success('Order placed successfully! (Demo Mode)');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">SwiftDrop</h1>
              <span className="text-blue-200 text-sm ml-2">Customer Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-blue-200 text-sm">{user.email}</p>
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

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'place-order', label: 'Place Order', icon: PlusCircle },
              { id: 'my-orders', label: 'My Orders', icon: List },
              { id: 'track-order', label: 'Track Order', icon: MapPin },
              { id: 'feedback', label: 'Feedback', icon: Star }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
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

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Place Order Tab */}
        {activeTab === 'place-order' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Place New Order</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={orderForm.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={orderForm.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Items / Description</label>
                  <textarea
                    name="items"
                    value={orderForm.items}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Electronics, Documents, Food Parcel"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    value={orderForm.specialInstructions}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Handle with care, Fragile, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
                  <textarea
                    name="pickupAddress"
                    value={orderForm.pickupAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full pickup address"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                  <textarea
                    name="deliveryAddress"
                    value={orderForm.deliveryAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full delivery address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={orderForm.pickupTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    name="priority"
                    value={orderForm.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Standard</option>
                    <option>Express</option>
                    <option>Priority</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={orderForm.paymentMethod === 'Cash on Delivery'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI / Razorpay"
                        checked={orderForm.paymentMethod === 'UPI / Razorpay'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span>UPI / Razorpay</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Card"
                        checked={orderForm.paymentMethod === 'Card'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span>Card</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-semibold">
                  Estimated Cost: <span className="text-2xl">₹{estimatedCost.min} - ₹{estimatedCost.max}</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        )}

        {/* My Orders Tab */}
        {activeTab === 'my-orders' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ORDER ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ITEMS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PICKUP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DELIVERY</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AGENT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.pickup}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.delivery}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.agent || 'Not Assigned'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                          }`}>
                          {order.status}
                        </span>
                      </td>
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

export default CustomerDashboard;