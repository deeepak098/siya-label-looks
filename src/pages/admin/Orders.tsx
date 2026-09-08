import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => { /* fetch from Firebase */ }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="w-full text-sm">
        <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t">
              <td className="py-2 font-mono">{o.id}</td>
              <td>{o.customerName}</td>
              <td>₹{o.total}</td>
              <td><Badge>{o.status}</Badge></td>
              <td>{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-500">Status flow: placed → confirmed → packed → shipped → delivered</div>
      <Button size="sm" className="mt-3">Update Status</Button>
    </div>
  );
};
export default Orders;
