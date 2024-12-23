import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { MoneyIcon } from "@/assets/icon/MoneyIcon";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
const currency = () => {
  return (
    <div className="w-screen">
      <div className="grid   w-[1440px] justify-center m-auto mt-[40px] mb-[400px] gap-12">
        <div className="flex m-auto gap-2">
          <HeaderLogo />
          <p className="font-semibold text-xl ">Geld</p>
        </div>
        <div className="flex  relative justify-center  ">
          <div className="w-[100px] border-4 border-[#E5E7EB] relative ">
            <div className="w-[24px] h-[24px] rounded-full z-10 absolute -bottom-3 right-20 bg-[#0166FF] flex justify-center text-white   ">
              <div className="grid  gap-2">
                <p className="text-center ">1</p>
                <p className="text-black">Currency</p>
              </div>
            </div>
            <div className="w-[24px] h-[24px] rounded-full z-10  bg-[#E5E7EB] flex justify-center text-black absolute  -bottom-3 -right-5   ">
              <div className="grid  gap-2">
                <p className="text-center ">2</p>
                <p>Balance</p>
              </div>
            </div>
          </div>

          <div className="w-[100px] border-4 border-[#E5E7EB] relative">
            <div className="w-[24px] h-[24px] rounded-full z-10  absolute -right-3 -bottom-3 bg-[#E5E7EB] flex justify-center text-black   ">
              <div className="grid  gap-2">
                <p className="text-center ">3</p>
                <p>Finish</p>
              </div>
            </div>
          </div>
        </div>
        <div className="m-auto text-center mt-[141px] grid gap-8 ">
          <div className="flex justify-center">
            <MoneyIcon />
          </div>
          <p className="font-semibold  text-2xl">Select base currency</p>
        </div>
        <div className="grid justify-center">
          <Select>
            <SelectTrigger className="w-[280px] border border-[#D1D5DB] rounded-[8px] m-auto">
              <SelectValue placeholder="Choose wallet" />
            </SelectTrigger>
            <SelectContent className="border border-[#D1D5DB] rounded-[8px] bg-white">
              <SelectItem value="light">MNT - Mongolian Tugrik</SelectItem>
              <SelectItem value="dark">USD - American Dollar</SelectItem>
              <SelectItem value="system">EURO - Europe Dollar</SelectItem>
            </SelectContent>
          </Select>
          <p className="w-[400px]  text-[12px] color-[#475569] ml-12 mt-4 ">
            Your base currency should be the one you use most often. All
            transaction in other currencies will be calculated based on this one
          </p>
        </div>
        <Link href={`/balance`}>
          <Button className="bg-[#0166FF] hover:bg-blue-500 rounded-[8px] w-[300px] ml-20 text-white">
            Confirm
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default currency;
