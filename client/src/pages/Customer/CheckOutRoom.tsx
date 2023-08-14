import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendToast } from "../../lib/utils";

export default function CheckOutRoom() {
  const { roomNo, reservationId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    roomNo: "",
    reservationId: "",
    rating: "",
  });

  const setReservationId = () => {
    setFormState({
      ...formState,
      roomNo: roomNo!,
      reservationId: reservationId!,
    });
  };

  useEffect(() => {
    setReservationId();
  }, []);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.rating) {
      alert("One or more fields are empty.");
      return;
    }
    setisSubmitting(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId: formState.reservationId,
        rating: formState.rating,
      }),
    };

    try {
      console.table(requestOptions);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/customer/room/checkout`,
        requestOptions,
      );
      if (response.status !== 200) {
        sendToast("error", "Something went wrong. Please try again later.");
        return;
      }
      sendToast("success", "Checked out successfully");
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      sendToast("error", error.message);
    }

    setisSubmitting(false);
    setFormState({
      roomNo: "",
      reservationId: "",
      rating: "",
    });
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (
      (e.currentTarget.id === "rating" &&
        Number.parseInt(e.currentTarget.value) > 5) ||
      Number.parseInt(e.currentTarget.value) < 0
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
            CheckOut Room
          </h1>
          <p className="mb-1 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Fill in the details to checkout room.
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
                htmlFor="rating"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Rating
              </label>
              <input
                type="number"
                id="rating"
                value={formState.rating}
                onChange={handleChange}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="0-5"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-gray-500"
              >
                CheckOut
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
