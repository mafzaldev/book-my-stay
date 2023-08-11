import { Spinner } from "flowbite-react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectMenu from "../../components/SelectMenu";
import { sendToast } from "../../lib/utils";

export default function AddRoom() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const [availableServants, setAvailableServants] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [formState, setFormState] = useState({
    roomNo: "",
    roomType: "",
    pricePerDay: "",
    roomDescription: "",
    servantId: "",
  });

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/availableEmployees`,
        );
        const data = await res.json();
        setAvailableServants(data.data);
      } catch (error: any) {
        sendToast("error", error.message);
      }
    };
    getEmployees();

    setLoading(false);
  }, []);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (availableServants.length === 1) {
      setFormState({ ...formState, servantId: availableServants[0]["id"] });
    }

    if (
      !formState.roomNo ||
      !formState.roomType ||
      !formState.pricePerDay ||
      !formState.servantId ||
      !formState.roomDescription ||
      !file
    ) {
      alert("One or more fields are empty. or try again.");
      console.log(formState);
      return;
    }
    setIsUploading(true);

    const formData = new FormData();
    formData.append("roomNo", formState.roomNo);
    formData.append("roomType", formState.roomType);
    formData.append("pricePerDay", formState.pricePerDay);
    formData.append("roomDescription", formState.roomDescription);
    formData.append("servantId", formState.servantId);
    formData.append("image", file!);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/room/create`,
        requestOptions,
      ).then((res) => {
        setIsUploading(false);
        if (res.status !== 200) {
          sendToast("error", "Something went wrong. Please try again later.");
          return;
        }
        sendToast("success", "Room added successfully");
        navigate(-1);
      });
    } catch (error: any) {
      sendToast("error", error.message);
    }

    setIsUploading(false);
    setFormState({
      roomNo: "",
      roomType: "",
      pricePerDay: "",
      roomDescription: "",
      servantId: "",
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

  const pickStatusHandler = (roomType: string) => {
    setFormState({ ...formState, roomType });
  };

  const pickServantHandler = (servantId: any) => {
    setFormState({ ...formState, servantId });
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Add Room
            </h1>
            <p className="mb-1 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl">
              Fill in the details to add room to the system
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
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                  placeholder="Room No"
                  required
                />
              </div>
              <div></div>
              <SelectMenu
                title={"Room Type"}
                className="w-full"
                pickStatus={pickStatusHandler}
                options={[
                  { id: 1, name: "Single" },
                  { id: 2, name: "Double" },
                ]}
              />
              <SelectMenu
                title={"Available Servants"}
                className="w-full"
                pickStatus={pickServantHandler}
                options={availableServants}
              />
              <div>
                <label
                  htmlFor="roomDescription"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Room Description
                </label>
                <textarea
                  id="roomDescription"
                  value={formState.roomDescription}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      roomDescription: e.target.value,
                    })
                  }
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                  placeholder="Room Description"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="pricePerDay"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Price per Day
                </label>
                <input
                  type="number"
                  id="pricePerDay"
                  value={formState.pricePerDay}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                  placeholder="3000(PKR)"
                  required
                />
              </div>
              <label htmlFor="file-input" className="sr-only bg-slate-400">
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
      )}
    </>
  );
}
