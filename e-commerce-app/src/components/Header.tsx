import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from 'dotenv'
dotenv.config()

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/logout/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Logout failed, Try Again");
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/admin")) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 shadow-2xl top-0 z-20 overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
  <div className="absolute top-0 left-0 w-full h-full">
    <div className="absolute top-4 left-12 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute top-8 right-20 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-4 left-1/3 w-40 h-40 bg-indigo-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
  </div>
  
  {/* Subtle pattern overlay */}
  <div className="absolute inset-0 opacity-5">
    <div className="w-full h-full" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '30px 30px'
    }}></div>
  </div>

  <div className="container mx-auto px-6 py-8 relative z-10">
    <nav className="flex flex-col lg:flex-row justify-between items-center gap-6">
      
      {/* Logo Section */}
      <div className="flex items-center gap-4 group">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>
        <div>
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight">
            ORU
          </h1>
          <p className="text-blue-200 text-sm font-medium tracking-wider uppercase">Premium Phones</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center gap-8">
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
          <a
            href="/"
            className="px-6 py-3 text-white/90 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Home
          </a>
          <a
            href="/bestDeals"
            className="px-6 py-3 text-white/90 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 relative group"
          >
            Best Deals
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse"></span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-3 text-white hover:bg-white/10 rounded-xl transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Admin Logout Button */}
        {isAdmin && (
          <div className="relative group">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
        )}

        {/* Search Icon */}
        <button className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-105">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Cart Icon with Badge */}
        <button className="relative p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-105">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs font-bold text-white rounded-full flex items-center justify-center animate-bounce">
            3
          </span>
        </button>
      </div>
    </nav>

    {/* Mobile Navigation Menu */}
    <div className="md:hidden mt-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
      <div className="flex flex-col gap-2">
        <a
          href="/"
          className="px-4 py-3 text-white/90 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
        >
          Home
        </a>
        <a
          href="/bestDeals"
          className="px-4 py-3 text-white/90 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-between"
        >
          Best Deals
          <span className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse"></span>
        </a>
      </div>
    </div>
  </div>

  {/* Bottom Border Gradient */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>
</header>
  );
};

export default Header;
