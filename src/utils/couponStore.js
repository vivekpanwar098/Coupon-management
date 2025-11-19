// In-memory data store
export const store = {
  coupons: [],
  userUsage: {}
};

// Initialize with sample coupons
export const initializeCoupons = () => {
  if (store.coupons.length === 0) {
    store.coupons = [
      {
        code: "WELCOME100",
        description: "₹100 off for new users",
        discountType: "FLAT",
        discountValue: 100,
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        usageLimitPerUser: 1,
        eligibility: {
          allowedUserTiers: ["NEW"],
          firstOrderOnly: true,
          minCartValue: 500
        }
      },
      {
        code: "GOLD20",
        description: "20% off for GOLD members",
        discountType: "PERCENT",
        discountValue: 20,
        maxDiscountAmount: 500,
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        eligibility: {
          allowedUserTiers: ["GOLD"],
          minCartValue: 1000
        }
      },
      {
        code: "ELECTRONICS15",
        description: "15% off on electronics",
        discountType: "PERCENT",
        discountValue: 15,
        maxDiscountAmount: 300,
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        eligibility: {
          applicableCategories: ["electronics"],
          minCartValue: 2000
        }
      }
    ];
  }
};

// Calculate cart total
export const calculateCartValue = (items) => {
  return items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
};

// Evaluate if coupon is eligible for user and cart
export const evaluateCoupon = (coupon, user, cartData) => {
  const now = new Date();
  const startDate = new Date(coupon.startDate);
  const endDate = new Date(coupon.endDate);

  if (now < startDate || now > endDate) return null;

  const usageKey = `${user.userId}_${coupon.code}`;
  const usageCount = store.userUsage[usageKey] || 0;
  if (coupon.usageLimitPerUser && usageCount >= coupon.usageLimitPerUser) {
    return null;
  }

  const eligibility = coupon.eligibility || {};
  const cartValue = calculateCartValue(cartData.items);
  const itemsCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
  const categories = [...new Set(cartData.items.map(item => item.category))];

  if (eligibility.allowedUserTiers && !eligibility.allowedUserTiers.includes(user.userTier)) return null;
  if (eligibility.minLifetimeSpend && user.lifetimeSpend < eligibility.minLifetimeSpend) return null;
  if (eligibility.minOrdersPlaced && user.ordersPlaced < eligibility.minOrdersPlaced) return null;
  if (eligibility.firstOrderOnly && user.ordersPlaced > 0) return null;
  if (eligibility.allowedCountries && !eligibility.allowedCountries.includes(user.country)) return null;
  if (eligibility.minCartValue && cartValue < eligibility.minCartValue) return null;
  if (eligibility.minItemsCount && itemsCount < eligibility.minItemsCount) return null;
  
  if (eligibility.applicableCategories) {
    const hasApplicableCategory = eligibility.applicableCategories.some(cat => categories.includes(cat));
    if (!hasApplicableCategory) return null;
  }
  
  if (eligibility.excludedCategories) {
    const hasExcludedCategory = eligibility.excludedCategories.some(cat => categories.includes(cat));
    if (hasExcludedCategory) return null;
  }

  let discount = 0;
  if (coupon.discountType === 'FLAT') {
    discount = coupon.discountValue;
  } else if (coupon.discountType === 'PERCENT') {
    discount = (cartValue * coupon.discountValue) / 100;
    if (coupon.maxDiscountAmount) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
  }

  return { coupon, discount };
};