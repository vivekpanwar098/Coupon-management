import React from 'react';
import { ShoppingCart, Plus, Tag } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, couponsCount }) => {
  return (
    <div className="flex border-b bg-gray-50">
      <button
        onClick={() => setActiveTab('findCoupon')}
        className={`flex-1 px-4 py-3 text-sm font-medium ${
          activeTab === 'findCoupon'
            ? 'text-orange-600 border-b-2 border-orange-500 bg-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <ShoppingCart className="w-4 h-4 inline mr-1" />
        Find Coupon
      </button>
      <button
        onClick={() => setActiveTab('create')}
        className={`flex-1 px-4 py-3 text-sm font-medium ${
          activeTab === 'create'
            ? 'text-orange-600 border-b-2 border-orange-500 bg-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <Plus className="w-4 h-4 inline mr-1" />
        Add Coupon
      </button>
      <button
        onClick={() => setActiveTab('list')}
        className={`flex-1 px-4 py-3 text-sm font-medium ${
          activeTab === 'list'
            ? 'text-orange-600 border-b-2 border-orange-500 bg-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <Tag className="w-4 h-4 inline mr-1" />
        Coupons ({couponsCount})
      </button>
    </div>
  );
};

export default Navigation;