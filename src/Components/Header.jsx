import React from 'react';
import { Gift } from 'lucide-react';

const Header = ({ loggedInUser, handleLogout }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gift className="w-7 h-7 text-white" />
          <div>
            <h1 className="text-xl font-bold text-white">Coupon System</h1>
            <p className="text-yellow-50 text-xs">
              {loggedInUser.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-orange-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-orange-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;