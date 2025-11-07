import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Activity, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Insights = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string>("");
  const [hasLogs, setHasLogs] = useState(false);

  useEffect(() => {
    checkHealthLogs();
  }, []);

  const checkHealthLogs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { count } = await supabase
      .from("health_logs")
      .select("id", { count: "exact" })
      .eq("user_id", user.id);

    setHasLogs((count || 0) > 0);
  };

  const generateInsights = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch recent health logs
      const { data: logs } = await supabase
        .from("health_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("log_date", { ascending: false })
        .limit(10);

      if (!logs || logs.length === 0) {
        toast({ variant: "destructive", title: "No health data found. Please add some health logs first." });
        return;
      }

      // Format data for AI analysis
      const healthData = logs.map((log) => ({
        date: log.log_date,
        symptoms: log.symptoms,
        temperature: log.temperature,
        heartRate: log.heart_rate,
        bloodPressure: log.blood_pressure_systolic && log.blood_pressure_diastolic
          ? `${log.blood_pressure_systolic}/${log.blood_pressure_diastolic}`
          : null,
        bloodSugar: log.blood_sugar,
        notes: log.notes,
      }));

      // Call AI insights edge function
      const { data, error } = await supabase.functions.invoke("generate-health-insights", {
        body: { healthData },
      });

      if (error) throw error;

      setInsights(data.insights);
      toast({ title: "AI insights generated successfully!" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate insights",
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
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold">AI Health Insights</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Get Personalized Health Analysis</CardTitle>
            <CardDescription>
              Our AI analyzes your health logs to provide personalized insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!hasLogs && (
              <Alert>
                <AlertDescription>
                  You need to add some health logs before generating AI insights.
                  <Button variant="link" className="ml-2 p-0 h-auto" onClick={() => navigate("/add-log")}>
                    Add your first log
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={generateInsights}
              disabled={loading || !hasLogs}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing your health data...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Insights
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {insights && (
          <Card className="shadow-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Your Health Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-foreground">{insights}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {!insights && !loading && (
          <Card className="shadow-card border-dashed">
            <CardContent className="py-12 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Click the button above to generate your personalized health insights
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Insights;
