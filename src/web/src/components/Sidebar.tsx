import { Home, User, Settings, LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <div className="bg-darker text-white h-100 pe-3 pt-1">
      {/* Sidebar content */}
      <div className="nav flex-column">
        <div className="nav-item">
          <a className="nav-link text-white d-flex align-items-center justify-content-start" href="#">
            <Home size={18} className="me-2"/>
            {" Home"}
          </a>
        </div>
        <div className="nav-item">
          <a className="nav-link text-white d-flex align-items-center justify-content-start" href="#">
            <User size={18} className="me-2"/>
            {" Profile"}
          </a>
        </div>
        <div className="nav-item hover-bg-dark">
          <a className="nav-link text-white d-flex align-items-center justify-content-start" href="#">
            <Settings size={18} className="me-2"/>
            {" Settings"}
          </a>
        </div>
        <div className="nav-item">
          <a className="nav-link text-white d-flex align-items-center justify-content-start" href="#">
            <LogOut size={18} className="me-2"/>
            {" Logout"}
          </a>
        </div>
      </div>
    </div>
  );
};

