import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/authContext";
import path from "path";




const Header = () => {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const [isAdminPage, setIsAdminPage] = useState(false);


  if (loading) return <div>Loading...</div>;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    router.replace("/login");
  };

  const handleAdminLogout = async () => {
    console.log("logging out");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      setUser(null);
      router.replace("/login");
    } else {
      alert("Admin Logout failed, Try Again");
    }
  };
  const handleUserLogout = async () => {
    console.log("logging out");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      setUser(null);
      window.location.href = "/";
    } else {
      alert("User Logout failed, Try Again");
    }
  };
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("logging out");
    console.log("user role: ", user?.role);

    if (user?.role == "admin") {
      await handleAdminLogout();
    }
    if (user?.role == "user") {
      await handleUserLogout();
    }
  };



  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/admin") {
      setIsAdminPage(true);
    }
  }, [pathname]);



  return (
    

      <header className="relative bg-white shadow-xl border-b-4 border-yellow-400 top-0 z-50 overflow-visible" id="main-header">
  {/* Subtle background pattern */}
  <div className="absolute inset-0 opacity-5">
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "40px 40px",
      }}
    ></div>
  </div>

       <div className="container mx-auto px-6 py-4 relative z-10">
    <nav className="flex flex-col lg:flex-row justify-between items-center gap-6" id="main-navigation">
          {/* Logo Section */}
              <div className="flex items-center gap-4 group" id="logo-section">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
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
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>
        <div>
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
            ORU
          </h1>
          <p className="text-yellow-600 text-sm font-bold tracking-wider uppercase">
            Premium Phones
          </p>
        </div>
      </div>

          {/* Navigation Menu */}

           <div className="flex items-center gap-8" id="main-nav-controls">
            {/* Navigation Links */}
            {!isAdminPage && (
               <div className="hidden lg:flex items-center gap-2 bg-gray-50 backdrop-blur-md rounded-2xl p-2 border border-gray-200 shadow-lg" id="desktop-nav-container">
            <a
              href="/"
              id="header-link-home"
              className="px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold rounded-xl hover:bg-yellow-100 transition-all duration-300 hover:scale-105 active:scale-95"
            >
                  Home
                </a>
                 <a
              href="/bestDeals"
              id="header-link-best-deals"
              className="px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold rounded-xl hover:bg-yellow-100 transition-all duration-300 hover:scale-105 active:scale-95 relative group"
            >
                  Best Deals
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse"></span>
            </a>
              </div>
            )}

            {/* Admin Links */}
            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-3 text-white hover:bg-white/10 rounded-xl transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logout Button */}

            {user ? (
              <div className="relative group" id="logout-button-container">
            <button
              onClick={handleLogout}
              id="logout-button"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Log Out
            </button>
          </div>
            ) : (
              <div className="relative group" id="login-button-container">
            <button
              onClick={handleLogin}
              id="login-button"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8l-4 4m0 0l4 4m-4-4h14m-6-4V7a3 3 0 013-3h4a3 3 0 013 3v10a3 3 0 01-3 3h-4a3 3 0 01-3-3v-1"
                />
              </svg>
              Log In
            </button>
          </div>
            )}

            {/* Search Icon */}
            <div className="flex items-center gap-2" id="action-icons-container">
          <button 
            className="p-3 text-gray-600 hover:text-gray-800 hover:bg-yellow-100 rounded-xl transition-all duration-200 hover:scale-105"
            id="search-button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

            {/* Cart Icon with Badge */}
            <button 
            className="relative p-3 text-gray-600 hover:text-gray-800 hover:bg-yellow-100 rounded-xl transition-all duration-200 hover:scale-105"
            id="cart-button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
              />
            </svg>
            <span 
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-xs font-bold text-white rounded-full flex items-center justify-center animate-bounce"
              id="cart-badge"
            >
              3
            </span>
          </button>
        </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}

        {user?.role !== "admin" && (
          <div 
        className="lg:hidden mt-6 p-4 bg-gray-50 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
        id="mobile-nav-menu"
      >
        <div className="flex flex-col gap-2">
          <a
            href="/"
            id="mobile-home-link"
            className="px-4 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-yellow-100 transition-all duration-300"
          >
            Home
          </a>
          <a
            href="/bestDeals"
            id="mobile-best-deals-link"
            className="px-4 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-yellow-100 transition-all duration-300 flex items-center justify-between"
          >
            Best Deals
            <span className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse"></span>
          </a>
        </div>
      </div>
        )}
      </div>

       {/* Yellow accent border */}
  <div 
    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
    id="header-accent-border"
  ></div>
    </header>





    
  );
};

export default Header;
