import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db, collection, getDocs, query } from "@/lib/firebase";

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenueToday: 0,
    revenueWeek: 0,
    revenueMonth: 0,
    ordersToday: 0,
    ordersWeek: 0,
    ordersMonth: 0,
    pendingOrders: 0,
    lowStockItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const ordersSnap = await getDocs(collection(db, "orders"));
      const productsSnap = await getDocs(collection(db, "products"));

      let revToday = 0, revWeek = 0, revMonth = 0;
      let ordToday = 0, ordWeek = 0, ordMonth = 0;
      let pending = 0;

      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const weekStart = todayStart - 7 * 24 * 60 * 60 * 1000;
      const monthStart = todayStart - 30 * 24 * 60 * 60 * 1000;

      ordersSnap.docs.forEach((docSnap) => {
        const data = docSnap.data();
        const amt = Number(data.total_amount || data.total || 0);
        const status = data.status || "placed";
        const orderTime = new Date(data.created_at || Date.now()).getTime();

        if (status === "placed" || status === "confirmed") {
          pending++;
        }

        if (orderTime >= todayStart) {
          revToday += amt;
          ordToday++;
        }
        if (orderTime >= weekStart) {
          revWeek += amt;
          ordWeek++;
        }
        if (orderTime >= monthStart) {
          revMonth += amt;
          ordMonth++;
        }
      });

      let lowStock = 0;
      productsSnap.docs.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.in_stock === false || (data.stock !== undefined && Number(data.stock) < 5)) {
          lowStock++;
        }
      });

      setStats({
        revenueToday: revToday,
        revenueWeek: revWeek,
        revenueMonth: revMonth,
        ordersToday: ordToday,
        ordersWeek: ordWeek,
        ordersMonth: ordMonth,
        pendingOrders: pending,
        lowStockItems: lowStock,
      });
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Today's Revenue</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">₹{stats.revenueToday.toLocaleString()}</div><p className="text-xs text-gray-400">{stats.ordersToday} orders</p></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">This Week</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">₹{stats.revenueWeek.toLocaleString()}</div><p className="text-xs text-gray-400">{stats.ordersWeek} orders</p></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">₹{stats.revenueMonth.toLocaleString()}</div><p className="text-xs text-gray-400">{stats.ordersMonth} orders</p></CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/40">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-amber-800">Alerts</CardTitle></CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-amber-900">{stats.pendingOrders} pending orders</div>
            <div className="text-sm font-medium text-red-600 mt-1">{stats.lowStockItems} low-stock alerts</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 md:col-span-2">
          <h3 className="font-semibold text-sm mb-2">Sales Trend</h3>
          <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">Chart: Revenue over time</div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-sm mb-2">Category Split</h3>
          <ul className="text-xs space-y-2">
            <li className="flex justify-between"><span>Sarees</span><span className="font-semibold">45%</span></li>
            <li className="flex justify-between"><span>Coord Sets</span><span className="font-semibold">35%</span></li>
            <li className="flex justify-between"><span>Ethnic Wear</span><span className="font-semibold">20%</span></li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
