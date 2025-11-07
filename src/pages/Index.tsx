import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Activity, Heart, Shield, Sparkles, TrendingUp, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Icon Hero Glow */}
<div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-6">
  {/* Animated glow background */}
  <div className="absolute inset-0 bg-gradient-to-tr from-green-500 via-emerald-400 to-lime-400 blur-3xl opacity-50 animate-pulse rounded-full" />
  
  {/* Icon container */}
  <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-green-600 to-emerald-500 shadow-xl border border-white/10">
    <Activity className="w-10 h-10 text-white drop-shadow-lg" />
  </div>
</div>
          {/* <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent">VitalSync</span>
          </h1> */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Track. Analyze. Stay Ahead of Your Health.
          </p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Your secure, AI-powered personal health record system. Upload medical documents, track daily symptoms, 
            and get intelligent insights to take preventive actions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
  {/* Section Heading */}
  <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-600 via-emerald-400 to-lime-400 bg-clip-text text-transparent drop-shadow-sm">
    Powerful Features for Better Health
  </h2>

  {/* Feature Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    <FeatureCard
      icon={Heart}
      title="Daily Health Logs"
      description="Track symptoms, temperature, blood pressure, heart rate, and blood sugar levels with ease."
    />
    <FeatureCard
      icon={FileText}
      title="Medical Reports"
      description="Securely upload and organize lab results, prescriptions, and diagnostic documents."
    />
    <FeatureCard
      icon={Sparkles}
      title="AI-Powered Insights"
      description="Get personalized health analysis and preventive recommendations powered by AI."
    />
    <FeatureCard
      icon={TrendingUp}
      title="Health Trends"
      description="Visualize your health data with interactive charts and identify patterns over time."
    />
    <FeatureCard
      icon={Shield}
      title="Secure & Private"
      description="Your health data is encrypted and protected with enterprise-grade security."
    />
    <FeatureCard
      icon={FileText}
      title="Export Reports"
      description="Download comprehensive health summaries to share with your healthcare providers."
    />
  </div>
</section>

      {/* CTA Section */}
      {/* <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-card p-12 space-y-6">
          <h2 className="text-3xl font-bold">Ready to Take Control of Your Health?</h2>
          <p className="text-lg text-muted-foreground">
            Join VitalSync today and start your journey to better health monitoring and insights.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8">
            Create Your Account
          </Button>
        </div>
      </section> */}

      <section className="relative py-20 bg-gradient-to-br from-accent/10 via-background to-background overflow-hidden">
  <div className="container mx-auto px-6 text-center relative z-10">
    <div className="max-w-3xl mx-auto bg-card rounded-3xl shadow-2xl p-10 sm:p-14 backdrop-blur-lg border border-border/40 space-y-6 transition-all hover:shadow-accent/30">
      
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
          </svg>
        </div>
      </div>

      <h2 className="text-4xl font-extrabold tracking-tight leading-tight text-foreground">
        Take Control of Your Health Today 
      </h2>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Join <span className="font-semibold text-accent">VitalSync</span> — your AI-powered health companion that helps you 
        monitor, analyze, and improve your well-being with smart insights.
      </p>

      <Button
        size="lg"
        onClick={() => navigate("/auth")}
        className="text-lg px-10 py-6 bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-all rounded-xl"
      >
         Create Your Account
      </Button>
    </div>
  </div>

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_60%)]"></div>
</section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 VitalSync. Track. Analyze. Stay Ahead of Your Health.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

// const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
//   return (
//     <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
//       <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
//         <Icon className="w-6 h-6 text-primary-foreground" />
//       </div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-muted-foreground">{description}</p>
//     </div>
//   );
// };

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
      
      {/* Glow background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl bg-gradient-to-r from-emerald-300/30 via-green-400/30 to-teal-400/30 rounded-2xl -z-10" />

      {/* Icon container */}
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr from-green-500 to-emerald-500 text-white shadow-md mb-6 group-hover:scale-105 transition-transform duration-300">
        <Icon className="w-7 h-7" />
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-emerald-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Index;
