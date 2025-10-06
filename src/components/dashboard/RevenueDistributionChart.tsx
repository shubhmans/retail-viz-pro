import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface RevenueDistributionData {
  category: string;
  revenue: number;
}

interface RevenueDistributionChartProps {
  data: RevenueDistributionData[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export const RevenueDistributionChart = ({ data }: RevenueDistributionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="revenue"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
