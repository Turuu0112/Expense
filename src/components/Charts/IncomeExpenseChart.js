"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useContext, useState } from "react";
import { CategoryContext } from "../utils/CategoryContext";
import "./IncomeExpenseChart.css"; // Import your CSS file

export const IncomeExpenseChart = () => {
  const { categories } = useContext(CategoryContext);

  // State for hover effect
  const [hoveredBar, setHoveredBar] = useState(null);

  // Aggregate data based on month and status
  const aggregateData = categories.reduce((acc, data) => {
    const month = new Date(data.date).toLocaleString("default", {
      month: "short",
    });

    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }

    if (data.status === "income") {
      acc[month].income += parseFloat(data.amount);
    } else if (data.status === "expense") {
      acc[month].expense += parseFloat(data.amount);
    }

    return acc;
  }, {});

  // Convert aggregated data to array format
  const chartData = Object.values(aggregateData).map((data) => ({
    month: data.month,
    Income: data.income,
    Expense: data.expense,
  }));

  const chartConfig = {
    income: {
      label: "Income",
      color: "#22C55E",
    },
    expense: {
      label: "Expense",
      color: "#EF4444",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full py-8">
      <BarChart
        data={chartData}
        width={40} // Set the total width of the chart to 200px
        height={240} // Adjust the height as necessary
        className="chart-container"
      >
        <CartesianGrid vertical={false} className="chart-grid" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          className="chart-xaxis"
        />
        <YAxis className="chart-yaxis" />
        <Tooltip className="chart-tooltip" />
        <Legend className="chart-legend" />
        <Bar
          dataKey="Income"
          name={chartConfig.income.label}
          fill={hoveredBar === "Income" ? "#FFFFFF" : chartConfig.income.color} // Change fill color on hover
          radius={[28, 28, 0, 0]}
          className="chart-bar"
          onMouseEnter={() => setHoveredBar("Income")}
          onMouseLeave={() => setHoveredBar(null)}
          barSize={100} // Adjust the bar width as needed
        />
        <Bar
          dataKey="Expense"
          name={chartConfig.expense.label}
          fill={
            hoveredBar === "Expense" ? "#FFFFFF" : chartConfig.expense.color
          } // Change fill color on hover
          radius={[28, 28, 0, 0]}
          className="chart-bar"
          onMouseEnter={() => setHoveredBar("Expense")}
          onMouseLeave={() => setHoveredBar(null)}
          barSize={100} // Adjust the bar width as needed
        />
      </BarChart>
    </ChartContainer>
  );
};
