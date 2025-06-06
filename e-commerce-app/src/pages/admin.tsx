import React, { JSX } from "react";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  UserIcon,
  EyeIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import FilterCharts from "../components/FilterCharts";
import Header from "@/components/Header";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

interface ReportData {
  totalUsers: number;
  topUsers: { userId: string; count: number }[];
  topPages: { url: string; count: number }[];
  avgTime: number;
  phoneBrands: { label: string; count: number }[];
  phoneRam: { label: string; count: number }[];
  phoneStorage: { label: string; count: number }[];
  phonePriceRange: { label: string; count: number }[];
  phoneScreenSize: { label: string; count: number }[];
  phoneCondition: { label: string; count: number }[];
  phoneFeatures: { label: string; count: number }[];
  links: { label: string; count: number }[];
  topButtons: { label: string; count: number }[];
  loggedIn: number;
  loggedOut: number;
  averageTimePerPage: { page: string; time: number }[];
  avgScroll: number;
  scrollDepth: number;
}

interface PageAnalytics {
  url: string;
  totalVisits: number;
  avgTimeInSession: number;
  avgScroll: number;
  topButtons: { count: number; label: string }[];
  topLinks: { count: number; label: string }[];
  topFilters: { count: number; label: string }[];
}

interface UserAnalytics {
  userId: string;
  averageTimePerPage: { page: string; time: number }[];
  avgTime: number;
  avgScroll: number;
  topButtons: { count: number; label: string }[];
  topLinks: { count: number; label: string }[];
  topFilters: { count: number; label: string }[];
  topPages: { url: string; count: number }[];
  email: string;
}

interface UserLogInAnalytics {
  loggedInUsers: number;
  loggedOutUsers: number;
}

