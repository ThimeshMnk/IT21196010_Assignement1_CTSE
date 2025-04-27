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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import MyRentals from './pages/MyRentals';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard routes with shared SideNav layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
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
          path="/users"
          element={
            <Layout>
              <Users />
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
      </Routes>
    </Router>
  );
}

export default App;
