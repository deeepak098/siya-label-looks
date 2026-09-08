import { useState } from "react";
import { Button } from "@/components/ui/button";

const Payments = () => {
  const [payments] = useState([
    { id: "TXN1001", orderId: "ORD8901", method: "online", status: "paid", amount: 4500, date: "2026-09-07" },
    { id: "TXN1002", orderId: "ORD8902", method: "COD", status: "pending", amount: 2200, date: "2026-09-07" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Payments</h2>
        <Button size="sm" variant="outline">Export CSV</Button>
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-left border-b"><th>Txn ID</th><th>Order ID</th><th>Method</th><th>Status</th><th>Amount</th><th>Date</th></tr></thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="border-b">
              <td className="py-2 font-mono text-xs">{p.id}</td>
              <td className="font-mono text-xs">{p.orderId}</td>
              <td>{p.method}</td>
              <td><span className={`px-2 py-0.5 rounded text-xs ${p.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{p.status}</span></td>
              <td>₹{p.amount}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
