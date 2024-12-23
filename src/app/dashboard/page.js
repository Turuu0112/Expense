"use client";

import { GeldIcon } from "@/assets/icon/GeldIcon";
import { Shape } from "@/assets/icon/Shape";
import { ShapeLogo } from "@/assets/icon/ShapeLogo";
import { DonutChart } from "@/components/Charts/DonutChart";
import { Header } from "@/components/Header";
import { IncomeExpenseChart } from "@/components/Charts/IncomeExpenseChart";
import { useContext } from "react";
import { CategoryContext } from "@/components/utils/CategoryContext";
import { RecordContext } from "@/components/utils/recordContext";

const dashboard = () => {
  const { categories } = useContext(CategoryContext);
  const { renderIcon, formattedDate } = useContext(RecordContext);

  const totalIncome = categories
    .filter((el) => el.status === "income")
    .reduce((acc, el) => acc + Number(el.amount), 0); // Number() ашиглаж хөрвүүлнэ

  const totalExpense = categories
    .filter((el) => el.status === "expense")
    .reduce((acc, el) => acc + Number(el.amount), 0); // Number() ашиглаж хөрвүүлнэ

  // Нийт дүн (зарлагаас орлогыг хасаж байна)
  const totalAmount = totalIncome - totalExpense;

  // Тоог гоё форматтай харуулах (₮ тэмдэгт нэмэх)
  const formattedTotalIncome = `${totalIncome.toLocaleString()}₮`;
  const formattedTotalExpense = `${totalExpense.toLocaleString()}₮`;
  const formattedTotalAmount = `${totalAmount.toLocaleString()}₮`;

  const last5Categories = categories
    .slice(-5)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <Header />
      <div className="md:w-screen md:h-fit h-fit bg-[#F3F4F6]">
        <div className="md:w-[1440px] md:m-auto md:py-12">
          <div className="flex gap-4">
            <div className="flex-1 h-[220px] bg-[#0166FF] relative rounded-[18px] md:visible max-md:hidden">
              <div className="absolute right-0 bottom-0">
                <Shape />
              </div>
              <div className="absolute right-[32px] bottom-[32px]">
                <ShapeLogo />
              </div>
              <div>
                <div className="flex font-semibold text-[18px] text-white align-baseline absolute items-center gap-5 top-6 left-6">
                  <GeldIcon /> <p>Geld</p>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-[16px] opacity-50 text-white">Cash</p>
                  <p className="text-2xl font-semibold text-white">
                    {formattedTotalAmount}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 h-[220px] bg-white rounded-xl md:visible max-md:hidden">
              <div className="flex items-baseline gap-2 py-4 px-6 border-b-[1px] border-[#E2E8F0]">
                <div className="w-[8px] h-[8px] bg-[#84CC16] rounded-xl"></div>
                <p className="font-semibold">Total Income</p>
              </div>
              <div className="p-6 grid h-fit gap-4">
                <div>
                  <div className="flex">
                    <p className="text-[36px] font-semibold">
                      {formattedTotalIncome}
                    </p>
                  </div>
                  <p>Your Income Amount</p>
                </div>
              </div>
            </div>
            <div className="flex-1 h-[220px] bg-white rounded-xl md:visible max-md:hidden">
              <div className="flex items-baseline gap-2 py-4 px-6 border-b-[1px] border-[#E2E8F0]">
                <div className="w-[8px] h-[8px] bg-[#F54949] rounded-xl"></div>
                <p className="font-semibold">Total Expense</p>
              </div>
              <div className="p-6 grid h-fit gap-4">
                <div>
                  <div className="flex">
                    <p className="text-[36px] font-semibold">
                      - {formattedTotalExpense}
                    </p>
                  </div>
                  <p>Your Expense Amount</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 my-8">
            <div className="flex-1 border bg-white rounded-xl">
              <p className="text-[16px] font-semibold px-6 py-4 border-b-[1px] border-[#E2E8F0]">
                Income - Expense
              </p>
              <div className="flex px-6">
                <IncomeExpenseChart />
              </div>
            </div>
            <div className="flex-1 bg-white rounded-xl md:visible max-md:hidden">
              <p className="text-[16px] font-semibold px-6 py-4 border-b-[1px] border-[#E2E8F0]">
                Income - Expense
              </p>
              <div>
                <DonutChart />
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[8px]">
            <div className="border-b-[1px] px-6 py-4">
              <p className="text-[#0F172A] text-lg font-semibold">
                Last Records
              </p>
            </div>
            <div>
              {last5Categories.map((el) => (
                <div
                  key={el.id}
                  className="flex justify-between mx-4 items-center border-b-2"
                >
                  <div className="flex relative items-center">
                    <div className="relative">{renderIcon(el.category)}</div>
                    <div className="mx-6 absolute top-10 left-8 text-[12px] text-[#6B7280] flex gap-2">
                      <p className="w-fit flex">{el.time}</p>
                    </div>
                  </div>
                  <div
                    className={`${
                      el.status === "income"
                        ? "text-[#23E01F]"
                        : "text-[#F54949]"
                    }`}
                  >
                    <p>
                      {el.status === "income"
                        ? `+ ${el.amount}`
                        : `- ${el.amount}`}
                      ₮
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default dashboard;
