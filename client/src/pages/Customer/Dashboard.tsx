import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import ControlCard from "../../components/ControlCard";

const customerControls = [
  {
    id: 1,
    title: "Checkout Rooms",
    shortDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: <BuildingOfficeIcon className="h-24 w-24 text-indigo-700" />,
    route: "/rooms",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

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
          <h2 className="mt-10 text-2xl font-bold leading-tight tracking-tight text-gray-800">
            Controls
          </h2>
          <div className="mt-5 grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
            {customerControls.map((control) => (
              <ControlCard
                key={control.id}
                control={control.title}
                icon={control.icon}
                shortDescription={control.shortDescription ?? ""}
                onClick={() => navigate(control.route)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
