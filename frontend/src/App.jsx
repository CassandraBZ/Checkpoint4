import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import Connexion from "./pages/Connexion";
import Accueil from "./pages/Accueil";
import MainLayout from "./layouts/MainLayout";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Connexion />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Accueil" element={<Accueil />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
