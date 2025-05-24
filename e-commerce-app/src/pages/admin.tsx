
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

const AdminDashboard = () => {
  const [data, setData] = useState<ReportData | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedPageData, setSelectedPageData] = useState<ReportData | null>(null);
  const [pageAnalytics, setPageAnalytics] = useState<PageAnalytics | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/report`,
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

    fetchData();
  }, []);


  useEffect(() => {
const fetchPageAnalytics = async () => {
      if (!selectedPage) return;
      
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/admin/report/url?url=${encodeURIComponent(selectedPage)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const analyticsData: PageAnalytics = await res.json();
        setPageAnalytics(analyticsData);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching page analytics:", error);
      }
    };
    fetchPageAnalytics();
  }, [selectedPage]);
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPage(null);
    setPageAnalytics(null);
  };


  if (!data) return <div className="p-8 text-center">Loading...</div>;

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-blue-50 to-purple-50 p-8">
      {/* Modal */}
      {isModalOpen && pageAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  {pageAnalytics.url}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard label="Total Visits" value={pageAnalytics.totalVisits} />
                <StatCard 
                  label="Avg Time (s)" 
                  value={pageAnalytics.avgTimeInSession.toFixed(1)} 
                />
                <StatCard 
                  label="Avg Scroll %" 
                  value={pageAnalytics.avgScroll.toFixed(1)} 
                />
              </div>

              {pageAnalytics.topButtons?.length > 0 && (
                <Card title="Top Buttons">
                  <div className="space-y-2">
                    {pageAnalytics.topButtons.map((button, index) => (
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
                    {pageAnalytics.topLinks.map((link, index) => (
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
                    {pageAnalytics.topFilters.map((filter, index) => (
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
      <h1 className="mb-8 text-3xl font-bold text-slate-800 drop-shadow-sm">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <StatCard label="Total Users" value={data.totalUsers} />
        <StatCard label="Logged In" value={data.loggedIn} />
        <StatCard label="Logged Out" value={data.loggedOut} />
        <StatCard label="Avg Scroll %" value={data.avgScroll.toFixed(1)} />
        <StatCard label="Avg Time %" value={data.avgTime.toFixed(1)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Top Pages">
          <TopPagesList
            pages={data.topPages}
            onSelect={setSelectedPage}
            selected={selectedPage}
          />
        </Card>

        <Card title="Average Time per Page (seconds)">
          <Bar
            data={{
              labels: data.averageTimePerPage.map((p) => p.page),
              datasets: [
                {
                  label: "Time Spent (seconds)",
                  data: data.averageTimePerPage.map((p) => p.time),
                  backgroundColor: "#bfd1f0",
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
                  grid: { color: "#e2e8f0" },
                  ticks: { color: "#64748b" },
                },
                x: {
                  grid: { display: false },
                  ticks: { color: "#64748b" },
                },
              },
            }}
          />
        </Card>

        <Card title="Top Interactive Buttons">
          <Bar
            data={{
              labels: data.topButtons.map((b) => b.label),
              datasets: [
                {
                  label: "Clicks",
                  data: data.topButtons.map((b) => b.count),
                  backgroundColor: data.topButtons.map(
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

        <Card title="Phone Brand Distribution">
          <Doughnut
            data={{
              labels: data.phoneBrands.map((b) => b.label),
              datasets: [
                {
                  data: data.phoneBrands.map((b) => b.count),
                  backgroundColor: [
                    "#3b82f6", // Blue
                    "#10b981", // Emerald
                    "#f59e0b", // Amber
                    "#ef4444", // Red
                    "#8b5cf6", // Violet
                    "#06b6d4", // Cyan
                  ],
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

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card title="Phone Ram Filters">
          <Doughnut
            data={{
              labels: data.phoneRam.map((b) => b.label),
              datasets: [
                {
                  data: data.phoneRam.map((b) => b.count),
                  backgroundColor: data.phoneRam.map(
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
              labels: data.phoneStorage.map((b) => b.label),
              datasets: [
                {
                  data: data.phoneStorage.map((b) => b.count),
                  backgroundColor: data.phoneStorage.map(
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
              labels: data.phonePriceRange.map((b) => b.label),
              datasets: [
                {
                  data: data.phonePriceRange.map((b) => b.count),
                  backgroundColor: data.phonePriceRange.map(
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
              labels: data.phoneScreenSize.map((b) => b.label),
              datasets: [
                {
                  data: data.phoneScreenSize.map((b) => b.count),
                  backgroundColor: data.phoneScreenSize.map(
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

        
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card title="Phone Condition Filters">
              <Doughnut
                data={{
                  labels: data.phoneCondition.map((b) => b.label),
                  datasets: [
                    {
                      data: data.phoneCondition.map((b) => b.count),
                      backgroundColor: data.phoneCondition.map(
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
                  labels: data.phoneFeatures.map((b) => b.label),
                  datasets: [
                    {
                      data: data.phoneFeatures.map((b) => b.count),
                      backgroundColor: data.phoneFeatures.map(
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
                labels: data.links.map((b) =>
                  b.label !== "" ? b.label : "No Info"
                ),
                datasets: [
                  {
                    data: data.links.map((b) => b.count),
                    backgroundColor: data.links.map(
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
  | "Total Users"
  | "Logged In"
  | "Logged Out"
  | "Avg Scroll %"
  | "Avg Time %"
  | "Total Visits"
  | "Avg Time (s)";

const StatCard = ({
  label,
  value,
}: {
  label: StatLabel;
  value: string | number;
}) => {
  const gradients: Record<StatLabel, string> = {
    "Total Users": "from-purple-500 to-blue-500",
    "Logged In": "from-emerald-500 to-cyan-500",
    "Logged Out": "from-rose-500 to-pink-500",
    "Avg Scroll %": "from-amber-500 to-orange-500",
    "Avg Time %": "from-indigo-500 to-violet-500",
    "Total Visits": "from-blue-500 to-indigo-500",
    "Avg Time (s)": "from-green-500 to-teal-500",
  };

  return (
    <div
      className={`rounded-xl bg-gradient-to-br ${gradients[label]} p-4 shadow-lg text-white transition hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
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
    {pages.map((page) => (
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

// Updated icon colors
const iconMap: Record<string, JSX.Element> = {
  "Total Users": <UserIcon className="h-6 w-6" />,
  "Logged In": <EyeIcon className="h-6 w-6" />,
  "Logged Out": <ArrowLeftOnRectangleIcon className="h-6 w-6" />,
  "Avg Scroll %": <ChartBarIcon className="h-6 w-6" />,
  "Avg Time %": <ClockIcon className="h-6 w-6" />,
};

export default AdminDashboard;
