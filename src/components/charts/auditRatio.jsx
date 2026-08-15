import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { LabelList } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  done: {
    label: "Done",
    color: "#714cf5",
  },
  received: {
    label: "Received",
    color: "#c966ed",
  },
}

export default function AuditRatio({ auditsDone, auditsReceived }) {
  const done = auditsDone ?? 0;
  const received = auditsReceived ?? 0;
  const ratio = done > 0 ? (done / received).toFixed(2) : "0.00";

  const formatKB = (value) => `${Math.round(value / 1000)} kB`;

  const chartData = [
    {
      category: "Audits",
      done: auditsDone ?? 0,
      received: auditsReceived ?? 0,
    },
  ]

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle>Audit Ratio</CardTitle>
        <CardDescription>
          <span style={{ color: "#714cf5", fontSize: 20 }}>Done</span> vs{" "}
          <span style={{ color: "#c966ed", fontSize: 20 }}>received</span> audits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">          <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={() => ratio}
            tick={{ fill: "#fcb5d9", fontSize: 20, fontWeight: 600 }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="done" fill="#714cf5" radius={4} barSize={70}>
            <LabelList
              dataKey="done"
              position="top"
              fill="#714cf5"
              fontSize={18}
              formatter={formatKB}
            />
          </Bar>
          <Bar dataKey="received" fill="#c966ed" radius={4} barSize={70}>
            <LabelList
              dataKey="received"
              position="top"
              fill="#c966ed"
              fontSize={18}
              formatter={formatKB}
            />
          </Bar>
        </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}