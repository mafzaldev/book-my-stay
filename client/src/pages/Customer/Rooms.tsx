import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Spinner } from "flowbite-react";
import { sendToast } from "../../lib/utils";

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/customer/rooms`,
      );
      const parsedData = await res.json();
      if (parsedData.message !== "Success") {
        console.log(parsedData.message);
        sendToast("error", parsedData.message);
        return;
      }
      setRooms(parsedData.data);
    } catch (error: any) {
      sendToast("error", error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="py-5">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Rooms
              </h1>
            </div>
            <main>
              <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
                {rooms.length === 0 && (
                  <div className="flex items-center justify-center">
                    <p className="text-2xl font-semibold text-gray-900">
                      No rooms available
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {rooms.map((room: any) => {
                    return (
                      <div
                        key={room._id}
                        onClick={() => navigate(`/bookRoom/${room.roomNo}`)}
                        className="cursor-pointer rounded-lg bg-white pb-5 transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md"
                      >
                        <div className="relative w-full overflow-hidden rounded-lg bg-gray-200">
                          <div className="absolute right-3 top-3 rounded-lg bg-white px-1 py-1 drop-shadow-md">
                            {room.roomType}
                          </div>

                          {room.booked === true ? (
                            <div className="absolute bottom-3 right-3 rounded-lg bg-red-600 px-1 py-1 drop-shadow-md">
                              Booked
                            </div>
                          ) : (
                            <div className="absolute bottom-3 right-3 rounded-lg bg-white px-1 py-1 drop-shadow-md">
                              Available
                            </div>
                          )}
                          <img
                            src={room.roomImage}
                            alt={room.name}
                            className="w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex items-center justify-between px-3">
                          <div>
                            <h3 className="mt-2 text-lg font-bold text-gray-900">
                              {room.roomNo}
                            </h3>
                            <p className="text-md font-medium text-gray-600">
                              {room.roomDescription}
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Tenetur laudantium ipsa voluptatibus modi
                              sit at quam delectus assumenda eveniet hic,
                              pariatur molestias est culpa expedita facere
                              consectetur sed iste. Odit?
                            </p>
                            <p className="text-md font-medium text-gray-600">
                              Servant Name:{" "}
                              <span className="text-lg font-bold">
                                {room.servantId}
                              </span>
                            </p>
                            <p className="text-md font-medium text-gray-600">
                              Price per Day:{" "}
                              <span className="text-xl font-bold">
                                {room.pricePerDay}
                              </span>
                              <span className="text-xs">PKR</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </header>
        </div>
      )}
    </>
  );
};

export default Rooms;
