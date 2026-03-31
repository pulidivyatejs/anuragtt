import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';

const TrackOrder = () => {
  const [tracking, setTracking] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Track Order: ORD-1002</h2>
            <p className="text-gray-500">Estimated Delivery: 2:45 PM</p>
          </div>
          <button 
            onClick={() => setTracking(!tracking)}
            className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-200 transition"
          >
            {tracking ? 'Pause tracking' : 'Start Live Update'}
          </button>
        </div>

        <div className="h-64 bg-gray-100 rounded-xl mb-8 relative flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="absolute top-4 left-4 bg-white/90 glass p-3 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800 text-sm">Agent: Agent User</p>
            <p className="text-gray-500 text-xs">Vehicle: Bike (MH-12-3401)</p>
          </div>
          <div className="text-center text-gray-500">
            <Navigation className={`w-12 h-12 mx-auto mb-2 ${tracking ? 'text-indigo-500 animate-pulse' : 'text-gray-400'}`} />
            <p>{tracking ? 'Live tracking active' : 'Map placeholder. Click Start Live Update to simulate tracking.'}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-1 bg-indigo-100"></div>
          
          <div className="space-y-8">
            <div className="flex items-center relative gap-6">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Order Placed</h4>
                <p className="text-sm text-gray-500">10:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-center relative gap-6">
               <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Agent Assigned</h4>
                <p className="text-sm text-gray-500">10:45 AM • Agent User is on the way to pickup</p>
              </div>
            </div>

            <div className="flex items-center relative gap-6">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">In Transit</h4>
                <p className="text-sm text-gray-500">11:15 AM • Your package is on the way</p>
              </div>
            </div>
            
            <div className="flex items-center relative gap-6">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                 <MapPin className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-400">Delivered</h4>
                <p className="text-sm text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
