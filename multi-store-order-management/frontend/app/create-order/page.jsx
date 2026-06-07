"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/api";

export default function CreateOrderPage() {
  const [storeId, setStoreId] = useState("");
  const [itemId, setItemId] = useState("");
  const [qty, setQty] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const payload = {
        store_id: storeId,
        items: [{ item_id: itemId, qty: Number(qty) }],
        total_amount: Number(totalAmount)
      };

      const result = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      setMessage(`Order created successfully. Order ID: ${result.data.id}`);
      setStoreId("");
      setItemId("");
      setQty(1);
      setTotalAmount(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Create Order</h1>
        <p className="muted">Enter order details. Default order status will be PLACED.</p>

        <form onSubmit={handleSubmit} className="grid">
          <div>
            <label>Store ID</label>
            <input value={storeId} onChange={(e) => setStoreId(e.target.value)} placeholder="STORE-101" required />
          </div>
          <div>
            <label>Item ID</label>
            <input value={itemId} onChange={(e) => setItemId(e.target.value)} placeholder="ITEM-501" required />
          </div>
          <div>
            <label>Quantity</label>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} required />
          </div>
          <div>
            <label>Total Amount</label>
            <input type="number" min="0" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required />
          </div>
          <div>
            <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Order"}</button>
          </div>
        </form>

        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
}
