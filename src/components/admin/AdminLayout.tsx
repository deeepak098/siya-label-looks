import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, CreditCard, Users, Tag, Settings as SettingsIcon, LogOut } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Payments", path: "/admin/payments", icon: CreditCard },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Coupons", path: "/admin/coupons", icon: Tag },
    { label: "Settings", path: "/admin/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      <aside className="w-64 border-r bg-white flex flex-col justify-between p-4">
        <div>
          <div className="font-bold text-xl mb-6 px-2 text-indigo-600">Siya Admin</div>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          onClick={() => navigate("/admin/login")}
          className="flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded text-red-600 hover:bg-red-50 w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
