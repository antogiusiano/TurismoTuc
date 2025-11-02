import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/common/Header";
import Footer from "./Components/common/Footer";
import Home from "./pages/publicPages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/adminPages/Dashboard";
import Catalogo from "./pages/publicPages/Catalogo";
import DetalleExcursion from "./pages/publicPages/DetalleExcursion";

import Error from "./pages/Error";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (con Header y Footer) */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/catalogo"
          element={
            <>
              <Header />
              <Catalogo />
              <Footer />
            </>
          }
        />
        <Route
          path="/excursion/:id"
          element={
            <>
              <Header />
              <DetalleExcursion />
              <Footer />
            </>
          }
        />
        
        <Route
          path="/admin"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />

        {/* Rutas del panel admin (SIN Header ni Footer) */}
        <Route
          path="/dashboard-admin/*"
          element={
            <ProtectedRoute allowedRoles={["Administrador"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Página de error */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <Error />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
