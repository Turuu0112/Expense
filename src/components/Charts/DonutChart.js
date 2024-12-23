"use client";
import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext } from "react";
import { CategoryContext } from "../utils/CategoryContext";

export function DonutChart() {
  const { categories } = useContext(CategoryContext);

  // Create chart data based on categories
  const chartData = React.useMemo(() => {
    const income = categories
      .filter((category) => category.status === "income")
      .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0); // parseFloat added
    const expense = categories
      .filter((category) => category.status === "expense")
      .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0); // parseFloat added

    console.log("Income:", income, "Expense:", expense); // Log calculated values
    return [
      { type: "Income", amount: income, fill: "#4CAF50" },
      { type: "Expense", amount: expense, fill: "#F44336" },
    ];
  }, [categories]);

  const totalAmount = chartData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0"></CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            income: { label: "Income", color: "#4CAF50" },
            expense: { label: "Expense", color: "#F44336" },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              outerRadius={80} // Add outer radius for a donut chart effect
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-lg font-bold"
                      ></text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
