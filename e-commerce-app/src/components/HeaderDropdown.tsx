import { useState } from "react";

// Your existing dropdownData structure
const dropdownData = {
  buyUsed: {
    title: "Buy Used Phones",
    items: [
      { name: "Nearby Deals", icon: "📍", href: "/nearby-deals" },
      { name: "Best Deals", icon: "🔥", href: "/best-deals" },
      { name: "With Warranty", icon: "🛡️", href: "/warranty-phones" },
      { name: "Refurbished Phones", icon: "♻️", href: "/refurbished" },
      { name: "Premium Collection", icon: "⭐", href: "/premium" },
      { name: "Budget Friendly", icon: "💰", href: "/budget" },
    ],
  },
  sellUsed: {
    title: "Sell Used Phones",
    items: [
      { name: "Compare Prices", icon: "📊", href: "/compare-sell-prices" },
      { name: "Sell Your Phone", icon: "📱", href: "/sell-phone" },
      { name: "Nearby Stores", icon: "🏪", href: "/nearby-stores" },
      { name: "Top Brands", icon: "🏆", href: "/top-brands-sell" },
      { name: "Quick Quote", icon: "⚡", href: "/quick-quote" },
      { name: "Pickup Service", icon: "🚚", href: "/pickup-service" },
    ],
  },
  comparePrices: {
    title: "Compare Prices",
    items: [
      { name: "Phone Comparison", icon: "🔍", href: "/phone-comparison" },
      { name: "Price History", icon: "📈", href: "/price-history" },
      { name: "Market Trends", icon: "📊", href: "/market-trends" },
      { name: "Brand Comparison", icon: "🏷️", href: "/brand-comparison" },
      { name: "Feature Analysis", icon: "⚙️", href: "/feature-analysis" },
    ],
  },
  services: {
    title: "Services",
    items: [
      { name: "Phone Repair", icon: "🔧", href: "/repair-service" },
      { name: "Screen Protection", icon: "🛡️", href: "/screen-protection" },
      { name: "Data Transfer", icon: "📲", href: "/data-transfer" },
      { name: "Insurance", icon: "🏥", href: "/phone-insurance" },
      { name: "Accessories", icon: "🎧", href: "/accessories" },
      { name: "Trade-in Program", icon: "🔄", href: "/trade-in" },
    ],
  },
  accessories: {
    title: "Accessories",
    items: [
      { name: "Phone Cases", icon: "📱", href: "/cases" },
      { name: "Chargers & Cables", icon: "🔌", href: "/chargers" },
      { name: "Wireless Earbuds", icon: "🎧", href: "/earbuds" },
      { name: "Screen Protectors", icon: "🖥️", href: "/screen-protectors" },
      { name: "Power Banks", icon: "🔋", href: "/power-banks" },
      { name: "Smart Watches", icon: "⌚", href: "/smart-watches" }
    ],
  },
  financing: {
    title: "Financing Options",
    items: [
      { name: "EMI Plans", icon: "💳", href: "/emi-plans" },
      { name: "No-Cost EMI", icon: "🆓", href: "/no-cost-emi" },
      { name: "Exchange Offers", icon: "🔄", href: "/exchange-offers" },
      { name: "Corporate Plans", icon: "🏢", href: "/corporate-plans" },
      { name: "Student Discounts", icon: "🎓", href: "/student-discounts" },
      { name: "Credit Card Offers", icon: "💲", href: "/credit-card-offers" }
    ],
  },
  more: {
    title: "More",
    items: [
      { name: "About Us", icon: "ℹ️", href: "/about" },
      { name: "Contact Support", icon: "💬", href: "/support" },
      { name: "Blog & News", icon: "📰", href: "/blog" },
      { name: "Help Center", icon: "❓", href: "/help" },
      { name: "Terms & Conditions", icon: "📋", href: "/terms" },
      { name: "Privacy Policy", icon: "🔒", href: "/privacy" },
    ],
  },
};

export default function HeaderDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Bottom Dropdown Navigation */}
      <div
        className="bg-gray-800 border-t border-yellow-400/30"
        id="dropdown-navigation"
      >
        <div className="container mx-auto px-6">
          <div
            className="flex justify-center space-x-10 py-3"
            id="dropdown-nav-container"
          >
            {Object.entries(dropdownData).map(([key, data]) => (
              <div
                key={key}
                className="relative group"
                id={`dropdown-group-${key}`}
                onMouseEnter={() => toggleDropdown(key)}
                onMouseLeave={closeDropdowns}
              >
                {/* Trigger Button */}
                <button
                  className="flex items-center space-x-2 px-5 py-3 text-yellow-400 hover:text-yellow-300 transition-all duration-200 font-medium text-[15px] tracking-wide"
                  id={`dropdown-trigger-${key}`}
                >
                  <span>{data.title}</span>
                  <svg
                    className={`w-4 h-4 text-yellow-400/60 transform transition-transform ${
                      activeDropdown === key ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                {activeDropdown === key && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-gray-900 rounded-xl shadow-2xl border border-yellow-400/20 ring-1 ring-white/5 backdrop-blur-sm z-50"
                    id={`dropdown-panel-${key}`}
                    style={{
                      animation: "fadeIn 0.2s ease-in",
                      marginTop: "-14px",
                    }}
                  >
                    <div className="p-4 bg-gradient-to-r from-yellow-400/5 to-yellow-400/10 border-b border-yellow-400/10">
                      <h3 className="text-yellow-400 font-semibold text-sm tracking-wide">
                        {data.title}
                      </h3>
                    </div>
                    <div className="p-2 space-y-1">
                      {data.items.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-yellow-400/10 hover:text-white rounded-lg transition-all duration-200 group"
                          id={`dropdown-link-${key}-${index}`}
                        >
                          <span className="text-xl transition-transform duration-200 group-hover:scale-110">
                            {item.icon}
                          </span>
                          <span className="flex-1 font-medium">
                            {item.name}
                          </span>
                          <svg
                            className="w-4 h-4 text-yellow-400/40 group-hover:text-yellow-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
