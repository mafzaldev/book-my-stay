import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import Navbar from "./components/Navbar";
import AddEmployee from "./pages/Admin/AddEmployee";
import AddRoom from "./pages/Admin/AddRoom";
import Bookings from "./pages/Admin/Bookings";
import AdminDashboard from "./pages/Admin/Dashboard";
import Employees from "./pages/Admin/Employees";
import Rooms from "./pages/Admin/Rooms";
import Contact from "./pages/Common/Contact";
import Home from "./pages/Common/Home";
import Login from "./pages/Common/Login";
import NotFound from "./pages/Common/NotFound";
import Signup from "./pages/Common/Signup";

import BookRoom from "./pages/Customer/BookRoom";
import CustomerDashboard from "./pages/Customer/Dashboard";
import CustomerRooms from "./pages/Customer/Rooms";

import { UserType } from "./lib/utils";
import CheckOutRoom from "./pages/Customer/CheckOutRoom";
import useUserStore from "./stores/userStore";

function App() {
  const { role, isLoggedIn, login } = useUserStore();
  const [userState] = useLocalStorage("userState", {
    name: "",
    email: "",
    role: UserType.Customer,
  });

  const userType = role || null;

  useEffect(() => {
    if (!userState) return;
    login(userState.name, userState.email, userState.role);
  }, [userType]);

  if (isLoggedIn && userType === UserType.Admin) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/addRoom" element={<AddRoom />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </>
    );
  } else if (isLoggedIn && userType === UserType.Customer) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/rooms" element={<CustomerRooms />} />
          <Route path="/bookRoom/:roomNo" element={<BookRoom />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/checkOutRoom/:reservationId/:roomNo"
            element={<CheckOutRoom />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
