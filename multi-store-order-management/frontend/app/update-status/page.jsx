"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/api";

export default function UpdateStatusPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("PREPARING");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStatus = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const result = await apiRequest(`/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      setMessage(`Order status updated to ${result.data.status}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Update Order Status</h1>
        <p className="muted">Use MongoDB order id and update status professionally.</p>

        <form onSubmit={updateStatus} className="grid">
          <div>
            <label>Order ID</label>
            <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="MongoDB Order ID" required />
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PLACED">PLACED</option>
              <option value="PREPARING">PREPARING</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
          <div>
            <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Status"}</button>
          </div>
        </form>

        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
}
