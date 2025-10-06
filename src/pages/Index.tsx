import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        
        <nav className="relative z-10 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SmartAnalytics</span>
            </div>
            <Link to="/dashboard">
              <Button variant="outline">View Dashboard</Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-6xl font-bold leading-tight">
              E-commerce Analytics
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Track sales, monitor inventory, and make data-driven decisions with real-time insights for your online store.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Insights</h3>
              <p className="text-muted-foreground">
                Monitor sales, revenue, and performance metrics as they happen with live dashboards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stock Alerts</h3>
              <p className="text-muted-foreground">
                Never run out of popular items with intelligent inventory alerts and threshold monitoring.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reports</h3>
              <p className="text-muted-foreground">
                Generate comprehensive reports with visualizations to understand your business trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
