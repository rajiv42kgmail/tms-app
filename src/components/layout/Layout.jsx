import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TopMenu from "./TopMenu";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100">
      <Topbar onToggle={() => setOpen(!open)} />
      <TopMenu /> {/* Horizontal menu added below Topbar */}
      <div className="flex">
        <Sidebar open={open} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
