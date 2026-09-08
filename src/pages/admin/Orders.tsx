import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { db, collection, getDocs, doc, updateDoc, query, orderBy } from "@/lib/firebase";

interface Order {
  id: string;
  customer_email: string;
  total_amount: number;
  status: string;
  items: any[];
  created_at: string;
  customer_name?: string;
  shipping_address?: any;
}

const ORDER_STATUSES = ["placed", "confirmed", "packed", "shipped", "delivered", "cancelled", "returned"];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "orders"), orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);

      const formattedOrders: Order[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          customer_email: data.customer_email || data.email || "N/A",
          total_amount: Number(data.total_amount || data.total || 0),
          status: data.status || "placed",
          items: Array.isArray(data.items) ? data.items : [],
          created_at: data.created_at || new Date().toISOString(),
          customer_name: data.customer_name || data.name || "Customer",
          shipping_address: data.shipping_address || data.address,
        };
      });

      setOrders(formattedOrders);
    } catch (error: any) {
      toast({
        title: "Error fetching orders",
        description: error.message || "Failed to load orders from Firebase",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );

      toast({
        title: "Order Updated",
        description: `Order ${orderId.slice(0, 8)} status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">shipped</Badge>;
      case "packed":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">packed</Badge>;
      case "confirmed":
        return <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">confirmed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <Button size="sm" variant="outline" onClick={fetchOrders} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="border rounded bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left font-medium text-gray-600">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Items</th>
              <th className="p-3">Date</th>
              <th className="p-3">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono text-xs text-gray-500">{o.id.slice(0, 8)}...</td>
                <td className="p-3">
                  <div className="font-medium text-gray-900">{o.customer_name}</div>
                  <div className="text-xs text-gray-400">{o.customer_email}</div>
                </td>
                <td className="p-3 font-semibold">₹{o.total_amount.toLocaleString()}</td>
                <td className="p-3">{getStatusBadge(o.status)}</td>
                <td className="p-3 text-xs text-gray-500">{o.items.length} item(s)</td>
                <td className="p-3 text-xs text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <Select value={o.status} onValueChange={(val) => handleStatusChange(o.id, val)}>
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((st) => (
                        <SelectItem key={st} value={st} className="text-xs">
                          {st}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-400">
        Status Flow: <span className="font-medium">placed → confirmed → packed → shipped → delivered</span>
      </div>
    </div>
  );
};

export default Orders;
