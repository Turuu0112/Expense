import { HeaderLogo } from "@/assets/icon/HeaderLogo";

const LoadingPage = () => {
  return (
    <div className="w-screen py-[400px] h-fit grid gap-3">
      <div className="flex gap-2 font-semibold text-[18px] justify-center  w-[1440px] m-auto">
        <div>
          <HeaderLogo />
        </div>
        <p className="text-2xl">Geld</p>
      </div>
      <div className="grid h-fit gap-4">
        <div className="w-8 h-8 m-auto rounded-full relative border-t-4 border-t-blue-500 border-4 border-[#D1D5DB] animate-spin"></div>
        <p className="text-center font-semibold m-auto">Түр хүлээнэ үү...</p>
      </div>
    </div>
  );
};
export default LoadingPage;
