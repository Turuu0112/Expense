"use client";

import { useState, useEffect, useContext } from "react";
import { ChevronRight } from "@/assets/icon/ChevronRight";
import { PlusIcon } from "@/assets/icon/PlusIcon";
import { PlusIconBlue } from "@/assets/icon/PlusIconBlue";
import { Header } from "@/components/Header";
import RecordsCategory from "@/components/RecordsCategory";
import { Today } from "@/components/Today";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RecordAdd } from "@/components/RecordAdd";
import { RecordContext } from "@/components/utils/recordContext";
import { CategoryContext } from "@/components/utils/CategoryContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Records = () => {
  const [open, setOpen] = useState(true);
  const [openAdd, setOpenAdd] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [visibleEye, setVisibleEye] = useState(null);
  const { records, setRecords, getData } = useContext(RecordContext);
  const { setCategories, categories } = useContext(CategoryContext);
  const [minAmount, setMinAmount] = useState(0); // Initialize with a default value (0 in this case)
  const [maxAmount, setMaxAmount] = useState(10000); // Initialize maxAmount similarly

  return (
    <div className="md:w-screen bg-[#F3F4F6] ">
      <Header />
      <div className="md:flex md:w-[1440px] md:m-auto py-12 ">
        <div className="py-6 px-4 flex-none grid h-fit gap-6 bg-white border border-[#E5E7EB] rounded-xl ">
          <div className="h-fit grid gap-6 ">
            <h1 className="text-2xl font-semibold ">Records</h1>
            <div onClick={() => setOpen(!open)}>
              <Button className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-blue-400 px-28 ">
                <PlusIcon /> Add
              </Button>
            </div>
          </div>
          <div className="text-[#A3A3A3] w-fit h-fit py-1 border rounded-xl bg-[#F3F4F6] md:visible max-md:hidden">
            <input
              className="mx-12 bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
              type="search"
              placeholder="Search"
            />
          </div>
          <div className="h-fit grid ">
            <div>
              <h1 className="text-[16px] font-semibold py-4">Types</h1>
            </div>
            <div className="px-4">
              <RadioGroup
                defaultValue="all h-fit grid gap-6 "
                value={filterType}
                onValueChange={(value) => setFilterType(value)}
              >
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="all" id="all" />
                  <label htmlFor="all" className="leading-6">
                    All
                  </label>
                </div>
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="income" id="income" />
                  <label htmlFor="income" className="leading-6">
                    Income
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <label htmlFor="expense" className="leading-6">
                    Expense
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-4 ">
              <p className="text-[16px] font-semibold ">Category</p>
              <p
                className="opacity-20 cursor-pointer"
                onClick={() => setVisibleEye(null)}
              >
                Clear
              </p>
            </div>
            <div className="px-1">
              <div className="gap-2 mx-1 grid h-fit overflow-scroll">
                <ul>
                  {records.map((record, index) => (
                    <div
                      key={record.title + index}
                      className="flex justify-between items-baseline align-baseline h-fit"
                      onClick={() => setVisibleEye(record.id)}
                    >
                      <div className="flex gap-2 ">
                        <div className="cursor-pointer">
                          {visibleEye === record.id ? (
                            <IoMdEye size={24} />
                          ) : (
                            <IoEyeOff size={24} />
                          )}
                        </div>
                        <p>{record.title}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-none"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ul>
              </div>
              <div
                className="flex cursor-pointer"
                onClick={() => setOpenAdd(!openAdd)}
              >
                <PlusIconBlue />
                <p>Add Category</p>
              </div>
            </div>
          </div>
          <div className="h-fit grid gap-4 md:visible max-md:hidden">
            <p className="text-[16px] font-semibold">Amount range</p>
            <div className="h-fit grid gap-6">
              <div className="flex w-[280px] gap-4">
                <div className="flex-1">
                  <Input
                    className="rounded-[8px]"
                    type="number"
                    value={minAmount}
                    onChange={(e) => setMinAmount(Number(e.target.value))}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    className="rounded-[8px] text-black"
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Slider
                  defaultValue={[minAmount, maxAmount]}
                  min={0}
                  max={1000}
                  step={1}
                  className="bg-[#0166FF] border-[#0166FF]"
                  onValueChange={([min, max]) => {
                    setMinAmount(min);
                    setMaxAmount(max);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-12 flex-1 ">
          <div className="flex items-baseline justify-between md:visible max-md:hidden">
            <div className="flex gap-3 my-2 mx-12">
              <Carousel>
                <CarouselContent className="w-[115px]">
                  <CarouselItem className="w-fit">Last 10 Days</CarouselItem>
                  <CarouselItem>Last 20 Days</CarouselItem>
                  <CarouselItem>Last 30 Days</CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="bg-[#E5E7EB] rounded-[8px] w-8 h-8" />
                <CarouselNext className="bg-[#E5E7EB] rounded-[8px] w-8 h-8 border border-black" />
              </Carousel>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px] bg-white rounded-xl border border-[#D1D5DB]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#E5E7EB] rounded-[8px]">
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="latest">Latest first</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Today filterType={filterType} visibleEye={visibleEye} />
          </div>
        </div>
      </div>
      <RecordsCategory openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <RecordAdd open={open} setOpen={setOpen} setCategories={setCategories} />
    </div>
  );
};

export default Records;
