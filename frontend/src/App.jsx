import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";

import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
