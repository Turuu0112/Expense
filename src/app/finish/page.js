import Check from "@/assets/icon/Check";
import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const finishPage = () => {
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

          <div className="w-[100px] border-4 border-[#0166FF] relative">
            <div className="w-[24px] h-[24px] rounded-full z-10  absolute -right-3 -bottom-3 bg-[#0166FF] flex justify-center text-black   ">
              <div className="grid  gap-2 ">
                <p className="text-center text-white ">3</p>
                <p>Finish</p>
              </div>
            </div>
          </div>
        </div>
        <div className="m-auto text-center mt-[141px] grid gap-8 ">
          <div className="flex justify-center">
            <Check />
          </div>
          <p className="font-semibold  text-2xl">Good Job!</p>
          <p className="w-[300px]  text-[12px] color-[#475569] ml-8  text-center">
            Your very first account has been created. Now continue to dashboard
            and start tracking
          </p>
        </div>
        <Link href={`/dashboard`}>
          <Button className="bg-[#0166FF] hover:bg-blue-500 rounded-[8px] w-[300px] ml-12 text-white">
            Go to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default finishPage;
