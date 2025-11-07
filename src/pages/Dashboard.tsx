import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, FileText, Calendar, Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HealthChart from "@/components/HealthChart";
import StatsCard from "@/components/StatsCard";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({ logs: 0, reports: 0, insights: 0 });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadStats(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadStats = async (userId: string) => {
    const [logsResult, reportsResult] = await Promise.all([
      supabase.from("health_logs").select("id", { count: "exact" }).eq("user_id", userId),
      supabase.from("medical_reports").select("id", { count: "exact" }).eq("user_id", userId),
    ]);

    setStats({
      logs: logsResult.count || 0,
      reports: reportsResult.count || 0,
      insights: 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">VitalSync</h1>
              <p className="text-sm text-muted-foreground">Health Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
              <UserIcon className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Here's your health overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Health Logs"
            value={stats.logs}
            icon={Calendar}
            description="Total entries recorded"
          />
          <StatsCard
            title="Medical Reports"
            value={stats.reports}
            icon={FileText}
            description="Documents uploaded"
          />
          <StatsCard
            title="AI Insights"
            value={stats.insights}
            icon={Sparkles}
            description="Generated analyses"
          />
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
            <CardDescription>Your vital signs over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthChart userId={user.id} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Log Daily Health
              </CardTitle>
              <CardDescription>Track your symptoms and vitals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate("/add-log")}>
                Add New Log
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Upload Medical Report
              </CardTitle>
              <CardDescription>Store your lab results and prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate("/upload-report")}>
                Upload Document
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI Health Insights
              </CardTitle>
              <CardDescription>Get personalized health recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" onClick={() => navigate("/insights")}>
                View Insights
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Export Health Summary
              </CardTitle>
              <CardDescription>Download your complete health report</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" onClick={() => navigate("/export")}>
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
