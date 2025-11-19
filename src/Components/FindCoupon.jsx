import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const FindCoupon = ({ 
  cart, 
  addCartItem, 
  updateCartItem, 
  removeCartItem, 
  cartValue, 
  findBestCoupon, 
  bestCoupon, 
  finalValue 
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
          <button
            onClick={addCartItem}
            className="bg-orange-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-orange-600"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add
          </button>
        </div>

        {cart.items.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">No items in cart</p>
        ) : (
          <div className="space-y-2">
            {cart.items.map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded flex items-center gap-2">
                <input
                  type="text"
                  value={item.productId}
                  onChange={(e) => updateCartItem(index, 'productId', e.target.value)}
                  className="px-2 py-1.5 border rounded text-sm flex-1"
                  placeholder="ID"
                />
                <select
                  value={item.category}
                  onChange={(e) => updateCartItem(index, 'category', e.target.value)}
                  className="px-2 py-1.5 border rounded text-sm"
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="books">Books</option>
                  <option value="home">Home</option>
                </select>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateCartItem(index, 'unitPrice', e.target.value)}
                  className="px-2 py-1.5 border rounded text-sm w-20"
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateCartItem(index, 'quantity', e.target.value)}
                  className="px-2 py-1.5 border rounded text-sm w-16"
                  placeholder="Qty"
                  min="1"
                />
                <button
                  onClick={() => removeCartItem(index)}
                  className="bg-red-100 text-red-600 p-1.5 rounded hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 pt-3 border-t flex justify-between items-center">
          <span className="font-semibold text-gray-700">Total:</span>
          <span className="text-lg font-bold text-gray-900">₹{cartValue.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={findBestCoupon}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-red-600"
      >
        Find Best Coupon
      </button>

      {bestCoupon && (
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎉</span>
            <h3 className="text-lg font-bold text-green-800">Best Coupon</h3>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-xl font-bold text-orange-600">{bestCoupon.coupon.code}</div>
                <p className="text-sm text-gray-600">{bestCoupon.coupon.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">You Save</div>
                <div className="text-xl font-bold text-green-600">₹{bestCoupon.discount.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="pt-2 border-t space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Cart:</span>
                <span>₹{cartValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount:</span>
                <span>- ₹{bestCoupon.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-1.5 border-t">
                <span>Pay:</span>
                <span>₹{finalValue.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindCoupon;