import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaGlobeAmericas,
  FaSortUp,
  FaSortDown,
  FaEllipsisV,
  FaEdit,
  FaFlag,
  FaTrash,
} from "react-icons/fa";

const Tooltip = ({ text, children }) => (
  <div className="relative group">
    {children}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
      whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white
      opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
      {text}
    </span>
  </div>
);
/* ================= DELETE MODAL ================= */
const DeleteConfirmationModal = ({ item, onClose, onConfirm }) => {
  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <span className="font-bold">{item.title}</span>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(item.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
/* ================= DETAILS MODAL ================= */
const ShipmentDetailsModal = ({ item,setEditItem,setSelectedItem, onClose }) => {
  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <div className="w-full flex justify-center mb-4">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-48 object-contain rounded-lg"
          />
        </div>

        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-4">Category: {item.category}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-lg font-bold">${item.price}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Stock</p>
            <p className="text-lg font-bold">{item.stock}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Brand</p>
            <p className="font-medium">{item.brand}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Rating</p>
            <p className="font-medium">{item.rating} ⭐</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-gray-800 leading-relaxed">{item.description}</p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button  onClick={(e) => { e.stopPropagation();setSelectedItem(null); setEditItem(item);setOpenMenuId(null); }} className="px-4 py-2 border rounded-lg">Edit</button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= EDIT MODAL ================= */
const EditModal = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: item.title,
    price: item.price,
    stock: item.stock,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({ ...item, ...form, price: Number(form.price), stock: Number(form.stock) });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

        <div className="flex flex-col gap-3">
           <p className="text-s text-gray-500">Product : </p>
           <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            placeholder="Title"
          />
          <p className="text-s text-gray-500">Price : </p>
             <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            placeholder="Price"
          />
          <p className="text-s text-gray-500">Stock : </p> 
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            placeholder="Stock"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
export default function Shipments({url}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("table"); // table | tile
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const menuRef = useRef(null);
  const [deleteItem, setDeleteItem] = useState(null);


  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const productsWithFlag = data.products.map((p) => ({ ...p, flagged: false }));
        setProducts(productsWithFlag);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [products, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const SortIcon = ({ col }) =>
    sortKey === col ? (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />) : null;

   
    const handleDeleteClick = (item) => {
        setDeleteItem(item);
        setOpenMenuId(null);
      };

      const handleConfirmDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
        setDeleteItem(null);
      };

  const handleFlag = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, flagged: !p.flagged } : p))
    );
    setOpenMenuId(null);
  };

  const handleSaveEdit = (updated) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    setEditItem(null);
  };

  if (loading) return <p className="text-gray-500">Loading shipments...</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaGlobeAmericas className="text-blue-600" /> Shipments
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setView("table")}
            className={`px-3 py-1 border rounded text-sm ${
              view === "table" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setView("tile")}
            className={`px-3 py-1 border rounded text-sm ${
              view === "tile" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Tiles
          </button>
        </div>
      </div>

      {/* ================= TABLE / TILE VIEW ================= */}
      {view === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr >
                <th>Image</th>
                <th onClick={() => handleSort("title")} className="cursor-pointer flex items-center gap-1 px-4 py-3">
                  Product <SortIcon col="title" />
                </th>
                <th className="px-4 py-3">Category</th>
                <th onClick={() => handleSort("price")} className="cursor-pointer flex items-center gap-1 px-4 py-3">
                  Price / Stock <SortIcon col="price" />
                </th>
                <th className="gap-1 px-4 py-3">Shipping Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.map((p) => (
                <tr  key={p.id} className={`${p.flagged ? "bg-yellow-50" : "hover:bg-gray-50"}`}>
                  <td className="px-4 py-2">
                    <img src={p.thumbnail} alt={p.title} className="h-12 w-12 object-contain rounded" />
                  </td>
                  <td className="px-4 py-2 font-medium">{p.title}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-semibold">${p.price}</div>
                      <div className="text-xs text-gray-500">Stock: {p.stock}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{p.shippingInformation}</td>
                  



                  <td className="px-4 py-2 flex gap-2">
                      {/* EDIT */}
                      <Tooltip text="Edit">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(null);
                            setEditItem(p);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                      </Tooltip>
                        {/* FLAG */}
                      <Tooltip text="Flag">
                      <button
                          onClick={() => handleFlag(p.id)}
                          className={`text-yellow-600 ${p.flagged?"opacity-100":"opacity-50"}`}
                        >
                          <FaFlag />
                        </button>
                      </Tooltip>
                        {/* DELETE */}
                        <Tooltip text="Delete">
                              <button onClick={() => handleDeleteClick(p)} className="text-red-600"><FaTrash /></button>
                        </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* TILE VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedItem(p)}
              className={`relative border rounded-xl p-4 shadow-sm hover:shadow cursor-pointer ${p.flagged ? "bg-yellow-50" : ""}`}
            >
              <div className="w-full flex justify-center mb-2">
                <img src={p.thumbnail} alt={p.title} className="h-32 object-contain rounded-lg" />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === p.id ? null : p.id);
                }}
                className="absolute top-3 right-3 text-gray-500"
              >
                <FaEllipsisV />
              </button>
              {/* Kebab menu */}
              {openMenuId === p.id && (
                <div ref={menuRef} className="absolute right-3 top-10 bg-white border rounded-lg shadow w-32 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditItem(p); }}
                    className="flex gap-2 px-3 py-2 text-sm w-full hover:bg-gray-100"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleFlag(p.id); }}
                    className="flex gap-2 px-3 py-2 text-sm w-full hover:bg-gray-100"
                  >
                    <FaFlag /> Flag
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(p); }}
                    className="flex gap-2 px-3 py-2 text-sm w-full text-red-600 hover:bg-red-50"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              )}    

              <h3 className="font-semibold truncate pr-6">{p.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{p.category}</p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">${p.price}</span>
                <span className={`text-xs px-2 py-1 rounded-full"}`}>{p.shippingInformation}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p-1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>

      {/* DETAILS MODAL */}
      <ShipmentDetailsModal item={selectedItem} setEditItem={setEditItem} setSelectedItem={setSelectedItem}  onClose={() => setSelectedItem(null)} />
      {/* EDIT MODAL */}
      {editItem && <EditModal item={editItem} onClose={() => setEditItem(null)} onSave={handleSaveEdit} />}
       {/* DELETE CONFIRMATION MODAL */}
        {deleteItem && (
          <DeleteConfirmationModal
            item={deleteItem}
            onClose={() => setDeleteItem(null)}
            onConfirm={handleConfirmDelete}
          />
        )} 
    </div>
  );
}
