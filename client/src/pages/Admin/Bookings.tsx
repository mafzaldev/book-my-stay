import { sendToast } from "../../lib/utils";

const Bookings = () => {
  return (
    <div onClick={() => sendToast("success", "This is a success toast")}>
      Bookings
    </div>
  );
};

export default Bookings;
