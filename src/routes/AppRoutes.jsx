import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Shipments from "../pages/Shipment/Shipments";
import NotFound from "../pages/Notfound";
import {useState} from 'react';
// React 18 Admin Template with Top Menu Bar + Sidebar (Responsive)
export default function AppRoutes() {
    const [geturl,setUrl] = useState("https://dummyjson.com/products")
    return (
         <Routes>
      <Route path="/" element={<Dashboard url={geturl} />} />
      <Route path="/shipments/worldwide" element={<Shipments url={geturl}/>} />
         <Route path="/*" element={<NotFound />} />

    </Routes>
    );
}




