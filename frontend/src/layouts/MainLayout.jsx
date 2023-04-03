import { Outlet } from "react-router-dom";

import Header from "../partials/Header";
import Footer from "../partials/Footer";

function MainLayout() {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh_-_95px_-_56px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
