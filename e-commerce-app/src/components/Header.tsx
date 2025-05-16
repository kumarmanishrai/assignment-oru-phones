// import Link from "next"
const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-600">ORU Phones</h2>
          
          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <a 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a 
              href="/best-deals" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Best Deals
            </a>
            <a 
              href="/admin" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Admin
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
