import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendToast } from "../../lib/utils";
import useUserStore from "../../stores/userStore";

export default function AddEmployee() {
  const { roomNo } = useParams();
  const { email } = useUserStore();
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    roomNo: "",
    customerPhone: "",
    numberOfChildren: "",
    numberOfAdults: "",
  });

  const setRoomNo = () => {
    setFormState({ ...formState, roomNo: roomNo! });
  };

  useEffect(() => {
    setRoomNo();
  }, []);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formState.roomNo ||
      !formState.customerPhone ||
      !formState.numberOfChildren ||
      !formState.numberOfAdults
    ) {
      alert("One or more fields are empty. Check the dropdowns.");
      console.log(formState);
      return;
    }
    setIsBooking(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNo: formState.roomNo,
        customerEmail: email,
        customerPhone: formState.customerPhone,
        numberOfAdults: formState.numberOfAdults,
        numberOfChildren: formState.numberOfChildren,
      }),
    };

    try {
      console.table(requestOptions);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/customer/bookRoom`,
        requestOptions,
      );
      const data = await response.json();
      if (data.url) {
        window.location.replace(data.url);
      }
    } catch (error: any) {
      sendToast("error", error.message);
    }

    // setIsBooking(false);
    /*setFormState({
      roomNo: "",
      customerPhone: "",
      numberOfAdults: "",
      numberOfChildren: "",
    });*/
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.id === "numberOfAdults" &&
      e.currentTarget.value.length > 1
    )
      return;
    if (
      e.currentTarget.id === "numberOfChildren" &&
      e.currentTarget.value.length > 1
    )
      return;

    if (
      e.currentTarget.id === "customerPhone" &&
      e.currentTarget.value.length > 11
    )
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
            Book Room
          </h1>
          <p className="mb-1 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Fill in the details to book room for your stay
          </p>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="roomNo"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Room No
              </label>
              <input
                type="text"
                id="roomNo"
                value={formState.roomNo}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-200 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                disabled
                required
              />
            </div>
            <div>
              <label
                htmlFor="customerPhone"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="tel"
                id="customerPhone"
                value={formState.customerPhone}
                onChange={handleChange}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="03001234567"
                required
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="w-1/2">
                <label
                  htmlFor="numberOfAdults"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Number of Adults
                </label>
                <input
                  type="number"
                  id="numberOfAdults"
                  value={formState.numberOfAdults}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                  placeholder="1"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="numberOfChildren"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Number of Children
                </label>
                <input
                  type="tel"
                  id="numberOfChildren"
                  value={formState.numberOfChildren}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                  placeholder="2"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isBooking}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-gray-500"
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
