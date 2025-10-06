import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { category: "Electronics", revenue: 45200 },
  { category: "Fashion", revenue: 38400 },
  { category: "Home", revenue: 25100 },
  { category: "Sports", revenue: 15900 },
];

export const CategoryChart = () => {
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
