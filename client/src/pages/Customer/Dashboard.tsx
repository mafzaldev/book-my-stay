import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { Spinner } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ControlCard from "../../components/ControlCard";
import { getDateFromTimeStamp, sendToast } from "../../lib/utils";
import useUserStore from "../../stores/userStore";

const customerControls = [
  {
    id: 1,
    title: "Visit Rooms",
    shortDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: <BuildingOfficeIcon className="h-24 w-24 text-indigo-700" />,
    route: "/rooms",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { email } = useUserStore();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/customer/bookings/${email}`,
      );
      const parsedData = await res.json();
      if (parsedData.message !== "Success") {
        console.log(parsedData.message);
        sendToast("error", parsedData.message);
        return;
      }
      setBookings(parsedData.data);
    } catch (error: any) {
      sendToast("error", error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
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
          <div>
            <h2 className="mt-10 text-2xl font-bold leading-tight tracking-tight text-gray-800">
              History
            </h2>
            {loading ? (
              <div className="flex h-44 items-center justify-center">
                <Spinner />
              </div>
            ) : bookings.length === 0 ? (
              <div className="flex items-center justify-center">
                <p className="text-2xl font-semibold text-gray-900">
                  No bookings till now
                </p>
              </div>
            ) : (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Room No
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Customer Phone
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price(PKR)
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        CheckIn Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        CheckOut Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Adults
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Children
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {bookings.map((booking: any) => (
                      <tr key={booking.roomNo}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {booking.roomNo}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {booking.customerPhone}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {booking.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getDateFromTimeStamp(booking.checkIn)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {booking.checkOut == "1970-01-01T00:00:00.000Z"
                            ? "--"
                            : getDateFromTimeStamp(booking.checkOut)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {booking.numberOfAdults}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {booking.numberOfChildren}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
