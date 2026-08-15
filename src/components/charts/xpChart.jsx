import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  total: {
    label: "XP",
    color: "#726df5",
  },
}

export default function XPChart({ history }) {
  let running = 0
  const monthlyTotals = {}
  history.forEach((h) => {
    running += h.amount
    const monthKey = new Date(h.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })

    monthlyTotals[monthKey] = { date: monthKey, total: running }
  })

  const chartData = Object.values(monthlyTotals)

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle>XP Progress</CardTitle>
        <CardDescription>XP over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="chart-scroll"
          style={{ overflowX: "auto", overflowY: "hidden", height: "200px" }}
        >
          <ChartContainer
            config={chartConfig}
            style={{ height: "200px", width: `${Math.max(chartData.length * 80, 400)}px` }}
          >
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#c966ed" />
                  <stop offset="100%" stopColor="#cd5ce7" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="rgba(255,255,255,0.6)"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="rgba(255,255,255,0.6)"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}KB`}
              />
              <ChartTooltip
                cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${(value / 1000).toFixed(1)} kB`, " Total XP"]}
                  />
                }
              />
              <Line
                dataKey="total"
                type="monotone"
                stroke="url(#lineGradient)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#c966ed", stroke: "#fff", strokeWidth: 1 }}
                filter="url(#glow)"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Total XP earned <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}