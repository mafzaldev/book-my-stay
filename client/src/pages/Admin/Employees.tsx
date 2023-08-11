import { TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { sendToast } from "../../lib/utils";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/employees`,
      );
      const parsedData = await res.json();
      if (parsedData.message !== "Success") {
        console.log(parsedData.message);
        sendToast("error", parsedData.message);
        return;
      }
      setEmployees(parsedData.data);
    } catch (error: any) {
      sendToast("error", error.message);
    }
  }, []);

  const handleDelete = useCallback(async (id: any) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/employee/delete/${id}`,
        {
          method: "DELETE",
        },
      );
      const parsedData = await res.json();
      if (parsedData.message !== "Success") {
        console.log(parsedData.message);
        sendToast("error", parsedData.message);
        return;
      }
    } catch (error: any) {
      sendToast("error", error.message);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="py-5">
      <header>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Employees
          </h1>
          <Link
            to="/addEmployee"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Add Employee
          </Link>
        </div>
        <main>
          <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {employees.map((employee: any) => {
                return (
                  <div
                    key={employee.cnic}
                    className="rounded-lg bg-white transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md"
                  >
                    <div className="relative h-2/3 w-full overflow-hidden rounded-lg bg-gray-200">
                      <div className="absolute right-3 top-3 rounded-lg bg-white px-1 py-1 drop-shadow-md">
                        {employee.role}
                      </div>
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-full object-contain object-center"
                      />
                    </div>
                    <div className="flex items-center justify-between px-3">
                      <div>
                        <h3 className="mt-2 text-lg font-bold text-gray-900">
                          {employee.name}
                        </h3>
                        <p className="text-md font-medium text-gray-600">
                          {employee.email}
                        </p>
                        <p className="text-md font-medium text-gray-600">
                          {employee.phone}
                        </p>
                      </div>
                      <div
                        className="cursor-pointer rounded-lg bg-red-500 p-1 hover:shadow-sm"
                        onClick={() => handleDelete(employee._id)}
                      >
                        <TrashIcon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <p className="mt-2 text-center text-lg font-medium text-gray-700">
                      {employee.salary}
                      <span className="text-sm">PKR</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </header>
    </div>
  );
};

export default Employees;
