import { useContext, useEffect, useState } from "react";
import { RecordContext } from "./utils/recordContext";
import { CategoryContext } from "./utils/CategoryContext";
import { api } from "@/lib/axios";
import { Checkbox } from "./ui/checkbox";

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

  // Function to calculate the total amount and selected items
  const calculateTotals = (newSelectedItems = selectedItems) => {
    const selectedItemsData = category
      .flatMap((catGroup) =>
        catGroup.category.filter(
          (el) =>
            (filterType === "all" || el.status === filterType) &&
            newSelectedItems.includes(el.id)
        )
      );
    
    const total = selectedItemsData.reduce((acc, el) => {
      return el.status === "income" ? acc + +el.amount : acc - +el.amount;
    }, 0);
    
    setTotalAmount(total);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      const allItemIds = category
        .flatMap((catGroup) =>
          catGroup.category.filter((el) =>
            filterType === "all" ? true : el.status === filterType
          )
        )
        .map((el) => el.id);

      setSelectedItems(allItemIds);
      calculateTotals(allItemIds); // Recalculate totals with all selected items
    } else {
      setSelectedItems([]);
      setTotalAmount(0);
    }
    setSelectAll(!selectAll);
  };

  const handleItemSelect = (id) => {
    const updatedItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    
    setSelectedItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals when item is selected or deselected
  };

  useEffect(() => {
    // Update totals when `selectedItems` changes
    calculateTotals();
  }, [selectedItems, filterType, category]);

  return (
    <div className="bg-gray-50 px-4 py-6 rounded-lg shadow-lg">
      <div className="bg-white my-4 rounded-xl border border-[#E5E7EB] p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Checkbox 
              id="selectAll"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-6 h-6 text-primary"
            />
            <span className="text-lg font-semibold text-gray-800">Select All</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">{totalAmount}₮</span>
          </div>
        </div>
      </div>

      {/* Render categories */}
      {category.map((categoryGroup, index) => (
        <div key={index} className="mb-6">
          <p className="mb-3 text-xl font-semibold text-gray-800">{categoryGroup.text}</p>
          {categoryGroup.category
            .filter((el) => (filterType === "all" ? true : el.status === filterType))
            .map((el) => {
              const formattedDate = el.date ? formatDate(new Date(el.date)) : "";
              const isItemSelected = selectedItems.includes(el.id);

              return (
                <div
                  key={el.id}
                  className={`bg-white border border-[#E5E7EB] rounded-xl my-3 p-4 ${
                    visibleEye && visibleEye !== el.category ? "invisible" : "visible"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <input
                      type="checkbox"
                        id={el.id}
                        checked={isItemSelected}
                        onChange={() => handleItemSelect(el.id)}
                        className="w-5 h-5 text-primary"
                      />
                      <div className="relative">{renderIcon(el.category)}</div>
                      <div>
                        <div className="relative top-1 right-4 text-xs text-gray-500">{formattedDate}</div>
                      </div>
                    </div>
                    <div className={el.status === "income" ? "text-green-500" : "text-red-500"}>
                      <p className="font-semibold">
                        {el.status === "income" ? `+ ${el.amount}` : `- ${el.amount}`}₮
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
