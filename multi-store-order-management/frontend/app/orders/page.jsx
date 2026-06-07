"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/api";

export default function OrdersPage() {
  const [storeId, setStoreId] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (pageNumber = 1) => {
    setError("");
    setLoading(true);

    try {
      const result = await apiRequest(`/orders?store_id=${encodeURIComponent(storeId)}&page=${pageNumber}&limit=5`);
      setOrders(result.data);
      setMeta(result.meta);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message);
      setOrders([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Orders List</h1>
        <p className="muted">Filter orders by store id. Results are sorted by latest created order.</p>

        <div className="grid">
          <div>
            <label>Store ID</label>
            <input value={storeId} onChange={(e) => setStoreId(e.target.value)} placeholder="STORE-101" />
          </div>
          <div>
            <button style={{ marginTop: "31px" }} onClick={() => fetchOrders(1)} disabled={loading || !storeId}>
              {loading ? "Loading..." : "Fetch Orders"}
            </button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
      </div>

      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Store ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="6">No orders found.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id || order.id}>
                  <td>{order._id || order.id}</td>
                  <td>{order.store_id}</td>
                  <td>{order.items.map((item) => `${item.item_id} x ${item.qty}`).join(", ")}</td>
                  <td>₹{order.total_amount}</td>
                  <td><span className="badge">{order.status}</span></td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {meta && (
          <div className="grid" style={{ marginTop: "20px" }}>
            <button className="secondary" disabled={page <= 1} onClick={() => fetchOrders(page - 1)}>Previous</button>
            <p className="muted">Page {meta.page} of {meta.totalPages || 1} | Total Orders: {meta.totalOrders}</p>
            <button className="secondary" disabled={page >= meta.totalPages} onClick={() => fetchOrders(page + 1)}>Next</button>
          </div>
        )}
      </div>
    </main>
  );
}
