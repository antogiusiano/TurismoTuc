//react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Paginas y rutas
import Header from "./Components/common/Header";
import Footer from "./Components/common/Footer";
import Home from "./pages/publicPages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/adminPages/Dashboard";
import Error from "./pages/Error";
//Protección
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard-admin/*" element={<ProtectedRoute allowedRoles={["Administrador"]}><Dashboard /></ProtectedRoute>}/>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
