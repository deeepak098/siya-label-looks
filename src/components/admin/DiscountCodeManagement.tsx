
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DiscountCode {
  id: string;
  code: string;
  name: string;
  type: string;
  value: number;
  min_order_amount: number;
  usage_limit: number | null;
  used_count: number;
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
  created_at: string;
}

const DiscountCodeManagement = () => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "percentage",
    value: "",
    min_order_amount: "",
    usage_limit: "",
    is_active: true,
    valid_until: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDiscountCodes();
  }, []);

  const fetchDiscountCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDiscountCodes(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching discount codes",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const codeData = {
        code: formData.code.toUpperCase(),
        name: formData.name,
        type: formData.type,
        value: parseFloat(formData.value),
        min_order_amount: parseFloat(formData.min_order_amount) || 0,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
        is_active: formData.is_active,
        valid_until: formData.valid_until || null
      };

      if (editingCode) {
        const { error } = await supabase
          .from('discount_codes')
          .update(codeData)
          .eq('id', editingCode.id);

        if (error) throw error;
        toast({ title: "Discount code updated successfully" });
      } else {
        const { error } = await supabase
          .from('discount_codes')
          .insert([codeData]);

        if (error) throw error;
        toast({ title: "Discount code added successfully" });
      }

      setFormData({ code: "", name: "", type: "percentage", value: "", min_order_amount: "", usage_limit: "", is_active: true, valid_until: "" });
      setIsAddDialogOpen(false);
      setEditingCode(null);
      fetchDiscountCodes();
    } catch (error: any) {
      toast({
        title: "Error saving discount code",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('discount_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Discount code deleted successfully" });
      fetchDiscountCodes();
    } catch (error: any) {
      toast({
        title: "Error deleting discount code",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (code: DiscountCode) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      name: code.name,
      type: code.type,
      value: code.value.toString(),
      min_order_amount: code.min_order_amount?.toString() || "",
      usage_limit: code.usage_limit?.toString() || "",
      is_active: code.is_active,
      valid_until: code.valid_until ? code.valid_until.split('T')[0] : ""
    });
    setIsAddDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingCode(null);
    setFormData({ code: "", name: "", type: "percentage", value: "", min_order_amount: "", usage_limit: "", is_active: true, valid_until: "" });
    setIsAddDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Discount Code Management</CardTitle>
            <CardDescription>Create and manage discount codes</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} className="bg-gradient-to-r from-siya-500 to-magenta-500">
                <Plus className="h-4 w-4 mr-2" />
                Add Discount Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingCode ? 'Edit Discount Code' : 'Add New Discount Code'}</DialogTitle>
                <DialogDescription>
                  {editingCode ? 'Update discount code details' : 'Create a new discount code'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="SAVE20"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Summer Sale"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Discount Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">
                    Value {formData.type === 'percentage' ? '(%)' : '(₹)'}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="min_order_amount">Minimum Order Amount (₹)</Label>
                  <Input
                    id="min_order_amount"
                    type="number"
                    step="0.01"
                    value={formData.min_order_amount}
                    onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="usage_limit">Usage Limit</Label>
                  <Input
                    id="usage_limit"
                    type="number"
                    value={formData.usage_limit}
                    onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                    placeholder="Leave empty for unlimited"
                  />
                </div>
                <div>
                  <Label htmlFor="valid_until">Valid Until</Label>
                  <Input
                    id="valid_until"
                    type="date"
                    value={formData.valid_until}
                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingCode ? 'Update Code' : 'Add Code'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discountCodes.map((code) => (
              <TableRow key={code.id}>
                <TableCell className="font-mono">{code.code}</TableCell>
                <TableCell>{code.name}</TableCell>
                <TableCell className="capitalize">{code.type}</TableCell>
                <TableCell>
                  {code.type === 'percentage' ? `${code.value}%` : `₹${code.value}`}
                </TableCell>
                <TableCell>
                  {code.used_count}/{code.usage_limit || '∞'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${code.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {code.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(code)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(code.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {discountCodes.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                  No discount codes found. Add your first discount code to get started!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DiscountCodeManagement;
