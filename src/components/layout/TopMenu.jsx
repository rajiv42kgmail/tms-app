import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Shipments", path: "/shipments/worldwide" },
];

export default function TopMenu() {
  return (
    <nav className="bg-white shadow flex justify-center md:justify-start p-2 md:p-4 gap-4 md:gap-6 sticky top-16 z-40">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-medium text-sm transition hover:bg-blue-100 ${
              isActive ? "bg-blue-600 text-white" : "text-gray-700"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
