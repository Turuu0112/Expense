import { CloseIcon } from "@/assets/icon/CloseIcon";
import RecordBar from "./RecordBar";

export const RecordAdd = ({ open, setOpen }) => {
  return (
    <div
      className={`  top-0  md:w-screen h-screen bg-[#00000080] fixed z-20  ${
        open ? "invisible" : "visible"
      }    flex items-center justify-center`}
    >
      <div>
        <div className="relative">
          <RecordBar />

          <div
            onClick={() => setOpen(!open)}
            className="absolute top-3 right-3 cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
