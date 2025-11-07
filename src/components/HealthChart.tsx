import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface HealthChartProps {
  userId: string;
}

interface ChartData {
  date: string;
  temperature?: number;
  heartRate?: number;
  bloodSugar?: number;
}

const HealthChart = ({ userId }: HealthChartProps) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    loadChartData();
  }, [userId]);

  const loadChartData = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: logs } = await supabase
      .from("health_logs")
      .select("log_date, temperature, heart_rate, blood_sugar")
      .eq("user_id", userId)
      .gte("log_date", thirtyDaysAgo.toISOString().split("T")[0])
      .order("log_date", { ascending: true });

    if (logs) {
      const chartData = logs.map((log) => ({
        date: new Date(log.log_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        temperature: log.temperature || undefined,
        heartRate: log.heart_rate || undefined,
        bloodSugar: log.blood_sugar || undefined,
      }));
      setData(chartData);
    }
  };

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No health data available. Start logging your vitals to see trends.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="date" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="hsl(var(--primary))"
          name="Temperature (°F)"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))" }}
        />
        <Line
          type="monotone"
          dataKey="heartRate"
          stroke="hsl(var(--accent))"
          name="Heart Rate (bpm)"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--accent))" }}
        />
        <Line
          type="monotone"
          dataKey="bloodSugar"
          stroke="hsl(var(--destructive))"
          name="Blood Sugar (mg/dL)"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--destructive))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HealthChart;
