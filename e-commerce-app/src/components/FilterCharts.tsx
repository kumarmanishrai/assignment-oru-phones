import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartConfigs = {
  phoneRam: {
    title: "Phone Ram Filters",
    dataKey: "phoneRam",
    getColor: (i: number) => `hsl(${(i * 60) + (i * i)}, 80%, 45%)`,
  },
  phoneStorage: {
    title: "Phone Storage Filters",
    dataKey: "phoneStorage",
    getColor: (i: number) => `hsl(${(i * 2 * 50) + (8 * i)}, 80%, 45%)`,
  },
  phonePriceRange: {
    title: "Phone Price Range Filters",
    dataKey: "phonePriceRange",
    getColor: (i: number) => `hsl(${(i * 40) + (i * i + 1)}, 80%, 45%)`,
  },
  phoneScreenSize: {
    title: "Phone Screen Size Filters",
    dataKey: "phoneScreenSize",
    getColor: (i: number) => `hsl(${(i * 60) + (i * 18)}, 80%, 45%)`,
  },
  phoneCondition: {
    title: "Phone Condition Filters",
    dataKey: "phoneCondition",
    getColor: (i: number) => `hsl(${(i * 49) + (i * 17)}, 80%, 45%)`,
  },
};

type Props = {
  data: Record<string, { label: string; count: number }[]>;
};

export default function FilterCharts({ data }: Props) {
  const [selectedKey, setSelectedKey] = useState<keyof typeof chartConfigs>("phoneRam");

  const config = chartConfigs[selectedKey];
  const chartData = data[config.dataKey];

  const labels = chartData.map((b) => b.label);
  const counts = chartData.map((b) => b.count);
  const colors = chartData.map((_, i) => config.getColor(i));

  const pieData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
        borderWidth: 0.5,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: config.title,
        data: counts,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <label className="font-medium mr-2">Select Filter:</label>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value as keyof typeof chartConfigs)}
          className="border border-gray-300 p-2 rounded"
        >
          {Object.entries(chartConfigs).map(([key, value]) => (
            <option key={key} value={key}>
              {value.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
          }}
        />

        <Doughnut
          data={pieData}
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
      </div>
    </div>
  );
}
