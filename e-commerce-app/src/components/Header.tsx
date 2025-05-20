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
              href="/bestDeals"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Best Deals
            </a>
            {isAdmin && (
              <button
                onClick={handleLogout}
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Log Out
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
