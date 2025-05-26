
import { useState } from 'react';

const FilterSideBar = () => {
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    price: true,
    specs: false,
    features: false,
    condition: true,
    location: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    price: '',
    ram: [],
    storage: [],
    condition: '',
    location: '',
    features: [],
    network: []
  });

  const clearAllFilters = () => {
    setSelectedFilters({
      brands: [],
      price: '',
      ram: [],
      storage: [],
      condition: '',
      location: '',
      features: [],
      network: []
    });
  };

  return (
    <aside className="w-full h-full bg-gradient-to-br from-slate-50 to-yellow-50 border-r border-gray-200 shadow-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h2>
            <p className="text-yellow-100 text-sm">Find your perfect phone</p>
          </div>
          <button 
            onClick={clearAllFilters}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Quick Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            Quick Filters
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Best Sellers", "Latest", "Budget", "Premium", "Gaming"].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 text-xs bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection('brand')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
              Brand
            </h3>
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedSections.brand ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.brand && (
            <div className="px-4 pb-4 space-y-2">
              {[
                { name: "Apple", count: 45, color: "from-gray-400 to-gray-600" },
                { name: "Samsung", count: 38, color: "from-blue-400 to-blue-600" },
                { name: "OnePlus", count: 22, color: "from-red-400 to-red-600" },
                { name: "Xiaomi", count: 35, color: "from-orange-400 to-orange-600" },
                { name: "Realme", count: 28, color: "from-yellow-400 to-yellow-600" },
                { name: "Google", count: 15, color: "from-green-400 to-green-600" },
                { name: "Nothing", count: 8, color: "from-purple-400 to-purple-600" },
                { name: "Oppo", count: 18, color: "from-pink-400 to-pink-600" }
              ].map((brand) => (
                <label key={brand.name} className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 rounded-lg p-2 transition-all duration-200">
                  <div className="flex items-center gap-3 ">
                    <input 
                      type="checkbox" 
                      id={`phone-brand-name-${brand.name}`}
                      className="w-4 h-4 text-yellow-600 border-2 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2" 
                    />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{brand.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">({brand.count})</span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${brand.color} pointer-events-none`}></div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection('price')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></div>
              Price Range
            </h3>
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedSections.price ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.price && (
            <div className="px-4 pb-4 space-y-2">
              {[
                { range: "Under ₹10,000", count: 45, color: "bg-green-100 text-green-800" },
                { range: "₹10,000 - ₹30,000", count: 67, color: "bg-blue-100 text-blue-800" },
                { range: "₹30,000 - ₹60,000", count: 34, color: "bg-yellow-100 text-yellow-800" },
                { range: "₹60,000 - ₹1,00,000", count: 23, color: "bg-purple-100 text-purple-800" },
                { range: "Above ₹1,00,000", count: 12, color: "bg-red-100 text-red-800" }
              ].map((price, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 rounded-lg p-2 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="price" 
                      id={`phone-price-${price.range}`}
                      className="w-4 h-4 text-yellow-600 border-2 border-gray-300 focus:ring-yellow-500 focus:ring-2" 
                    />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{price.range}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${price.color}`}>
                    {price.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection('specs')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
              Specifications
            </h3>
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedSections.specs ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.specs && (
            <div className="px-4 pb-4 space-y-4">
              {/* RAM */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">RAM</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["3 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB+"].map((ram) => (
                    <label key={ram} className="flex items-center gap-2 cursor-pointer">
                      <input id={`phone-ram-${ram}`} type="checkbox" className="w-3 h-3 text-yellow-600 border border-gray-300 rounded focus:ring-yellow-500" />
                      <span className="text-sm text-gray-700">{ram}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Storage */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Storage</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["32 GB", "64 GB", "128 GB", "256 GB", "512 GB", "1 TB"].map((storage) => (
                    <label key={storage} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id={`phone-storage-${storage}`} className="w-3 h-3 text-yellow-600 border border-gray-300 rounded focus:ring-yellow-500" />
                      <span className="text-sm text-gray-700">{storage}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Screen Size */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Screen Size</h4>
                <div className="space-y-1">
                  {["Under 5.5\"", "5.5\" - 6.0\"", "6.0\" - 6.5\"", "6.5\" - 7.0\"", "Above 7.0\""].map((size, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id={`phone-screen-size-${size}`} className="w-3 h-3 text-yellow-600 border border-gray-300 rounded focus:ring-yellow-500" />
                      <span className="text-sm text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection('features')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
              Features
            </h3>
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedSections.features ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.features && (
            <div className="px-4 pb-4 space-y-2">
              {[
                { name: "5G Network", icon: "📶" },
                { name: "Wireless Charging", icon: "🔋" },
                { name: "Water Resistant", icon: "💧" },
                { name: "Face Unlock", icon: "👤" },
                { name: "Fingerprint", icon: "👆" },
                { name: "Fast Charging", icon: "⚡" },
                { name: "Dual SIM", icon: "📱" },
                { name: "NFC", icon: "💳" },
                { name: "Headphone Jack", icon: "🎧" },
                { name: "MicroSD Slot", icon: "💾" }
              ].map((feature) => (
                <label key={feature.name} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 rounded-lg p-2 transition-all duration-200">
                  <input type="checkbox" id={`phone-features-${feature.name}`} className="w-4 h-4 text-yellow-600 border-2 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2" />
                  <span className="text-lg">{feature.icon}</span>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{feature.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection('condition')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
              Condition
            </h3>
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedSections.condition ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.condition && (
            <div className="px-4 pb-4 space-y-2">
              {[
                { name: "Brand New", badge: "✨", color: "text-green-600" },
                { name: "Like New", badge: "🌟", color: "text-blue-600" },
                { name: "Excellent", badge: "👍", color: "text-purple-600" },
                { name: "Good", badge: "👌", color: "text-yellow-600" },
                { name: "Fair", badge: "⚠️", color: "text-orange-600" },
                { name: "For Parts", badge: "🔧", color: "text-red-600" }
              ].map((condition, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 rounded-lg p-2 transition-all duration-200">
                  <input type="radio" id={`phone-condition-${condition.name}`} name="condition" className="w-4 h-4 text-yellow-600 border-2 border-gray-300 focus:ring-yellow-500 focus:ring-2" />
                  <span className="text-lg">{condition.badge}</span>
                  <span className={`font-medium group-hover:text-gray-900 transition-colors duration-200 ${condition.color}`}>{condition.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection('location')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
              Location
            </h3>
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedSections.location ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.location && (
            <div className="px-4 pb-4">
              <select className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white">
                <option id='location-all' value="">🌍 All Locations</option>
                <option value="delhi">🏛️ Delhi NCR</option>
                <option value="mumbai">🏢 Mumbai</option>
                <option value="bangalore">🌆 Bangalore</option>
                <option value="hyderabad">🏙️ Hyderabad</option>
                <option value="chennai">🏘️ Chennai</option>
                <option value="pune">🏗️ Pune</option>
                <option value="kolkata">🌉 Kolkata</option>
                <option value="ahmedabad">🏭 Ahmedabad</option>
              </select>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Use current location</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white border-t border-gray-200 space-y-3">
        <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Apply Filters
        </button>
        <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset All
        </button>
      </div>
    </aside>
  );
};

export default FilterSideBar;
