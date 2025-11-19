import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import LoginPage from './Components/LoginPage';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import FindCoupon from './Components/FindCoupon';
import CreateCoupon from './Components/CreateCoupon';
import CouponList from './Components/CouponList';
import { store, initializeCoupons, calculateCartValue, evaluateCoupon } from './utils/couponStore';

const App = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discountType: 'FLAT',
    discountValue: 0,
    maxDiscountAmount: '',
    startDate: '',
    endDate: '',
    usageLimitPerUser: '',
    eligibility: {}
  });
  const [cart, setCart] = useState({ items: [] });
  const [bestCoupon, setBestCoupon] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    initializeCoupons();
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    setCoupons([...store.coupons]);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      const loggedUser = {
        userId: "user-" + Date.now(),
        email: loginForm.email,
        password: loginForm.password,
        userTier: "GOLD",
        country: "IN",
        lifetimeSpend: 15000,
        ordersPlaced: 5
      };
      setLoggedInUser(loggedUser);
      setActiveTab('findCoupon');
      showMessage('success', 'Welcome! Logged in successfully.');
    } else {
      showMessage('error', 'Please enter email and password');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setLoginForm({ email: '', password: '' });
    setCart({ items: [] });
    setBestCoupon(null);
    setActiveTab('login');
  };

  const createCoupon = () => {
    if (!newCoupon.code.trim()) {
      showMessage('error', 'Coupon code is required');
      return;
    }

    const exists = store.coupons.find(c => c.code === newCoupon.code);
    if (exists) {
      showMessage('error', 'Coupon code already exists');
      return;
    }

    const coupon = {
      ...newCoupon,
      discountValue: parseFloat(newCoupon.discountValue) || 0,
      maxDiscountAmount: newCoupon.maxDiscountAmount ? parseFloat(newCoupon.maxDiscountAmount) : undefined,
      usageLimitPerUser: newCoupon.usageLimitPerUser ? parseInt(newCoupon.usageLimitPerUser) : undefined
    };

    store.coupons.push(coupon);
    loadCoupons();
    showMessage('success', `Coupon ${coupon.code} created successfully`);
    
    setNewCoupon({
      code: '',
      description: '',
      discountType: 'FLAT',
      discountValue: 0,
      maxDiscountAmount: '',
      startDate: '',
      endDate: '',
      usageLimitPerUser: '',
      eligibility: {}
    });
  };

  const deleteCoupon = (code) => {
    store.coupons = store.coupons.filter(c => c.code !== code);
    loadCoupons();
    showMessage('success', `Coupon ${code} deleted`);
  };

  const addCartItem = () => {
    setCart({
      items: [
        ...cart.items,
        {
          productId: `p${cart.items.length + 1}`,
          category: 'electronics',
          unitPrice: 1000,
          quantity: 1
        }
      ]
    });
  };

  const updateCartItem = (index, field, value) => {
    const items = [...cart.items];
    items[index] = { ...items[index], [field]: field === 'quantity' || field === 'unitPrice' ? parseFloat(value) || 0 : value };
    setCart({ items });
  };

  const removeCartItem = (index) => {
    setCart({ items: cart.items.filter((_, i) => i !== index) });
  };

  const findBestCoupon = () => {
    if (!loggedInUser) {
      showMessage('error', 'Please login first');
      return;
    }

    if (cart.items.length === 0) {
      showMessage('error', 'Cart is empty');
      return;
    }

    const eligible = store.coupons
      .map(coupon => evaluateCoupon(coupon, loggedInUser, cart))
      .filter(result => result !== null);

    if (eligible.length === 0) {
      setBestCoupon(null);
      showMessage('error', 'No eligible coupons found');
      return;
    }

    eligible.sort((a, b) => {
      if (b.discount !== a.discount) return b.discount - a.discount;
      const dateA = new Date(a.coupon.endDate);
      const dateB = new Date(b.coupon.endDate);
      if (dateA.getTime() !== dateB.getTime()) return dateA.getTime() - dateB.getTime();
      return a.coupon.code.localeCompare(b.coupon.code);
    });

    setBestCoupon(eligible[0]);
    showMessage('success', 'Best coupon found!');
  };

  const updateEligibility = (field, value) => {
    setNewCoupon({
      ...newCoupon,
      eligibility: {
        ...newCoupon.eligibility,
        [field]: value
      }
    });
  };

  const cartValue = calculateCartValue(cart.items);
  const finalValue = bestCoupon ? Math.max(0, cartValue - bestCoupon.discount) : cartValue;

  if (!loggedInUser) {
    return (
      <LoginPage
        loginForm={loginForm} 
        setLoginForm={setLoginForm} 
        handleLogin={handleLogin} 
        message={message} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <Header loggedInUser={loggedInUser} handleLogout={handleLogout} />
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} couponsCount={coupons.length} />

          <div className="p-4">
            {message.text && (
              <div className={`mb-3 p-3 rounded text-sm flex items-center ${
                message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.type === 'success' ? <Check className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />}
                {message.text}
              </div>
            )}

            {activeTab === 'findCoupon' && (
              <FindCoupon 
                cart={cart}
                addCartItem={addCartItem}
                updateCartItem={updateCartItem}
                removeCartItem={removeCartItem}
                cartValue={cartValue}
                findBestCoupon={findBestCoupon}
                bestCoupon={bestCoupon}
                finalValue={finalValue}
              />
            )}

            {activeTab === 'create' && (
              <CreateCoupon 
                newCoupon={newCoupon}
                setNewCoupon={setNewCoupon}
                updateEligibility={updateEligibility}
                createCoupon={createCoupon}
              />
            )}

            {activeTab === 'list' && (
              <CouponList 
                coupons={coupons}
                deleteCoupon={deleteCoupon}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;