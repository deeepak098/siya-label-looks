
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Type, Layout, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "./ImageUpload";

interface WebsiteSettings {
  id?: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  font_family: string;
  hero_title: string;
  hero_subtitle: string;
  hero_background_image: string;
  logo_url: string;
  about_text: string;
  contact_email: string;
  contact_phone: string;
  created_at?: string;
  updated_at?: string;
}

const FONT_OPTIONS = [
  { value: "Inter", label: "Inter (Default)" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Lato", label: "Lato" },
  { value: "Montserrat", label: "Montserrat" },
];

const WebsiteCustomization = () => {
  const [settings, setSettings] = useState<WebsiteSettings>({
    primary_color: "#ec4899",
    secondary_color: "#d946ef",
    background_color: "#ffffff",
    text_color: "#374151",
    font_family: "Inter",
    hero_title: "Elegant Fashion for Every Occasion",
    hero_subtitle: "Discover our curated collection of contemporary clothing designed for the modern woman",
    hero_background_image: "",
    logo_url: "",
    about_text: "We believe in creating beautiful, sustainable fashion that empowers women to express their unique style.",
    contact_email: "hello@siya.com",
    contact_phone: "+91 98765 43210"
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw error;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error: any) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const settingsData = {
        ...settings,
        updated_at: new Date().toISOString()
      };

      if (settings.id) {
        const { error } = await supabase
          .from('website_settings')
          .update(settingsData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('website_settings')
          .insert([settingsData])
          .select()
          .single();

        if (error) throw error;
        setSettings(data);
      }

      toast({
        title: "Settings saved",
        description: "Website customization has been updated successfully",
      });

      // Apply changes to the website by updating CSS variables
      applySettingsToWebsite(settings);
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applySettingsToWebsite = (settings: WebsiteSettings) => {
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--primary-color', settings.primary_color);
    root.style.setProperty('--secondary-color', settings.secondary_color);
    root.style.setProperty('--background-color', settings.background_color);
    root.style.setProperty('--text-color', settings.text_color);
    
    // Update font family
    if (settings.font_family !== 'Inter') {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${settings.font_family.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    root.style.setProperty('--font-family', settings.font_family);
  };

  const handleInputChange = (field: keyof WebsiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Scheme
          </CardTitle>
          <CardDescription>Customize your website's color palette</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary_color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary_color"
                  type="color"
                  value={settings.primary_color}
                  onChange={(e) => handleInputChange('primary_color', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.primary_color}
                  onChange={(e) => handleInputChange('primary_color', e.target.value)}
                  placeholder="#ec4899"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondary_color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary_color"
                  type="color"
                  value={settings.secondary_color}
                  onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.secondary_color}
                  onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                  placeholder="#d946ef"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="background_color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background_color"
                  type="color"
                  value={settings.background_color}
                  onChange={(e) => handleInputChange('background_color', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.background_color}
                  onChange={(e) => handleInputChange('background_color', e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="text_color">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  id="text_color"
                  type="color"
                  value={settings.text_color}
                  onChange={(e) => handleInputChange('text_color', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.text_color}
                  onChange={(e) => handleInputChange('text_color', e.target.value)}
                  placeholder="#374151"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Typography
          </CardTitle>
          <CardDescription>Choose your website's font family</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="font_family">Font Family</Label>
            <Select value={settings.font_family} onValueChange={(value) => handleInputChange('font_family', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Hero Section
          </CardTitle>
          <CardDescription>Customize your homepage hero content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input
              id="hero_title"
              value={settings.hero_title}
              onChange={(e) => handleInputChange('hero_title', e.target.value)}
              placeholder="Enter hero title"
            />
          </div>
          <div>
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              value={settings.hero_subtitle}
              onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
              placeholder="Enter hero subtitle"
              rows={3}
            />
          </div>
          <div>
            <Label>Hero Background Image</Label>
            <ImageUpload
              imageUrl={settings.hero_background_image}
              onImageChange={(url) => handleInputChange('hero_background_image', url)}
              bucketName="website-assets"
              folder="hero"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
          <CardDescription>Update website content and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="about_text">About Text</Label>
            <Textarea
              id="about_text"
              value={settings.about_text}
              onChange={(e) => handleInputChange('about_text', e.target.value)}
              placeholder="Enter about text"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
                placeholder="hello@siya.com"
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSave} 
        disabled={loading}
        className="w-full bg-gradient-to-r from-siya-500 to-magenta-500"
      >
        <Save className="h-4 w-4 mr-2" />
        {loading ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
};

export default WebsiteCustomization;