const AdminDashboard = () => {
  const [data, setData] = useState<ReportData | null>(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [userLogInData, setUserLogInData] = useState<UserLogInAnalytics | null>(
    null
  );
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const [pageAnalytics, setPageAnalytics] = useState<PageAnalytics | null>(
    null
  );

  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(
    null
  );

  const [isPageAnalyticsModalOpen, setIsPageAnalyticsModalOpen] =
    useState(false);
  const [isUserAnalyticsModalOpen, setIsUserAnalyticsModalOpen] =
    useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/report?fromDate=${fromDate}&toDate=${toDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const reportData: ReportData = await res.json();
      console.log("Fetched report data:", reportData);
      setData(reportData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFetchByDate = async () => {
    try {
      // Basic validation
      console.log("From Date:", fromDate);
      if (fromDate === "" || toDate === "") {
        setDateError("Both dates are required");
        return;
      }

      if (new Date(fromDate) > new Date(toDate)) {
        setDateError("End date cannot be earlier than start date");
        return;
      }

      if (new Date(fromDate) > new Date() || new Date(toDate) > new Date()) {
        setDateError("Cannot select future dates");
        return;
      }
      setDateError(null); // Clear any previous error
      setData(null); // Reset data before fetching new data
      await fetchData();
    } catch (error) {
      console.error("Error fetching data by date:", error);
    }
  };

  useEffect(() => {
    const fetchUserLoginData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/user/report/user-login`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log("Fetched user login data:", data);
        setUserLogInData(data);
      } catch (error) {
        console.error("Error fetching user login data:", error);
      }
    };

    fetchData();
    fetchUserLoginData();
  }, []);

  useEffect(() => {
    const fetchPageAnalytics = async () => {
      if (!selectedPage) return;
      setLoadingData(true);
      console.log("fromDate:", fromDate);
      console.log("toDate:", toDate);
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API
          }/admin/report/url?url=${encodeURIComponent(
            selectedPage
          )}&fromDate=${fromDate}&toDate=${toDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const analyticsData: PageAnalytics = await res.json();
        console.log("Fetched page analytics data:", analyticsData);
        setPageAnalytics(analyticsData);
        setLoadingData(false);
        setIsPageAnalyticsModalOpen(true);
      } catch (error) {
        console.error("Error fetching page analytics:", error);
      }
    };
    fetchPageAnalytics();
  }, [selectedPage]);

  useEffect(() => {
    const fetchUserAnalytics = async () => {
      if (!selectedUser) return;
      setLoadingData(true);
      console.log("fromDate:", fromDate);
      console.log("toDate:", toDate);
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API
          }/admin/report/userId?userId=${encodeURIComponent(
            selectedUser
          )}&fromDate=${fromDate}&toDate=${toDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const analyticsData: UserAnalytics = await res.json();
        console.log("Fetched user analytics data:", analyticsData);
        setUserAnalytics(analyticsData);
        setLoadingData(false);
        setIsUserAnalyticsModalOpen(true);
      } catch (error) {
        console.error("Error fetching page analytics:", error);
      }
    };
    fetchUserAnalytics();
  }, [selectedUser]);

  const closePageAnalyticsModal = () => {
    setIsPageAnalyticsModalOpen(false);
    setSelectedPage(null);
    setPageAnalytics(null);
  };
  const closeUserAnalyticsModal = () => {
    setIsUserAnalyticsModalOpen(false);
    setSelectedUser(null);
    setUserAnalytics(null);
  };

  if (!data)
    return (
      <div className="relative flex justify-center items-center min-h-screen bg-black overflow-hidden">
        {/* --- Moving Stars --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-[twinkle_3s_infinite] motion-safe:animate-[floatStar_10s_linear_infinite]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* --- Floating Planets --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute w-10 h-10 bg-purple-500 rounded-full top-1/4 left-1/3 animate-[planetFloat_6s_ease-in-out_infinite] opacity-60"></div>
          <div className="absolute w-12 h-12 bg-yellow-400 rounded-full top-2/3 left-1/2 animate-[planetFloat_8s_ease-in-out_infinite] opacity-50"></div>
          <div className="absolute w-6 h-6 bg-blue-400 rounded-full top-1/6 left-3/4 animate-[planetFloat_7s_ease-in-out_infinite] opacity-70"></div>
        </div>

        {/* --- Spinner (on top) --- */}
        <div className="relative z-10 h-20 w-20">
          <div className="absolute h-full w-full border-4 border-t-transparent border-l-transparent border-r-blue-500 border-b-blue-500 rounded-full animate-spin"></div>
          <div className="absolute h-3/4 w-3/4 top-[12.5%] left-[12.5%] border-4 border-t-transparent border-l-transparent border-r-purple-500 border-b-purple-500 rounded-full animate-spin scale-x-[-1]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-pink-400 rounded-full animate-ping"></div>
        </div>

        {/* Tailwind keyframe styles */}
        <style>
          {`
      @keyframes planetFloat {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }

      @keyframes floatStar {
        0% { transform: translateY(0); opacity: 0.7; }
        100% { transform: translateY(100vh); opacity: 0; }
      }

      @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.8; }
      }
    `}
        </style>
      </div>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-blue-50 to-purple-50 p-8">
        {/* loader spinner */}
        {loadingData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-blue-500 animate-spin"></div>
              <div className="absolute inset-1 rounded-full bg-blue-200 opacity-30 blur-2xl animate-ping"></div>
            </div>
          </div>
        )}
        {/* Page Analytics Modal */}
        {isPageAnalyticsModalOpen && pageAnalytics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[51]">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h6 className="text-l md:text-l font-semibold text-slate-900 tracking-tight">
                    {pageAnalytics.url}
                  </h6>
                  <h6 className="text-l md:text-l font-semibold text-slate-900 tracking-tight">
                    {fromDate !== "" &&
                      toDate !== "" &&
                      `from: ${fromDate} - to: ${toDate}`}
                  </h6>
                  <button
                    onClick={closePageAnalyticsModal}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard
                    label="Total Visits"
                    value={pageAnalytics.totalVisits}
                  />
                  <StatCard
                    label="Avg Time (s)"
                    value={pageAnalytics?.avgTimeInSession?.toFixed(1)}
                  />
                  <StatCard
                    label="Avg Scroll %"
                    value={pageAnalytics?.avgScroll?.toFixed(1)}
                  />
                </div>

                {pageAnalytics.topButtons?.length > 0 && (
                  <Card title="Top Buttons">
                    <div className="space-y-2">
                      {pageAnalytics?.topButtons?.map((button, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
                        >
                          <span className="text-slate-700">{button.label}</span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {button.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {pageAnalytics.topLinks?.length > 0 && (
                  <Card title="Top Links">
                    <div className="space-y-2">
                      {pageAnalytics?.topLinks?.map((link, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
                        >
                          <span className="text-slate-700">
                            {link.label || "Unnamed Link"}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {link.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {pageAnalytics.topFilters?.length > 0 && (
                  <Card title="Top Filters">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pageAnalytics?.topFilters?.map((filter, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
                        >
                          <span className="text-slate-700">{filter.label}</span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            {filter.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
        {/* User Analytics Modal */}
        {isUserAnalyticsModalOpen && userAnalytics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h6 className="text-l md:text-l font-semibold text-slate-900 tracking-tight">
                    {userAnalytics.userId?.toString()}:{" "}
                    {userAnalytics.email?.toString()}
                  </h6>
                  <h6 className="text-l md:text-l font-semibold text-slate-900 tracking-tight">
                    {fromDate !== "" &&
                      toDate !== "" &&
                      `from: ${fromDate} - to: ${toDate}`}
                  </h6>
                  <button
                    onClick={closeUserAnalyticsModal}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard
                    label="Total page Visits"
                    value={userAnalytics?.topPages?.length}
                  />
                  <StatCard
                    label="Avg Time (s)"
                    value={userAnalytics?.avgTime?.toFixed(1)}
                  />
                  <StatCard
                    label="Avg Scroll %"
                    value={userAnalytics?.avgScroll?.toFixed(1)}
                  />
                </div>

                {userAnalytics?.averageTimePerPage?.length > 0 && (
                  <Card title="Average Time per Page (seconds)">
                    <Bar
                      data={{
                        labels: userAnalytics?.averageTimePerPage?.map(
                          (p) => p.page
                        ),
                        datasets: [
                          {
                            label: "Time Spent (seconds)",
                            data: userAnalytics?.averageTimePerPage?.map(
                              (p) => p.time
                            ),
                            backgroundColor:
                              userAnalytics?.averageTimePerPage?.map(
                                (_, i) => `hsl(${i * 60 + i * i}, 80%, 45%)`
                              ),
                            borderRadius: 6,
                            borderSkipped: false,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          y: {
                            grid: {
                              color: "#e2e8f0",
                            },
                            ticks: {
                              color: "#64748b",
                            },
                          },
                          x: {
                            grid: { display: false },
                            ticks: { display: false },
                          },
                        },
                      }}
                    />
                  </Card>
                )}
                {userAnalytics.topPages?.length > 0 && (
                  <Card title="Top Pages">
                    <TopPagesList
                      pages={userAnalytics.topPages}
                      onSelect={setSelectedPage}
                      selected={selectedPage}
                    />
                  </Card>
                )}

                {userAnalytics.topButtons?.length > 0 && (
                  <Card title="Top Buttons">
                    <div className="space-y-2">
                      {userAnalytics?.topButtons?.map((button, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
                        >
                          <span className="text-slate-700">{button.label}</span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {button.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {userAnalytics.topLinks?.length > 0 && (
                  <Card title="Top Links">
                    <div className="space-y-2">
                      {userAnalytics?.topLinks?.map((link, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
                        >
                          <span className="text-slate-700">
                            {link.label || "Unnamed Link"}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {link.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {userAnalytics.topFilters?.length > 0 && (
                  <Card title="Top Filters">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {userAnalytics?.topFilters?.map((filter, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
                        >
                          <span className="text-slate-700">{filter.label}</span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            {filter.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="px-6 py-4 mb-8  shadow-sm border-b border-gray-100">
          {/* Header Container */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Left Section - Heading */}
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
              Admin Dashboard
            </h3>

            {/* Right Section - Date Controls */}
            <div className="w-full md:w-auto space-y-2">
              <div className="flex flex-col sm:flex-row items-end gap-3">
                {" "}
                {/* Changed to items-end */}
                {/* From Date */}
                <div className="relative w-full sm:w-48">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    From Date
                  </label>
                  <div className="relative group">
                    <input
                      id="fromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 
                    focus:border-blue-500 focus:outline-none transition-all 
                    duration-200 bg-gray-50 placeholder-gray-400 text-gray-700
                    hover:border-gray-300"
                    />
                    {/* ... keep calendar icon ... */}
                  </div>
                </div>
                {/* To Date */}
                <div className="relative w-full sm:w-48">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    To Date
                  </label>
                  <div className="relative group">
                    <input
                      id="toDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 
                    focus:border-blue-500 focus:outline-none transition-all 
                    duration-200 bg-gray-50 placeholder-gray-400 text-gray-700
                    hover:border-gray-300"
                    />
                    {/* ... keep calendar icon ... */}
                  </div>
                </div>
                {/* Generate Button - Aligned with inputs */}
                <button
                  onClick={handleFetchByDate}
                  className="w-full sm:w-auto h-[42px] mt-[1.9rem] sm:mt-0 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 
                text-white font-medium rounded-lg transition-all duration-200 
                flex items-center gap-2 hover:shadow-md"
                >
                  {/* ... keep button icon ... */}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Generate
                </button>
              </div>

              {/* ... keep error message ... */}
              {dateError && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{dateError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <StatCard label="Total Visits" value={data.totalUsers} />
          <StatCard
            label="Logged In"
            value={userLogInData?.loggedInUsers ?? 0}
          />
          <StatCard
            label="Logged Out"
            value={userLogInData?.loggedOutUsers ?? 0}
          />
          <StatCard label="Avg Scroll %" value={data?.avgScroll?.toFixed(1)} />
          <StatCard label="Avg Time (s)" value={data?.avgTime?.toFixed(1)} />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="Top Pages (More Page data on each button click)">
            <TopPagesList
              pages={data.topPages}
              onSelect={setSelectedPage}
              selected={selectedPage}
            />
          </Card>

          <Card title="Average Time per Page (seconds)">
            <Bar
              data={{
                labels: data?.averageTimePerPage?.map((p) => p.page),
                datasets: [
                  {
                    label: "Time Spent (seconds)",
                    data: data?.averageTimePerPage?.map((p) => p.time),
                    backgroundColor: data?.averageTimePerPage?.map(
                      (_, i) => `hsl(${i * 60 + i * i}, 80%, 45%)`
                    ),
                    borderRadius: 6,
                    borderSkipped: false,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    grid: {
                      color: "#e2e8f0",
                    },
                    ticks: {
                      color: "#64748b",
                    },
                  },
                  x: {
                    grid: { display: false },
                    ticks: { display: false },
                  },
                },
              }}
            />
          </Card>

          <Card title="Top Users (More user data on each button click)">
            <TopUsersList
              users={data.topUsers}
              onSelect={setSelectedUser}
              selected={selectedUser}
            />
          </Card>

          <Card title="Top Interactive Buttons )">
            <Bar
              data={{
                labels: data?.topButtons?.map((b) =>
                  b.label.length < 20 ? b.label : "Anonymous"
                ),
                datasets: [
                  {
                    label: "Clicks",
                    data: data?.topButtons?.map((b) => b.count),
                    backgroundColor: data?.topButtons?.map(
                      (_, i) => `hsl(${i * 60}, 80%, 45%)`
                    ),
                    borderRadius: 6,
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    grid: { color: "#e2e8f0" },
                    ticks: { color: "#64748b" },
                  },
                  y: {
                    grid: { display: false },
                    ticks: { color: "#64748b" },
                  },
                },
              }}
            />
          </Card>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card title="Phone Brand Distribution">
            <Doughnut
              data={{
                labels: data?.phoneBrands?.map((b) => b.label),
                datasets: [
                  {
                    data: data?.phoneBrands?.map((b) => b.count),
                    backgroundColor: data?.phoneBrands?.map(
                      (_, i) => `hsl(${i * 38}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>

          <Card title="Phone Ram Filters">
            <Doughnut
              data={{
                labels: data?.phoneRam?.map((b) => b.label),
                datasets: [
                  {
                    data: data?.phoneRam?.map((b) => b.count),
                    backgroundColor: data?.phoneRam?.map(
                      (_, i) => `hsl(${i * 60 + i * i}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>
          <Card title="Phone Storage Filters">
            <Doughnut
              data={{
                labels: data?.phoneStorage?.map((b) => b.label),
                datasets: [
                  {
                    data: data?.phoneStorage?.map((b) => b.count),
                    backgroundColor: data?.phoneStorage?.map(
                      (_, i) => `hsl(${i * 2 * 50 + 8 * i}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>

          <Card title="Phone Price Range Filters">
            <Doughnut
              data={{
                labels: data?.phonePriceRange?.map((b) => b.label),
                datasets: [
                  {
                    data: data?.phonePriceRange?.map((b) => b.count),
                    backgroundColor: data?.phonePriceRange?.map(
                      (_, i) => `hsl(${i * 40 + (i * i + 1)}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>

          <Card title="Phone Screen Size Filters">
            <Doughnut
              data={{
                labels: data?.phoneScreenSize?.map((b) => b.label),
                datasets: [
                  {
                    data: data?.phoneScreenSize?.map((b) => b.count),
                    backgroundColor: data?.phoneScreenSize?.map(
                      (_, i) => `hsl(${i * 60 + i * 18}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>

          <Card title="Phone Condition Filters">
            <Doughnut
              data={{
                labels: data?.phoneCondition?.map((b) => b.label),
                datasets: [
                  {
                    data: data?.phoneCondition?.map((b) => b.count),
                    backgroundColor: data?.phoneCondition?.map(
                      (_, i) => `hsl(${i * 49 + i * 17}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>

          <Card title="Phone Features Filters">
            <Doughnut
              data={{
                labels: data?.phoneFeatures?.map((b) => b.label),
                datasets: [
                  {
                    data: data?.phoneFeatures?.map((b) => b.count),
                    backgroundColor: data?.phoneFeatures?.map(
                      (_, i) => `hsl(${i * 15 + i * 17}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>

          <Card title="Top 10 Links">
            <Doughnut
              data={{
                labels: data?.links?.map((b) =>
                  b.label !== "" ? b.label : "No Info"
                ),
                datasets: [
                  {
                    data: data?.links?.map((b) => b.count),
                    backgroundColor: data?.links?.map(
                      (_, i) => `hsl(${i * 15 + i * 17}, 80%, 45%)`
                    ),
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#64748b",
                      boxWidth: 16,
                      padding: 16,
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

// Reuse your existing StatCard, Card, and TopPagesList components from previous code

type StatLabel =
  | "Total Visits"
  | "Logged In"
  | "Logged Out"
  | "Avg Scroll %"
  | "Avg Time (s)"
  | "Total page Visits";

const StatCard = ({
  label,
  value,
}: {
  label: StatLabel;
  value: string | number;
}) => {
  const gradients: Record<StatLabel, string> = {
    "Total Visits": "from-purple-500 to-blue-500",
    "Logged In": "from-emerald-500 to-cyan-500",
    "Logged Out": "from-rose-500 to-pink-500",
    "Avg Scroll %": "from-amber-500 to-orange-500",
    "Avg Time (s)": "from-green-500 to-teal-500",
    "Total page Visits": "from-indigo-500 to-violet-500",
  };

  return (
    <div
      className={`relative rounded-xl bg-gradient-to-br ${gradients[label]} p-6 shadow-lg text-white transition-transform duration-200 hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-start h-full">
        {/* Text Content - Perfectly vertically centered */}
        <div className="flex flex-col justify-center h-full space-y-2">
          <p className="text-sm font-medium opacity-90 tracking-wide">
            {label}
          </p>
          <p className="text-2xl font-bold leading-tight">{value}</p>
        </div>

        {/* Icon Container - Perfect square alignment */}
        <div className="flex-shrink-0 ml-4 w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center">
          <div className="scale-125 opacity-90">{iconMap[label]}</div>
        </div>
      </div>
    </div>
  );
};
// Updated Card component
const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-all mt-4">
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2>
      {children}
    </div>
  </div>
);
// Updated TopPagesList with better colors
const TopPagesList = ({
  pages,
  onSelect,
  selected,
}: {
  pages: ReportData["topPages"];
  onSelect: (url: string | null) => void;
  selected: string | null;
}) => (
  <div className="space-y-2">
    {pages?.map((page) => (
      <button
        key={page.url}
        onClick={() => onSelect(page.url === selected ? null : page.url)}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all ${
          selected === page.url
            ? "bg-blue-300 ring-2 ring-blue-200"
            : "bg-blue-100 hover:bg-blue-200"
        }`}
      >
        <span className="truncate text-sm text-slate-800 font-medium">
          {page.url}
        </span>
        <span
          className={`ml-2 rounded-full px-3 py-1 text-xs font-semibold ${
            selected === page.url
              ? "bg-blue-600 text-white"
              : "bg-slate-50 text-slate-800"
          }`}
        >
          {page.count}
        </span>
      </button>
    ))}
  </div>
);

// Updated TopUsersList with better colors
const TopUsersList = ({
  users,
  onSelect,
  selected,
}: {
  users: ReportData["topUsers"];
  onSelect: (url: string | null) => void;
  selected: string | null;
}) => (
  <div className="space-y-2">
    {users?.map((user) => (
      <button
        key={user.userId}
        onClick={() => onSelect(user.userId === selected ? null : user.userId)}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all ${
          selected === user.userId
            ? "bg-blue-300 ring-2 ring-blue-200"
            : "bg-blue-100 hover:bg-blue-200"
        }`}
      >
        <span className="truncate text-sm text-slate-800 font-medium">
          {user.userId}
        </span>
        <span
          className={`ml-2 rounded-full px-3 py-1 text-xs font-semibold ${
            selected === user.userId
              ? "bg-blue-600 text-white"
              : "bg-slate-50 text-slate-800"
          }`}
        >
          {user.count}
        </span>
      </button>
    ))}
  </div>
);

// Updated icon colors
const iconMap: Record<string, JSX.Element> = {
  "Total Visits": <UserIcon className="h-6 w-6" />,
  "Logged In": <EyeIcon className="h-6 w-6" />,
  "Logged Out": <ArrowLeftOnRectangleIcon className="h-6 w-6" />,
  "Avg Scroll %": <ChartBarIcon className="h-6 w-6" />,
  "Avg Time (s)": <ClockIcon className="h-6 w-6" />,
  "Total page Visits": <UserIcon className="h-6 w-6" />,
};

export default AdminDashboard;
