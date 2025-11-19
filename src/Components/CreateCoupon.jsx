import React from 'react';

const CreateCoupon = ({ newCoupon, setNewCoupon, updateEligibility, createCoupon }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Add New Coupon</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Code</label>
          <input
            type="text"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
            className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
            placeholder="SAVE20"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
          <select
            value={newCoupon.discountType}
            onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
            className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
          >
            <option value="FLAT">Flat ₹</option>
            <option value="PERCENT">Percent %</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
        <input
          type="text"
          value={newCoupon.description}
          onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
          className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
          placeholder="Get discount on purchase"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Value {newCoupon.discountType === 'PERCENT' ? '%' : '₹'}
          </label>
          <input
            type="number"
            value={newCoupon.discountValue}
            onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
            className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
            placeholder="100"
          />
        </div>
        
        {newCoupon.discountType === 'PERCENT' && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Max Cap ₹</label>
            <input
              type="number"
              value={newCoupon.maxDiscountAmount}
              onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscountAmount: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              placeholder="500"
            />
          </div>
        )}
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Usage Limit</label>
          <input
            type="number"
            value={newCoupon.usageLimitPerUser}
            onChange={(e) => setNewCoupon({ ...newCoupon, usageLimitPerUser: e.target.value })}
            className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
            placeholder="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={newCoupon.startDate}
            onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
            className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={newCoupon.endDate}
            onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
            className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded p-3 border">
        <h3 className="font-medium text-gray-700 text-sm mb-2">Eligibility Rules</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">User Tiers</label>
            <input
              type="text"
              onChange={(e) => updateEligibility('allowedUserTiers', e.target.value ? e.target.value.split(',').map(s => s.trim()) : undefined)}
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              placeholder="NEW,GOLD"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Min Cart ₹</label>
            <input
              type="number"
              onChange={(e) => updateEligibility('minCartValue', e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              placeholder="1000"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Categories</label>
            <input
              type="text"
              onChange={(e) => updateEligibility('applicableCategories', e.target.value ? e.target.value.split(',').map(s => s.trim()) : undefined)}
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              placeholder="electronics"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Min Spend ₹</label>
            <input
              type="number"
              onChange={(e) => updateEligibility('minLifetimeSpend', e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              placeholder="5000"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Min Orders</label>
            <input
              type="number"
              onChange={(e) => updateEligibility('minOrdersPlaced', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              placeholder="3"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Min Items</label>
            <input
              type="number"
              onChange={(e) => updateEligibility('minItemsCount', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
              placeholder="2"
            />
          </div>
          
          <div className="col-span-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => updateEligibility('firstOrderOnly', e.target.checked || undefined)}
                className="w-3.5 h-3.5 text-orange-500 rounded focus:ring-orange-400"
              />
              <span className="text-xs text-gray-700">First Order Only</span>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={createCoupon}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-red-600"
      >
        Create Coupon
      </button>
    </div>
  );
};

export default CreateCoupon;