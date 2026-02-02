import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTruck,
  FaChevronDown,
  FaGlobe,
} from "react-icons/fa";

const links = [
  {
    name: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/",
  },
  
  {
    name: "Shipments",
    icon: <FaTruck />,
    submenu: [
      { name: "Worldwide Shipments", path: "/shipments/worldwide", icon: <FaGlobe /> },
      
    ],
  },
  
];

export default function Sidebar({ open }) {
  const [submenuOpen, setSubmenuOpen] = useState({});

  const toggleSubmenu = (name) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={`bg-white shadow-md min-h-screen transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <nav className="flex flex-col gap-1 mt-4 px-2">
        {links.map((link) => (
          <div key={link.name}>
            {/* MAIN MENU */}
            {!link.submenu ? (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                <span className="text-xl">{link.icon}</span>
                {open && <span className="font-medium">{link.name}</span>}
              </NavLink>
            ) : (
              <>
                {/* PARENT WITH SUBMENU */}
                <button
                  onClick={() => toggleSubmenu(link.name)}
                  className="flex items-center gap-3 p-3 rounded-lg w-full text-gray-700 hover:bg-blue-100"
                >
                  <span className="text-xl">{link.icon}</span>
                  {open && <span className="font-medium">{link.name}</span>}
                  {open && (
                    <FaChevronDown
                      className={`ml-auto transition-transform ${
                        submenuOpen[link.name] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* SUBMENU */}
                {submenuOpen[link.name] && open && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {link.submenu.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-2 rounded-lg text-sm transition ${
                            isActive
                              ? "bg-blue-500 text-white"
                              : "text-gray-600 hover:bg-blue-100"
                          }`
                        }
                      >
                        <span className="text-base">{sub.icon}</span>
                        <span>{sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
