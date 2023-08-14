import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendToast } from "../../lib/utils";

export default function Signup() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    console.log(formState);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        },
      );
      const data = await response.json();
      if (data.message !== "Success") {
        sendToast("error", data.message);
        return;
      }
      navigate("/login");
    } catch (error: any) {
      sendToast("error", "Error occured while signing up.");
    }
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
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
            SignUp
          </h1>
          <p className="mb-1 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Welcome! Please signup for an account.
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
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Signup
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-gray-900 hover:text-gray-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
