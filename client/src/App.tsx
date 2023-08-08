import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Admin/Dashboard";
import CustomerDashboard from "./pages/Customer/Dashboard";

import Navbar from "./components/Navbar";

import { UserType } from "./lib/utils";

function App() {
  const userType = UserType.Admin;

  if (userType === UserType.Admin) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </>
  );
}

export default App;
