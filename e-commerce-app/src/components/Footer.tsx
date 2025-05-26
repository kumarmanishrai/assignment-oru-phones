const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/40 to-orange-100/40"></div>
  <div className="absolute top-0 left-0 w-full h-full">
    <div className="absolute top-12 left-16 w-32 h-32 bg-yellow-300/10 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute top-24 right-24 w-24 h-24 bg-amber-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-12 left-1/3 w-40 h-40 bg-orange-300/10 rounded-full blur-xl animate-pulse delay-500"></div>
  </div>

      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
               <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-600 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  ORU
                </h3>
                <p className="text-yellow-600 text-xs font-medium tracking-wider uppercase">
                  Premium Phones
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Your trusted destination for premium smartphones. We offer the
              latest devices with unbeatable prices and exceptional customer
              service.
            </p>
            <div className="flex gap-4">
              <a
                id="twitter-icon"
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-gray-800 hover:scale-110 transition-all duration-300"
              >
                {/* Twitter icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              <a
                id="youtube-icon"
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-gray-800 hover:scale-110 transition-all duration-300"
              >
                {/* YouTube icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-1.735-.43-8.495-.43-8.495-.43s-6.76 0-8.495.43C1.218 3.615 0 5.066 0 7.007v9.986c0 1.94 1.218 3.392 2.625 3.823 1.735.43 8.495.43 8.495.43s6.76 0 8.495-.43C22.782 20.385 24 18.934 24 16.993V7.007c0-1.94-1.218-3.392-2.625-3.823zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                id="reddit-icon"
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-gray-800 hover:scale-110 transition-all duration-300"
              >
                {/* Reddit icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z.017 0z" />
                </svg>
              </a>

              <a
                id="google-icon"
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-gray-800 hover:scale-110 transition-all duration-300"
              >
                {/* Google icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Buy Phones Section */}
          <div>
            <h4 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full"></div>
              Buy Phones
            </h4>

            <div className="space-y-3">
              {[
                "Buy Apple Phone",
                "Buy Samsung Phone",
                "Buy OnePlus Phone",
                "Buy Google Pixel",
                "Buy Xiaomi Phone",
                "Buy Huawei Phone",
                "Buy Oppo Phone",
                "Buy Vivo Phone",
                "Buy Realme Phone",
                "Buy Nothing Phone",
              ].map((buy_phone_name) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  id={`buy-phone-link-${buy_phone_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="block text-gray-700 hover:text-gray-800 hover:translate-x-2 transition-all duration-300 text-sm"
                  key={buy_phone_name}
                >
                  {buy_phone_name}
                </a>
              ))}
            </div>
          </div>

          {/* Sell Phones Section */}
          <div>
            <h4 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-teal-500 rounded-full"></div>
              Sell Phones
            </h4>
            <div className="space-y-3">
              {[
                "Sell Apple Phone",
                "Sell Samsung Phone",
                "Sell Redmi Phone",
                "Sell OnePlus Phone",
                "Sell Google Pixel",
                "Sell Xiaomi Phone",
                "Sell Huawei Phone",
                "Sell Oppo Phone",
                "Sell Vivo Phone",
                "Sell Motorola Phone",
              ].map((sell_phone_name) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  key={`sell-phone-link-${sell_phone_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  id={`sell-phone-link-${sell_phone_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="block text-gray-700 hover:text-gray-800 hover:translate-x-2 transition-all duration-300 text-sm"
                >
                  {sell_phone_name}
                </a>
              ))}
            </div>
          </div>

          {/* Services & Support */}
          <div>
            <h4 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
              Services & Support
            </h4>
            <div className="space-y-3">
              {[
                "Flagship Phones",
                "Budget Phones",
                "Gaming Phones",
                "Camera Phones",
                "Business Phones",
                "5G Phones",
              ].map((services) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  key={`services-link-${services
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  id={`services-link-${services
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="block text-gray-700 hover:text-gray-800 hover:translate-x-2 transition-all duration-300 text-sm"
                >
                  {services}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-white/10 mb-8">
          {/* Phone Categories */}
          <div>
            <h4 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-red-500 rounded-full"></div>
              Categories
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Phone Repair",
                "Screen Replacement",
                "Battery Replacement",
                "Phone Insurance",
                "Trade-in Program",
                "Warranty Service",
                "Customer Support",
                "Live Chat",
                "Phone Consultation",
                "Technical Support",
              ].map((category_name) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  key={`category-link-${category_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  id={`category-link-${category_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-800 hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {category_name}
                </a>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <h4 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-yellow-500 rounded-full"></div>
              Accessories
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Phone Cases",
                "Screen Protectors",
                "Wireless Chargers",
                "Power Banks",
                "Headphones",
                "Bluetooth Speakers",
              ].map((accessories_name) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  id={`accessories-link-${accessories_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  key={`accessories-link-${accessories_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-800 hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {accessories_name}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
              Company
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                "About Us",
                "Careers",
                "Contact Us",
                "Store Locator",
                "Blog",
                "News",
              ].map((company_link) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  id={`company-link-${company_link
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  key={`company-link-${company_link
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-800 hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {company_link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-yellow-100/60 to-orange-100/60 rounded-2xl p-8 mb-8 border border-yellow-200 backdrop-blur-md">
      <div className="text-center mb-6">
        <h4 className="text-yellow-700 font-bold text-2xl mb-2">Stay Updated</h4>
        <p className="text-gray-700">
          Get the latest deals and phone releases delivered to your inbox
        </p>
      </div>
          <div className="flex gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-md"
        />
        <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 active:scale-95">
          Subscribe
        </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <p className="text-gray-400">
                © {currentYear} ORU Phones. All rights reserved.
              </p>
              <a
                href="/#"
                id="privacy"
                className="text-gray-700 hover:text-gray-800 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                id="terms"
                className="text-gray-700 hover:text-gray-800 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                id="cookies"
                className="text-gray-700 hover:text-gray-800 transition-colors duration-200"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                id="sitemap"
                className="text-gray-700 hover:text-gray-800 transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 text-sm">Secure Payment</span>
              <div className="flex gap-2">
                <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-800 font-bold">💳</span>
                </div>
                <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-800 font-bold">🔒</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
