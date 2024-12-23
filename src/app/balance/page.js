import Coin from "@/assets/icon/Coin";
import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const balancePage = () => {
  return (
    <div className="w-screen">
      <div className="grid   w-[1440px] justify-center m-auto mt-[40px] mb-[400px] gap-12">
        <div className="flex m-auto gap-2">
          <HeaderLogo />
          <p className="font-semibold text-xl ">Geld</p>
        </div>
        <div className="flex  relative justify-center  ">
          <div className="w-[100px] border-4 border-[#0166FF] relative ">
            <div className="w-[24px] h-[24px] rounded-full z-10 absolute -bottom-3 right-20 bg-[#0166FF] flex justify-center text-white   ">
              <div className="grid  gap-2">
                <p className="text-center ">1</p>
                <p className="text-black">Currency</p>
              </div>
            </div>
            <div className="w-[24px] h-[24px] rounded-full z-10  bg-[#0166FF] flex justify-center text-black absolute  -bottom-3 -right-5   ">
              <div className="grid  gap-2">
                <p className="text-center text-white ">2</p>
                <p className="">Balance</p>
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
            <Coin />
          </div>
          <p className="font-semibold  text-2xl">Set up your cash Balance</p>
        </div>
        <div className="grid justify-center">
          <input
            type="email"
            className="border border-[#D1D5DB] rounded-[8px] outline-none py-2 px-4 w-[300px] m-auto"
            placeholder="email"
          />
          <p className="w-[400px]  text-[12px] color-[#475569] ml-28 mt-4">
            How much cash do you have in your wallet?
          </p>
        </div>
        <Link href={`/finish`}>
          <Button className="bg-[#0166FF] hover:bg-blue-500 rounded-[8px] w-[300px] ml-28 text-white">
            Confirm
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default balancePage;
