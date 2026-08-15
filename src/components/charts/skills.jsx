import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
    value: {
        label: "Skill Level",
        color: "#c966ed",
    },
}

export default function Skills({ skills }) {
  const chartData = skills ?? []

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle>Skills achieved</CardTitle>
        <CardDescription>Skills achieved in each area</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] w-full"
        >
          <RadarChart data={chartData} outerRadius="80%">
            <defs>
              <linearGradient id="skillsGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="30%" stopColor="#714cf5" />
                <stop offset="60%" stopColor="#cd5ce7" />
                <stop offset="90%" stopColor="#c966ed" />
              </linearGradient>
            </defs>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="skill" tick={{ fill: "#c9aab0", fontSize: 12 }} />
            <PolarGrid stroke="rgba(255,255,255,0.14)" />
            <Radar
              dataKey="value"
              stroke="#cd5ce7"
              fill="url(#skillsGradient)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fill: "#fbbaee",
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}