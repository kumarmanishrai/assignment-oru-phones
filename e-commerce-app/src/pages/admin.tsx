import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import AdminCharts from "../components/AdminChart";
import dotenv from "dotenv";
dotenv.config();

import { useEffect, useState } from "react";
interface AggregatedReport {
  totalUsers: number;
  topPages: { url: string; count: number }[];
  avgTimePerPage: number;
  deviceClicks: { device: string; count: number }[];
  topButtons: { label: string; count: number }[];
  deviceCategories: { category: string; count: number }[];
  loggedIn: number;
  loggedOut: number;
}

const Admin = () => {
  // const [report, setReport] = useState<AggregatedReport | null>(null);
  const [report, setReport] = useState<AggregatedReport | null>({
    totalUsers: 0,
    loggedIn: 0,
    loggedOut: 0,
    topPages: [],
    avgTimePerPage: 0,
    deviceClicks: [],
    topButtons: [],
    deviceCategories: [],
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const authenticateAdmin = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        router.push("/login");
      } else {
        setIsAdminAuthenticated(true);
      }
    };

    authenticateAdmin();
  }, []);

  useEffect(() => {
    if (!isAdminAuthenticated) return;
    const fetchReport = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/report`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch report");

        const data = await res.json();
        setReport(data);
        console.log(report);
      } catch (err) {
        console.error("Error fetching admin report:", err);
      }
    };
    fetchReport();
  }, [isAdminAuthenticated]);

  return (
    <>
      {isAdminAuthenticated && (
        <>
          <Header />

          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Last updated: Just now</span>
                </div>
              </div>

              {!report ? (
                
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
                    <p className="text-gray-500">Loading report...</p>
                  </div>
                </div>
              ) : (
                <>
                <AdminCharts report={report} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Total Unique Users Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white hover:border-blue-100 group">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Total Unique Users
                      </h2>
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {report?.totalUsers}
                    </p>
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      +12% from last week
                    </div>
                  </div>

                  {/* Logged In vs Logged Out Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white hover:border-blue-100 group">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        User Sessions
                      </h2>
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-sm text-green-700 mb-1">Logged In</p>
                        <p className="text-2xl font-bold text-green-800">
                          {report?.loggedIn}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3">
                        <p className="text-sm text-blue-700 mb-1">Logged Out</p>
                        <p className="text-2xl font-bold text-blue-800">
                          {report?.loggedOut}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top Visited Pages Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white hover:border-blue-100 group col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Top Visited Pages
                      </h2>
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {report?.topPages?.map((page, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <div className="flex items-center">
                            <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center mr-3 font-medium">
                              {idx + 1}
                            </span>
                            <span className="font-medium text-gray-800 truncate max-w-xs">
                              {page.url}
                            </span>
                          </div>
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {page.count} visits
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Avg Time/Page Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white hover:border-blue-100 group">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Avg Time/Page
                      </h2>
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {report?.avgTimePerPage}{" "}
                      <span className="text-xl text-gray-500">seconds</span>
                    </p>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            report?.avgTimePerPage / 2
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Top Devices Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white hover:border-blue-100 group">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Top Devices
                      </h2>
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {report?.deviceClicks?.map((d, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{d.device}</span>
                          <span className="font-medium text-gray-900">
                            {d.count}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Top Buttons Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white hover:border-blue-100 group">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Top Buttons
                      </h2>
                      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {report?.topButtons?.map((b, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{b.label}</span>
                          <span className="font-medium text-gray-900">
                            {b.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Categories Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white hover:border-blue-100 group">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Device Categories
                      </h2>
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {report?.deviceCategories?.map((c, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{c.category}</span>
                          <span className="font-medium text-gray-900">
                            {c.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Admin;
