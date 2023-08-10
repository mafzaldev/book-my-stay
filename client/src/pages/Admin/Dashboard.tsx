import { useEffect, useState } from "react";
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

import MetricCard from "../../components/MetricCard";
import ControlCard from "../../components/ControlCard";

const managementControls = [
  {
    id: 1,
    title: "Manage Rooms",
    shortDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: <BuildingOfficeIcon className="h-24 w-24 text-indigo-700" />,
    onClick: () => {},
  },
  {
    id: 2,
    title: "Manage Employees",
    shortDescription:
      "Maxime, numquam. Doloremque deserunt voluptatum aperiam.",
    icon: <UserGroupIcon className="h-24 w-24 text-indigo-700" />,
    onClick: () => {},
  },
  {
    id: 3,
    title: "Manage Bookings",
    shortDescription:
      "Provident veniam id optio, molestiae officia ea ullamad.",
    icon: <BookmarkIcon className="h-24 w-24 text-indigo-700" />,
    onClick: () => {},
  },
];

const Dashboard = () => {
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/dashboard`,
      );
      const parsedData = await res.json();
      if (parsedData.message !== "Success") {
        console.log(parsedData.message);
        return;
      }
      setDashboardMetrics(parsedData.data);
    };
    fetchDashboardMetrics();
  }, []);

  return (
    <div className="py-5">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl  font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-5 grid grid-cols-2 items-center gap-5 md:grid-cols-4 lg:grid-cols-5">
            <MetricCard
              metric="Total Rooms"
              value={dashboardMetrics.totalRooms}
            />
            <MetricCard
              metric="Occupied Rooms"
              value={dashboardMetrics.occupiedRooms}
            />
            <MetricCard
              metric="Available Rooms"
              value={dashboardMetrics.availableRooms}
            />
            <MetricCard
              metric="Total Bookings"
              value={dashboardMetrics.totalBookings}
            />
            <MetricCard
              metric="Total Revenue"
              unit="PKR"
              value={dashboardMetrics.totalRevenue}
            />
          </div>
          <h2 className="mt-10 text-2xl font-bold leading-tight tracking-tight text-gray-800">
            Management Controls
          </h2>
          <div className="mt-5 grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
            {managementControls.map((control) => (
              <ControlCard
                key={control.id}
                control={control.title}
                icon={control.icon}
                shortDescription={control.shortDescription ?? ""}
                onClick={control.onClick}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
