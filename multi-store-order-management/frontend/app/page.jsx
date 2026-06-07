import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Multi-Store Order Management System</h1>
        <p>
          A clean and professional full-stack assessment project built using Next.js,
          React, Node.js, Express, and MongoDB. It supports order creation, store-wise
          filtering, pagination, and order status updates.
        </p>
      </section>

      <section className="grid" style={{ marginTop: "24px" }}>
        <div className="card">
          <h3>Create Orders</h3>
          <p className="muted">Add store orders with item quantity and total amount.</p>
          <Link href="/create-order"><button>Go to Create Order</button></Link>
        </div>
        <div className="card">
          <h3>View Orders</h3>
          <p className="muted">Filter orders by store id with backend pagination.</p>
          <Link href="/orders"><button>Go to Orders List</button></Link>
        </div>
        <div className="card">
          <h3>Update Status</h3>
          <p className="muted">Update status as PLACED, PREPARING, or COMPLETED.</p>
          <Link href="/update-status"><button>Go to Update Status</button></Link>
        </div>
      </section>
    </main>
  );
}
