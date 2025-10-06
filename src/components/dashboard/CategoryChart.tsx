import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CategoryData {
  category: string;
  revenue: number;
}

interface CategoryChartProps {
  data: CategoryData[];
}

export const CategoryChart = ({ data }: CategoryChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="category"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
        />
        <Bar dataKey="revenue" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
