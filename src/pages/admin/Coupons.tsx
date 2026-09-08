import { useState } from "react";
import { Button } from "@/components/ui/button";

const Coupons = () => {
  const [coupons] = useState([
    { code: "FESTIVE20", discount: "20%", minOrder: 2999, expires: "2026-10-31", status: "active", usage: 142 },
    { code: "WELCOME100", discount: "₹100 OFF", minOrder: 999, expires: "2026-12-31", status: "active", usage: 89 },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Coupons & Discounts</h2>
        <Button size="sm">Create Coupon</Button>
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-left border-b"><th>Code</th><th>Discount</th><th>Min Order</th><th>Expires</th><th>Usage</th><th>Status</th></tr></thead>
        <tbody>
          {coupons.map(c => (
            <tr key={c.code} className="border-b">
              <td className="py-2 font-mono font-bold">{c.code}</td>
              <td>{c.discount}</td>
              <td>₹{c.minOrder}</td>
              <td>{c.expires}</td>
              <td>{c.usage} uses</td>
              <td><span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">{c.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
