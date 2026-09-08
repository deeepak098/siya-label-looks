import { useState } from "react";
import { Button } from "@/components/ui/button";

const Customers = () => {
  const [customers] = useState([
    { id: "CUST101", name: "Ananya Sharma", email: "ananya@example.com", ordersCount: 5, lifetimeValue: 24500, status: "active" },
    { id: "CUST102", name: "Priya Patel", email: "priya@example.com", ordersCount: 2, lifetimeValue: 8900, status: "blocked" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <table className="w-full text-sm">
        <thead><tr className="text-left border-b"><th>Name</th><th>Email</th><th>Orders</th><th>Lifetime Value</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id} className="border-b">
              <td className="py-2 font-medium">{c.name}</td>
              <td className="text-gray-500">{c.email}</td>
              <td>{c.ordersCount}</td>
              <td>₹{c.lifetimeValue.toLocaleString()}</td>
              <td><span className={`px-2 py-0.5 rounded text-xs ${c.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{c.status}</span></td>
              <td>
                <Button size="xs" variant={c.status === "active" ? "destructive" : "outline"} className="h-7 text-xs px-2">
                  {c.status === "active" ? "Block" : "Unblock"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
