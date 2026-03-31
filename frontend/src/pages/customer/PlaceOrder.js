import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    items: '',
    packageWeight: 'medium',
    specialInstructions: '',
    paymentMethod: 'CASH'
  });
  const [loading, setLoading] = useState(false);

  const estimatedCost = Math.floor(Math.random() * (120 - 85 + 1) + 85);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders', {
        ...formData,
        estimatedCost
      });
      toast.success('Order placed successfully!');
      navigate('/customer/my-orders');
    } catch (err) {
      toast.error('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Place New Order</h2>
        <p className="text-gray-500 mt-1">Fill in the details for your package delivery</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Pickup Address *</label>
            <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
              value={formData.pickupAddress} onChange={e => setFormData({...formData, pickupAddress: e.target.value})} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Delivery Address *</label>
            <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
               value={formData.deliveryAddress} onChange={e => setFormData({...formData, deliveryAddress: e.target.value})} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Items Describe *</label>
          <input required type="text" placeholder="E.g., 2 Laptops, Documents" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
             value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Payment Method</label>
            <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
              value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
              <option value="CASH">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
            </select>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 flex items-center justify-between">
            <span className="font-medium text-indigo-800">Estimated Cost:</span>
            <span className="text-2xl font-bold text-indigo-700">₹{estimatedCost}</span>
          </div>
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Special Instructions</label>
            <textarea rows="3" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
               value={formData.specialInstructions} onChange={e => setFormData({...formData, specialInstructions: e.target.value})}></textarea>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition">
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
