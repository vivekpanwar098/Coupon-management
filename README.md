📦 Coupon Management App
A simple and clean Coupon Management System built using React + Vite + Tailwind CSS.
This project helps you create, apply, and manage discount coupons in a shopping cart–like interface.
🚀 Features
🎟 Coupon Features
Create new coupon codes
Supports percentage and flat discount
Apply coupon on total amount
Automatically validates coupon expiry
Prevents invalid / expired / repeated coupons
🛒 Cart Features
Add multiple items
Update item quantity
Dynamic price calculation
Remove items instantly
💡 App Features
Clean and responsive UI
Fast development using Vite
Modern styling using Tailwind CSS
Fully component-based code structure
🛠 Tech Stack
React JS
Vite
Tailwind CSS
JavaScript (ES6+)
📁 Folder Structure
coupon-management/
│── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│── public/
│── package.json
│── tailwind.config.js
│── vite.config.js
🔧 Installation & Setup
1️⃣ Clone the project
git clone https://github.com/vivekpanwar098/coupon-management.git
cd coupon-management
2️⃣ Install dependencies
npm install
3️⃣ Run the development server
npm run dev
Now open:
👉 http://localhost:5173
🖼 Screenshots
(आप चाहो तो बाद में अपनी स्क्रीनशॉट्स यहाँ जोड़ सकते हो)
📌 /screenshots/home.png
📌 /screenshots/apply-coupon.png
🧩 How Coupon Logic Works
User creates coupon with a name, type & discount
App checks if the coupon:
✔ exists
✔ is not expired
✔ matches correct format
On success → discount applied
On failure → proper error shown
🛡 Troubleshooting
❗ Vite Pre-transform Error
If you see:
[vite] error: Failed to load url /src/...
👉 यह 99% time wrong import path होता है
Fix: check your component imports.
❗ Blank Screen
Run:
npm run dev
Then check terminal for errors.
🤝 Contributing
Feel free to open issues or submit pull requests.
Any improvements are welcome!
