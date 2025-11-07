import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Activity, ArrowLeft } from "lucide-react";

const AddLog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    logDate: new Date().toISOString().split("T")[0],
    symptoms: "",
    temperature: "",
    bpSystolic: "",
    bpDiastolic: "",
    bloodSugar: "",
    heartRate: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const symptomsArray = formData.symptoms
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);

      const { error } = await supabase.from("health_logs").insert({
        user_id: user.id,
        log_date: formData.logDate,
        symptoms: symptomsArray.length > 0 ? symptomsArray : null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        blood_pressure_systolic: formData.bpSystolic ? parseInt(formData.bpSystolic) : null,
        blood_pressure_diastolic: formData.bpDiastolic ? parseInt(formData.bpDiastolic) : null,
        blood_sugar: formData.bloodSugar ? parseFloat(formData.bloodSugar) : null,
        heart_rate: formData.heartRate ? parseInt(formData.heartRate) : null,
        notes: formData.notes || null,
      });

      if (error) throw error;

      toast({ title: "Health log added successfully!" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to add log",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Add Health Log</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Daily Health Entry</CardTitle>
            <CardDescription>Record your symptoms and vital signs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logDate">Date</Label>
                <Input
                  id="logDate"
                  type="date"
                  value={formData.logDate}
                  onChange={(e) => setFormData({ ...formData, logDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
                <Input
                  id="symptoms"
                  placeholder="e.g., headache, fatigue, cough"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="98.6"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="70"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bpSystolic">Blood Pressure (Systolic)</Label>
                  <Input
                    id="bpSystolic"
                    type="number"
                    placeholder="120"
                    value={formData.bpSystolic}
                    onChange={(e) => setFormData({ ...formData, bpSystolic: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bpDiastolic">Blood Pressure (Diastolic)</Label>
                  <Input
                    id="bpDiastolic"
                    type="number"
                    placeholder="80"
                    value={formData.bpDiastolic}
                    onChange={(e) => setFormData({ ...formData, bpDiastolic: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                  <Input
                    id="bloodSugar"
                    type="number"
                    step="0.1"
                    placeholder="100"
                    value={formData.bloodSugar}
                    onChange={(e) => setFormData({ ...formData, bloodSugar: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional observations or context..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard")} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Saving..." : "Save Log"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddLog;
