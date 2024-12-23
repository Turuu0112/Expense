import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RecordContext } from "./utils/recordContext";
import { CategoryContext } from "./utils/CategoryContext";
import { api } from "@/lib/axios";

export const Today = ({ filterType, visibleEye }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const token = localStorage.getItem("token");
  const { renderIcon } = useContext(RecordContext);
  const { formatDate, category } = useContext(CategoryContext); // Destructure 'category' from context

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        await api.get("/iconcategories/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    getCategoriesData();
  }, [token]);

  const handleSelectAll = () => {
    if (!selectAll) {
      const allItemIds = category
        .flatMap((catGroup) =>
          catGroup.category.filter((el) =>
            filterType === "all" ? true : el.status === filterType
          )
        )
        .map((el) => el.id);

      const total = category
        .flatMap((catGroup) =>
          catGroup.category.filter((el) =>
            filterType === "all" ? true : el.status === filterType
          )
        )
        .reduce((acc, el) => {
          return el.status === "income" ? acc + +el.amount : acc - +el.amount;
        }, 0);

      setSelectedItems(allItemIds);
      setTotalAmount(total);
    } else {
      setSelectedItems([]);
      setTotalAmount(0);
    }
    setSelectAll(!selectAll);
  };

  const handleItemSelect = (id) => {
    const isSelected = selectedItems.includes(id);
    const updatedItems = isSelected
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];

    const item = category
      .flatMap((catGroup) =>
        catGroup.category.filter((el) =>
          filterType === "all" ? true : el.status === filterType
        )
      )
      .find((el) => el.id === id);

    const updatedTotal = isSelected
      ? totalAmount - (item.status === "income" ? +item.amount : -item.amount)
      : totalAmount + (item.status === "income" ? +item.amount : -item.amount);

    setSelectedItems(updatedItems);
    setTotalAmount(updatedTotal);
  };

  return (
    <div>
      <div className="bg-white my-4 rounded-xl border border-[#E5E7EB]">
        <div className="px-6 py-3 flex justify-between">
          <div className="flex gap-3">
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <p>Select All</p>
          </div>
          <div>
            <p>{totalAmount}₮</p>
          </div>
        </div>
      </div>

      {category.map((categoryGroup, index) => (
        <div key={index}>
          <p className="mb-3 font-semibold text-[16px]">{categoryGroup.text}</p>
          {categoryGroup.category
            .filter((el) =>
              filterType === "all" ? true : el.status === filterType
            )
            .map((el, idx) => {
              const formattedDate = el.date
                ? formatDate(new Date(el.date))
                : "";
              return (
                <div
                  key={el.id + idx}
                  className={`bg-white border border-[#E5E7EB] rounded-xl my-2 ${
                    visibleEye && visibleEye !== el.category
                      ? "invisible"
                      : "visible"
                  }`}
                >
                  <div className="flex justify-between mx-4 items-center">
                    <div className="flex relative items-center">
                      <input
                        type="checkbox"
                        className="w-6 h-6"
                        checked={selectedItems.includes(el.id)}
                        onChange={() => handleItemSelect(el.id)}
                      />
                      <div className="relative">{renderIcon(el.category)}</div>
                      <div>
                        <div className="mx-12 absolute top-10 left-8 text-[12px] text-[#6B7280] flex gap-2">
                          <p className=" w-[300px] flex">{formattedDate}</p>
                        </div>
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
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};
