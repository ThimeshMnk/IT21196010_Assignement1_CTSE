// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import RoomInventory from './pages/RoomInventory';
// import Reservations from './pages/Reservations';
// import Users from './pages/UserManagement';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/inventory" element={<RoomInventory />} />
//         <Route path="/reservations" element={<Reservations />} />
//         <Route path="/users" element={<Users />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CarsList from "./pages/RoomInventory";
import Reservations from "./pages/Reservations";
import Users from "./pages/UserManagement";
import Layout from "./components/Layout";
import ReservedRooms from "./pages/ReservedRooms";
import ManageRentals from "./pages/ManageRentals";
import ViewAndRent from "./pages/ViewAndRent";
import MyRentals from "./pages/MyRentals";
function App() {
  const role = localStorage.getItem('userType');
  const Navigate = useNavigate();
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin*/}
      {["admin", "manager"].includes(role) && (
        <Route>
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/manage-rentals"
            element={
              <Layout>
                <ManageRentals />{" "}
              </Layout>
            }
          />

          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
        </Route>
      )}

      {/* Customer */}
      {role === "customer" && (
        <Route>
          <Route
            path="/car-list"
            element={
              <Layout>
                <CarsList />
              </Layout>
            }
          />
          <Route
            path="/reservations"
            element={
              <Layout>
                <Reservations />
              </Layout>
            }
          />
          <Route
            path="/reserved-rooms"
            element={
              <Layout>
                <ReservedRooms />
              </Layout>
            }
          />

          <Route
            path="/view-and-rent/:id"
            element={
              <Layout>
                <ViewAndRent />{" "}
              </Layout>
            }
          />

          <Route
            path="/my-rentals"
            element={
              <Layout>
                <MyRentals />{" "}
              </Layout>
            }
          />
        </Route>
      )}

      <Route
        path="*"
        element={
          role ? (
            <Navigate
              to={role === "customer" ? "/car-list" : "/dashboard"}
              replace
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
