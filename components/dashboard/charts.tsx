"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BOOKINGS_OVER_TIME,
  OCCUPANCY,
  REVENUE,
  REVENUE_AXIS_MAX,
} from "@/lib/dashboard-data";

const AXIS = {
  tick: { fill: "var(--color-label)", fontSize: 12 },
  axisLine: false as const,
  tickLine: false as const,
};

const money = (value: number) => (value === 0 ? "0" : `${value / 1000}k`);

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid var(--color-line)",
  boxShadow: "0 8px 24px -12px rgba(16,24,40,0.3)",
  fontSize: 13,
};

/** Grouped online/offline revenue bars — used on Dashboard, Earnings and Insights. */
export function RevenueBars({ height = 260 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={REVENUE} margin={{ top: 8, right: 8, bottom: 0, left: -18 }} barGap={4}>
        <CartesianGrid stroke="var(--color-line)" vertical={false} />
        <XAxis dataKey="month" {...AXIS} />
        <YAxis
          {...AXIS}
          domain={[0, REVENUE_AXIS_MAX]}
          ticks={[0, 5000, 10000, 15000, 20000, 25000]}
          tickFormatter={money}
        />
        <Tooltip
          cursor={{ fill: "var(--color-sky-tint)" }}
          contentStyle={tooltipStyle}
          formatter={(value) => `$${Number(value).toLocaleString()}`}
        />
        <Legend
          verticalAlign="bottom"
          height={34}
          iconType="circle"
          iconSize={9}
          formatter={(value) => (
            <span style={{ color: "var(--color-body)", fontSize: 13 }}>{value}</span>
          )}
        />
        <Bar dataKey="online" name="Online Sales" fill="var(--color-series-online)" radius={[3, 3, 0, 0]} maxBarSize={14} />
        <Bar dataKey="offline" name="Offline Sales" fill="var(--color-series-offline)" radius={[3, 3, 0, 0]} maxBarSize={14} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Two smoothed series with a soft wash beneath — "Bookings Over Time". */
export function BookingsArea({ height = 260 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={BOOKINGS_OVER_TIME}
        margin={{ top: 8, right: 12, bottom: 0, left: -18 }}
      >
        <defs>
          <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b5bd6" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#5b5bd6" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b9df8" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#8b9df8" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--color-line)" vertical={false} />
        <XAxis dataKey="month" {...AXIS} />
        <YAxis {...AXIS} domain={[0, 250]} ticks={[0, 50, 100, 150, 200, 250]} />
        <Tooltip cursor={{ stroke: "var(--color-line)" }} contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="bookings"
          name="Bookings"
          stroke="#5b5bd6"
          strokeWidth={2}
          fill="url(#bookingsFill)"
        />
        <Area
          type="monotone"
          dataKey="views"
          name="Views"
          stroke="#8b9df8"
          strokeWidth={2}
          fill="url(#viewsFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Occupancy gauge: a three-quarter donut with the rate in the middle. */
export function OccupancyGauge({ height = 260 }: { height?: number }) {
  const data = [
    { name: "Occupied Days", value: OCCUPANCY.occupied, fill: "#5b3fd6" },
    { name: "Vacant Days", value: OCCUPANCY.vacant, fill: "#ddd6fe" },
  ];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={230}
            endAngle={-50}
            innerRadius="66%"
            outerRadius="92%"
            paddingAngle={1}
            cornerRadius={8}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${Number(value)}%`} />
          <Legend
            verticalAlign="bottom"
            height={30}
            iconType="circle"
            iconSize={9}
            formatter={(value) => (
              <span style={{ color: "var(--color-body)", fontSize: 13 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      <span
        className="pointer-events-none absolute inset-x-0 flex justify-center text-h3 font-bold text-ink"
        style={{ top: height * 0.42 }}
      >
        {OCCUPANCY.occupied}%
      </span>
    </div>
  );
}
