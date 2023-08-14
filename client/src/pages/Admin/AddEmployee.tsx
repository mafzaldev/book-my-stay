import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectMenu from "../../components/SelectMenu";
import { sendToast } from "../../lib/utils";
type temployeeTypes = {
  [key: string]: string;
};

const employeeTypes: temployeeTypes = {
  "1": "Manager",
  "2": "Servant",
};

export default function AddEmployee() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    cnic: "",
    phone: "",
    status: "",
    salary: "",
  });

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formState.name ||
      !formState.email ||
      !formState.cnic ||
      !formState.phone ||
      !formState.status ||
      !formState.salary ||
      !file
    ) {
      alert("One or more fields are empty. Check the dropdowns.");
      console.log(formState);
      console.log(file);
      return;
    }
    setIsUploading(true);

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("cnic", formState.cnic);
    formData.append("phone", formState.phone);
    formData.append("role", employeeTypes[formState.status]);
    formData.append("status", "available");
    formData.append("salary", formState.salary);
    formData.append("image", file!);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/employee/create`,
        requestOptions,
      ).then((res) => {
        setIsUploading(false);
        if (res.status !== 200) {
          sendToast("error", "Something went wrong. Please try again later.");
          return;
        }
        sendToast("success", "Employee added successfully");
        navigate(-1);
      });
    } catch (error: any) {
      sendToast("error", error.message);
    }

    setIsUploading(false);
    setFormState({
      name: "",
      email: "",
      cnic: "",
      phone: "",
      status: "",
      salary: "",
    });
    setFile(undefined);
  };

  const pickImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
    } else {
      alert("Please pick a valid image.");
    }
  };

  const pickStatusHandler = (status: string) => {
    setFormState({ ...formState, status });
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "cnic" && e.currentTarget.value.length > 13)
      return;
    if (e.currentTarget.id === "phone" && e.currentTarget.value.length > 11)
      return;
    if (e.currentTarget.id === "salary" && e.currentTarget.value.length > 6)
      return;
    setFormState({
      ...formState,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Add Employee
          </h1>
          <p className="mb-1 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Fill in the details to add employee to the system
          </p>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={handleChange}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="w-1/2">
                <label
                  htmlFor="cnic"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  CNIC
                </label>
                <input
                  type="number"
                  id="cnic"
                  value={formState.cnic}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                  placeholder="3520212345678"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  maxLength={13}
                  value={formState.phone}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                  placeholder="03031234567"
                  required
                />
              </div>
            </div>
            <SelectMenu
              title={"Status"}
              pickStatus={pickStatusHandler}
              options={[
                { id: 1, name: "Manager" },
                { id: 2, name: "Servant" },
              ]}
            />
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                value={formState.salary}
                onChange={handleChange}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="Salary"
                required
              />
            </div>
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Choose Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              accept=".jpg,.png,.jpeg"
              onChange={pickImageHandler}
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 bg-gray-50text-sm block w-full rounded-lg border border-gray-300 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
            />
            <div>
              <button
                type="submit"
                disabled={isUploading}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-gray-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
