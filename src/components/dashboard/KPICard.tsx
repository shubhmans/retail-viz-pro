import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, DollarSign, ShoppingCart, Users } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: 'revenue' | 'sales' | 'users';
}

const iconMap = {
  revenue: DollarSign,
  sales: ShoppingCart,
  users: Users,
};

export function KPICard({ title, value, change, trend, icon }: KPICardProps) {
  const Icon = iconMap[icon];
  const isPositive = trend === 'up';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">from last period</span>
        </div>
      </CardContent>
    </Card>
  );
}
