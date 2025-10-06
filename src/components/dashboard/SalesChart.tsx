import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", sales: 12400 },
  { day: "Tue", sales: 15800 },
  { day: "Wed", sales: 18200 },
  { day: "Thu", sales: 16500 },
  { day: "Fri", sales: 21000 },
  { day: "Sat", sales: 24500 },
  { day: "Sun", sales: 19800 },
];

export const SalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="day"
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
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
