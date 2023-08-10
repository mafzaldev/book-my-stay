import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/Admin/Dashboard";
import CustomerDashboard from "./pages/Customer/Dashboard";
import Home from "./pages/Common/Home";
import Signup from "./pages/Common/Signup";
import Login from "./pages/Common/Login";

import useUserStore from "./stores/userStore";

import { UserType } from "./lib/utils";
import Contact from "./pages/Common/Contact";
import NotFound from "./pages/Common/NotFound";

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

  if (!isLoggedIn) {
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
      </>
    );
  }

  if (userType === UserType.Admin) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  } else if (userType === UserType.Customer) {
    return (
      <>
        {" "}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />{" "}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default App;
