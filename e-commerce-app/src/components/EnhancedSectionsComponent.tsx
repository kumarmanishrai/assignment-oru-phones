export default function EnhancedSectionsComponent() {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br min-h-screen">
      {/* Row 1: Enhanced Quick Links */}
      <section id="quick-links-section" className="mb-16">
        <div id="quick-links-header" className="text-center mb-8">
          <h2 id="quick-links-title" className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Quick Links
          </h2>
          <p id="quick-links-subtitle" className="text-gray-600 text-lg">Navigate to popular sections with ease</p>
        </div>
        
        <div id="quick-links-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { name: "Apple Phones", icon: "🍎", color: "from-gray-700 to-gray-900", id: "apple-phones-link" },
            { name: "Samsung Phones", icon: "📱", color: "from-blue-500 to-blue-600", id: "samsung-phones-link" },
            { name: "Admin Panel", icon: "⚙️", color: "from-purple-500 to-purple-600", id: "admin-panel-link" },
            { name: "OnePlus Phones", icon: "🔴", color: "from-red-500 to-red-600", id: "oneplus-phones-link" },
            { name: "Google Pixel", icon: "🎨", color: "from-green-500 to-green-600", id: "google-pixel-link" },
            { name: "Xiaomi Phones", icon: "⚡", color: "from-orange-500 to-orange-600", id: "xiaomi-phones-link" },
            { name: "Price Calculator", icon: "💰", color: "from-yellow-500 to-yellow-600", id: "price-calculator-link" }
          ].map((link) => (
            <a
              href="#"
              key={link.name}
              id={link.id}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-yellow-200"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="p-6 text-center relative z-10">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 text-lg mb-2">
                  {link.name}
                </h3>
                <div className={`w-0 group-hover:w-12 h-1 bg-gradient-to-r ${link.color} transition-all duration-300 mx-auto rounded-full`}></div>
              </div>
              
              {/* Subtle animation overlay */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Row 2: Enhanced Action Buttons */}
      <section id="actions-section">
        <div id="actions-header" className="text-center mb-8">
          <h2 id="actions-title" className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Actions
          </h2>
          <p id="actions-subtitle" className="text-gray-600 text-lg">Perform key operations instantly</p>
        </div>
        
        <div id="actions-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Primary Actions - Larger buttons */}
          <div id="primary-actions" className="col-span-1 md:col-span-2 lg:col-span-3">
            <h3 id="primary-actions-label" className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              Primary Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button id="sell-phone-button" className="group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-8 h-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="relative z-10 text-lg">Sell a Phone</span>
                <span className="relative z-10 text-sm opacity-80">Get instant quotes</span>
              </button>

              <button id="track-orders-button" className="group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-8 h-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span className="relative z-10 text-lg">Track Orders</span>
                <span className="relative z-10 text-sm opacity-80">Real-time updates</span>
              </button>

              <button id="customer-support-button" className="group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-2xl shadow-xl hover:shadow-gray-500/40 hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-8 h-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <span className="relative z-10 text-lg">Customer Support</span>
                <span className="relative z-10 text-sm opacity-80">24/7 assistance</span>
              </button>
            </div>
          </div>

          {/* Secondary Actions - Smaller buttons */}
          <div id="secondary-actions" className="col-span-1 md:col-span-2 lg:col-span-3 mt-8">
            <h3 id="secondary-actions-label" className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <button id="buy-phone-button" className="group px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16v0a1 1 0 001 1h11M9 19a2 2 0 11-4 0 2 2 0 014 0zM20 19a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Buy Phone
              </button>

              <button id="compare-prices-button" className="group px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Compare
              </button>

              <button id="phone-repair-button" className="group px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Repair
              </button>

              <button id="trade-in-button" className="group px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
                Trade In
              </button>

              <button id="warranty-check-button" className="group px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-xl shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Warranty
              </button>

              <button id="phone-insurance-button" className="group px-6 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Insurance
              </button>

              <button id="reviews-ratings-button" className="group px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-xl shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
                Reviews
              </button>

              <button id="my-account-button" className="group px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Account
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div id="quick-stats-section" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div id="total-phones-stat" className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Phones Listed</p>
                <p className="text-2xl font-bold text-yellow-600">15,234</p>
              </div>
            </div>
          </div>

          <div id="happy-customers-stat" className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Happy Customers</p>
                <p className="text-2xl font-bold text-green-600">8,947</p>
              </div>
            </div>
          </div>

          <div id="transactions-completed-stat" className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transactions Completed</p>
                <p className="text-2xl font-bold text-blue-600">12,456</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}