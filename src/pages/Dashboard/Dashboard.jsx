import { useEffect, useState } from "react";

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex items-center gap-4">
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>
    </div>
  );
}

export default function Dashboard({url}) {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
   
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRoutes(data.products);
  });


  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Shipments" value={routes.length} />
      <StatCard title="Total Products Weight" value={routes.reduce((sum, p) => sum + p.weight, 0)} />
      <StatCard title="Total Shipments Price" value={`₹${Math.floor(routes.reduce((sum, p) => sum + p.price, 0)*1000)}`} />
    </div>
  );
}
