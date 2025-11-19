import React from 'react';
import { Gift, Tag, DollarSign, Percent, Calendar, Users, ShoppingCart, Trash2 } from 'lucide-react';

const CouponList = ({ coupons, deleteCoupon }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Available Coupons</h2>
      
      {coupons.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No coupons yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon) => (
            <div key={coupon.code} className="bg-white border rounded-lg p-4 hover:shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Tag className="w-4 h-4 text-orange-500" />
                    <span className="text-lg font-bold text-orange-600">{coupon.code}</span>
                  </div>
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                </div>
                <button
                  onClick={() => deleteCoupon(coupon.code)}
                  className="bg-red-50 text-red-600 p-1.5 rounded hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t text-xs">
                <div className="flex items-center gap-1.5">
                  {coupon.discountType === 'FLAT' ? <DollarSign className="w-3.5 h-3.5 text-green-600" /> : <Percent className="w-3.5 h-3.5 text-green-600" />}
                  <span className="text-gray-700">
                    {coupon.discountType === 'FLAT' ? `₹${coupon.discountValue}` : `${coupon.discountValue}%`}
                    {coupon.maxDiscountAmount && ` (max ₹${coupon.maxDiscountAmount})`}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-gray-700">
                    {new Date(coupon.startDate).toLocaleDateString('en-GB')} - {new Date(coupon.endDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
                
                {coupon.eligibility?.allowedUserTiers && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-gray-700">
                      {coupon.eligibility.allowedUserTiers.join(', ')}
                    </span>
                  </div>
                )}
                
                {coupon.eligibility?.minCartValue && (
                  <div className="flex items-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5 text-orange-600" />
                                        <span className="text-gray-700">
                      Min: ₹{coupon.eligibility.minCartValue}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CouponList;

