import { useState } from "react"
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  value: { label: "Projects" },
}

export default function PassFail({ passed, failed }) {
  const [view, setView] = useState("pass")

  const total = (passed ?? 0) + (failed ?? 0)
  const current = view === "pass" ? passed ?? 0 : failed ?? 0
  const fillPercent = total > 0 ? (current / total) * 100 : 0
  const fillUrl = view === "pass" ? "url(#passGradient)" : "url(#failGradient)"
  const labelColor = view === "pass" ? "#a78bfa" : "#f898c3"

  const chartData = [{ name: view, value: fillPercent, fill: fillUrl }]

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pass / Fail</CardTitle>
        <CardDescription>
          <span style={{ color: "#714cf5", fontSize : 20 }}>Pass</span> vs{" "}
          <span style={{ color: "#f898c3",fontSize : 20 }}>fail</span> projects
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setView("pass")}
            style={{
              backgroundColor: view === "pass" ? "#714cf5" : "transparent",
              border: "1px solid #714cf5",
              color: view === "pass" ? "#fff" : "#714cf5",
            }}
            className="px-4 py-1 rounded-full text-sm font-medium transition-colors"
          >
            Pass
          </button>
          <button
            onClick={() => setView("fail")}
            style={{
              backgroundColor: view === "fail" ? "#f898c3" : "transparent",
              border: "1px solid #fbbaee",
              color: view === "fail" ? "#fff" : "#fbbaee",
            }}
            className="px-4 py-1 rounded-full text-sm font-medium transition-colors"
          >
            Fail
          </button>
        </div>

        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={65}
            outerRadius={85}
          >
            <defs>
              <linearGradient id="passGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="30%" stopColor="#714cf5" />
                <stop offset="60%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#c966ed" />
              </linearGradient>
              <linearGradient id="failGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="30%" stopColor="#db6399" />
                <stop offset="60%" stopColor="#d885af" />
                <stop offset="100%" stopColor="#fbbaee" />
              </linearGradient>
              <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
              axisLine={false}
            />
            <PolarGrid gridType="circle" radialLines={false} stroke="none" polarRadius={[90, 80]} />
            <RadialBar
              dataKey="value"
              background
              cornerRadius={10}
              fill={fillUrl}
              filter="url(#ringGlow)"
            />
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} fill={labelColor} className="text-4xl font-bold">
                        {current}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-2xl">
                        {view === "pass" ? "Passed" : "Failed"}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}