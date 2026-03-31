import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, MessageSquare, PlusCircle } from 'lucide-react';

const Sidebar = ({ role }) => {
  
  const customerLinks = [
    { to: "/customer", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { to: "/customer/place-order", icon: <PlusCircle className="w-5 h-5" />, label: "Place Order" },
    { to: "/customer/my-orders", icon: <Package className="w-5 h-5" />, label: "My Orders" },
    { to: "/customer/track", icon: <Truck className="w-5 h-5" />, label: "Track Order" },
    { to: "/customer/feedback", icon: <MessageSquare className="w-5 h-5" />, label: "Feedback" }
  ];

  const adminLinks = [
    { to: "/admin", icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview" },
    { to: "/admin/orders", icon: <Package className="w-5 h-5" />, label: "All Orders" },
    { to: "/admin/agents", icon: <Truck className="w-5 h-5" />, label: "Agents" }
  ];

  const links = role === 'ADMIN' ? adminLinks : customerLinks;

  return (
    <aside className="w-64 bg-indigo-900 text-white min-h-screen flex flex-col shadow-xl">
      <div className="p-6 font-bold text-2xl tracking-wider text-center border-b border-indigo-800">
        <span className="text-blue-400">Swift</span>Drop
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            end={link.to === '/customer' || link.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="ml-3 font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
