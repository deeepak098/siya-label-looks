import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenueToday: 12400,
    revenueWeek: 85600,
    revenueMonth: 342000,
    ordersToday: 8,
    ordersWeek: 54,
    ordersMonth: 210,
    pendingOrders: 12,
    lowStockItems: 5,
  });

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
