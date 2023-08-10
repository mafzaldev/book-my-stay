import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/Admin/Dashboard";
import CustomerDashboard from "./pages/Customer/Dashboard";
import Signup from "./pages/Common/Signup";
import Login from "./pages/Common/Login";

import useUserStore from "./stores/userStore";

import { UserType } from "./lib/utils";

function App() {
  const { role, isLoggedIn, login } = useUserStore();
  const [userState] = useLocalStorage("userState", {
    name: "",
    email: "",
    role: UserType.Customer,
  });

  const userType = role || null;

  useEffect(() => {
    if (!userState.name && !userState.email && !userState.role) return;
    login(userState.name, userState.email, userState.role);
  }, [userType]);

  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    );
  }

  if (userType === UserType.Admin) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </>
    );
  } else if (userType === UserType.Customer) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<CustomerDashboard />} />
        </Routes>
      </>
    );
  }
}

export default App;
