import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { RevenueDistributionChart } from '@/components/dashboard/RevenueDistributionChart';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { supabase } from '@/lib/supabase';
import { SalesData } from '@/types';

export default function DashboardHome() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [category, setCategory] = useState<string>('all');
  const [region, setRegion] = useState<string>('all');
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, [dateRange, category, region]);

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      let query = supabase.from('sales_data').select('*');

      if (dateRange?.from) {
        query = query.gte('date', dateRange.from.toISOString().split('T')[0]);
      }
      if (dateRange?.to) {
        query = query.lte('date', dateRange.to.toISOString().split('T')[0]);
      }
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      if (region !== 'all') {
        query = query.eq('region', region);
      }

      const { data, error } = await query.order('date', { ascending: true });

      if (error) throw error;
      setSalesData(data || []);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = salesData.reduce((sum, item) => sum + Number(item.revenue), 0);
  const totalSales = salesData.reduce((sum, item) => sum + item.units_sold, 0);
  const activeUsers = 1247;

  const chartData = salesData.reduce((acc, item) => {
    const existing = acc.find((d) => d.date === item.date);
    if (existing) {
      existing.revenue += Number(item.revenue);
    } else {
      acc.push({ date: item.date, revenue: Number(item.revenue) });
    }
    return acc;
  }, [] as { date: string; revenue: number }[]);

  const categoryData = salesData.reduce((acc, item) => {
    const existing = acc.find((d) => d.category === item.category);
    if (existing) {
      existing.revenue += Number(item.revenue);
    } else {
      acc.push({ category: item.category, revenue: Number(item.revenue) });
    }
    return acc;
  }, [] as { category: string; revenue: number }[]);

  const categories = Array.from(new Set(salesData.map((item) => item.category)));
  const regions = Array.from(new Set(salesData.map((item) => item.region)));

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <DashboardFilters
        dateRange={dateRange}
        category={category}
        region={region}
        onDateRangeChange={setDateRange}
        onCategoryChange={setCategory}
        onRegionChange={setRegion}
        categories={categories}
        regions={regions}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          icon="revenue"
        />
        <KPICard
          title="Total Sales"
          value={totalSales.toLocaleString()}
          change={8.2}
          trend="up"
          icon="sales"
        />
        <KPICard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          change={3.1}
          trend="down"
          icon="users"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
            <CardDescription>Revenue trends for the selected period</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">Loading...</div>
            ) : (
              <SalesChart data={chartData} />
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Revenue breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">Loading...</div>
            ) : (
              <RevenueDistributionChart data={categoryData} />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Revenue by product category</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">Loading...</div>
            ) : (
              <CategoryChart data={categoryData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
