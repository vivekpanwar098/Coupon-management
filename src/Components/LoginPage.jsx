import React from 'react';
import { Gift } from 'lucide-react';

const LoginPage = ({ loginForm, setLoginForm, handleLogin, message }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Gift className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Coupon Manager</h1>
          <p className="text-gray-600 mt-2">E-Commerce Coupon System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="vivekpanwar098@gmail.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="vivek@9876"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 font-medium"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 font-medium">Demo Credentials:</p>
          <p className="text-sm text-gray-600">Email: vivekpanwar098@gmail.com</p>
          <p className="text-sm text-gray-600">Password: vivek@9876</p>
        </div>
        
        {message.text && (
          <div className={`mt-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;