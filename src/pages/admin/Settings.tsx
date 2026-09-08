import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [shippingRate, setShippingRate] = useState("99");
  const [taxRate, setTaxRate] = useState("12");
  const [heroTitle, setHeroTitle] = useState("Festive Collection 2026");

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold">Admin Settings</h2>

      <div className="space-y-4 border p-4 rounded bg-white">
        <h3 className="font-semibold text-lg">Shipping & Taxes</h3>
        <div>
          <label className="text-xs font-medium block mb-1">Standard Shipping Rate (₹)</label>
          <Input value={shippingRate} onChange={e => setShippingRate(e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Default Tax/GST Rate (%)</label>
          <Input value={taxRate} onChange={e => setTaxRate(e.target.value)} />
        </div>
      </div>

      <div className="space-y-4 border p-4 rounded bg-white">
        <h3 className="font-semibold text-lg">Homepage CMS</h3>
        <div>
          <label className="text-xs font-medium block mb-1">Hero Banner Title</label>
          <Input value={heroTitle} onChange={e => setHeroTitle(e.target.value)} />
        </div>
      </div>

      <Button>Save Settings</Button>
    </div>
  );
};

export default Settings;
