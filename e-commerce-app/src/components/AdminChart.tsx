import React from 'react';
import { Chart as ChartJS, BarElement, LineElement, PointElement, BarController, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

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

ChartJS.register(
  BarElement, LineElement, PointElement, BarController, LineController, 
  CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement
);

const AdminCharts = ({ report }: {report: AggregatedReport}) => {
  if (!report) return <div>Loading charts...</div>;

  // Data for the charts
  const barChartData = {
    labels: report.topPages?.map(page => page.url) || [],
    datasets: [{
      label: 'Page Visits',
      data: report.topPages?.map(page => page.count) || [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  const lineChartData = {
    labels: ['Logged In', 'Logged Out'],
    datasets: [{
      label: 'User Sessions',
    //   data: [report.loggedIn, report.loggedOut],
      data: [124, 228],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  };

  const pieChartData = {
    labels: report.deviceClicks?.map(device => device.device) || [],
    datasets: [{
      data: report.deviceClicks?.map(device => device.count) || [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(105, 206, 86, 0.6)',
        'rgba(125, 006, 86, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(105, 206, 86, 1)',
        'rgba(125, 006, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Bar Chart - Top Pages */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Top Visited Pages</h3>
        <div className="h-64">
          <Bar 
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Line Chart - User Sessions */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">User Sessions</h3>
        <div className="h-64">
          <Line 
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Pie Chart - Device Categories */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Top Devices</h3>
        <div className="h-96">
          <Pie 
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCharts