import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, Package, AlertTriangle } from "lucide-react";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { MetricCard } from "@/components/dashboard/MetricCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SmartAnalytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">E-commerce Performance Overview</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$124,592"
            change={12.5}
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Total Orders"
            value="3,842"
            change={8.2}
            icon={ShoppingCart}
            trend="up"
          />
          <MetricCard
            title="Products Sold"
            value="12,453"
            change={-3.1}
            icon={Package}
            trend="down"
          />
          <MetricCard
            title="Stock Alerts"
            value="23"
            change={15.3}
            icon={AlertTriangle}
            trend="warning"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>Last 7 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Revenue by Category</CardTitle>
              <CardDescription>Top performing categories</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryChart />
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Stock Alerts</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { product: "Smart Watch Pro", stock: 12, threshold: 50 },
                { product: "Wireless Earbuds", stock: 8, threshold: 30 },
                { product: "Laptop Stand", stock: 5, threshold: 20 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div>
                      <p className="font-medium">{item.product}</p>
                      <p className="text-sm text-muted-foreground">
                        Current stock: {item.stock} units (threshold: {item.threshold})
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-warning">Low Stock</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
