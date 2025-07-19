// // App.tsx
// import React, { Suspense } from 'react';

// // Import the remote component using dynamic import
// const RemoteButton = React.lazy(() => import('remoteApp/Button'));
// function App() {
//   return (
//     <div>
//       <h1>Host App</h1>
//       <Suspense fallback={<div>Loading Remote Button...</div>}>
//         <RemoteButton text="click remote button" />
//       </Suspense>
//     </div>
//   );
// }
// export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Album from "./pages/Album";
// import PlayList from "./pages/PlayList";
// import Admin from "./pages/Admin";

// import Loading from "./components/Loading";
import { useUserData } from "./context/UserContext";

import Dashboard from "./pages/Dashboard";

const App = () => {
  const { isAuth } = useUserData();

  // if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/album/:id"
          element={isAuth ? <Album /> : <Navigate to="/login" />}
        />
        <Route
          path="/playlist"
          element={isAuth ? <PlayList /> : <Navigate to="/login" />}
        /> */}

        {/* Admin Only Route */}
        <Route
          path="/admin/dashboard"
          element={
          <Navigate to="/dashboard" />
            
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
