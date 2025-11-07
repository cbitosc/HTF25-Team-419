// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { Activity } from "lucide-react";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isLogin) {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         toast({ title: "Login successful!", description: "Welcome back to VitalSync" });
//         navigate("/dashboard");
//       } else {
//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             data: { full_name: fullName },
//             emailRedirectTo: `${window.location.origin}/dashboard`,
//           },
//         });
//         if (error) throw error;
//         toast({
//           title: "Account created!",
//           description: "You can now log in to VitalSync",
//         });
//         setIsLogin(true);
//       }
//     } catch (error: any) {
//       toast({
//         variant: "destructive",
//         title: isLogin ? "Login failed" : "Signup failed",
//         description: error.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <Card className="w-full max-w-md shadow-card">
//         <CardHeader className="space-y-4 text-center">
//           <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
//             <Activity className="w-8 h-8 text-primary-foreground" />
//           </div>
//           <div>
//             <CardTitle className="text-3xl">VitalSync</CardTitle>
//             <CardDescription className="text-base">
//               Track. Analyze. Stay Ahead of Your Health.
//             </CardDescription>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleAuth} className="space-y-4">
//             {!isLogin && (
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   type="text"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required={!isLogin}
//                   placeholder="Enter Your Name"
//                 />
//               </div>
//             )}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="you@example.com"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="••••••••"
//                 minLength={6}
//               />
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
//             </Button>
//             <p className="text-center text-sm text-muted-foreground">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-primary hover:underline font-medium"
//               >
//                 {isLogin ? "Sign up" : "Sign in"}
//               </button>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Auth;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Activity, ArrowLeft } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: "Login successful!", description: "Welcome back to VitalSync" });
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "You can now log in to VitalSync",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isLogin ? "Login failed" : "Signup failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">VitalSync</CardTitle>
            <CardDescription className="text-base">
              Track. Analyze. Stay Ahead of Your Health.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  placeholder="Enter Your Name"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
