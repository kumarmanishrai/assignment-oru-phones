import Header from "../components/Header";
import Footer from "../components/Footer";
import "../global.css";
import { useRouter } from "next/navigation";
import dotenv from 'dotenv'
dotenv.config()


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
    
  }, [])

  useEffect(() => {
    if(!isAdminAuthenticated)return;
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
        console.log(report)
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

          <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            {!report ? (
              <p>Loading report...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">
                    Total Unique Users
                  </h2>
                  <p className="text-2xl">{report?.totalUsers}</p>
                </div>

                <div className="p-4 border rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">
                    Logged In vs Logged Out
                  </h2>
                  <p>Logged In: {report?.loggedIn}</p>
                  <p>Logged Out: {report?.loggedOut}</p>
                </div>

                <div className="p-4 border rounded shadow col-span-2">
                  <h2 className="text-xl font-semibold mb-2">
                    Top Visited Pages
                  </h2>
                  <ul className="list-disc list-inside">
                    {report?.topPages?.map((page, idx) => (
                      <li key={idx}>
                        {page.url} — {page.count} visits
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">Avg Time/Page</h2>
                  <p>{report?.avgTimePerPage} seconds</p>
                </div>

                <div className="p-4 border rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">Top Devices</h2>
                  <ul className="list-disc list-inside">
                    {report?.deviceClicks?.map((d, idx) => (
                      <li key={idx}>
                        {d.device} — {d.count}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">Top Buttons</h2>
                  <ul className="list-disc list-inside">
                    {report?.topButtons?.map((b, idx) => (
                      <li key={idx}>
                        {b.label} — {b.count}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">
                    Device Categories
                  </h2>
                  <ul className="list-disc list-inside">
                    {report?.deviceCategories?.map((c, idx) => (
                      <li key={idx}>
                        {c.category} — {c.count}
                      </li>
                    ))}
                  </ul>
                </div>

                
              </div>
            )}
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Admin;
