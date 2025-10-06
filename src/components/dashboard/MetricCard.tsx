import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend: "up" | "down" | "warning";
}

export const MetricCard = ({ title, value, change, icon: Icon, trend }: MetricCardProps) => {
  return (
    <Card className="border-border hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center gap-1 text-sm">
              {trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
              {trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
              <span
                className={cn(
                  "font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "warning" && "text-warning"
                )}
              >
                {change > 0 ? "+" : ""}{change}%
              </span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </div>
          <div
            className={cn(
              "p-3 rounded-full",
              trend === "up" && "bg-success/10",
              trend === "down" && "bg-destructive/10",
              trend === "warning" && "bg-warning/10"
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                trend === "warning" && "text-warning"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
