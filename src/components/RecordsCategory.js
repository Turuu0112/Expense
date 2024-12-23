import { CloseIcon } from "@/assets/icon/CloseIcon";
import AddCategory from "./AddCategory";

const RecordsCategory = ({ setOpenAdd, openAdd }) => {
  return (
    <div
      className={`  top-0  w-screen h-screen bg-[#00000080] fixed  left-0 z-20 ${
        openAdd ? "invisible" : "visible"
      }   flex items-center justify-center  `}
    >
      <div className="relative">
        <AddCategory openAdd={openAdd} setOpenAdd={setOpenAdd} />
        <div
          onClick={() => setOpenAdd(!openAdd)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};
export default RecordsCategory;
