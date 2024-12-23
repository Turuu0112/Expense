"use client";

import { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useFormik } from "formik";
import classNames from "classnames";
import { FaCircle } from "react-icons/fa";
import * as Icons from "react-icons/pi";
import { RecordContext } from "./utils/recordContext";
import { api } from "@/lib/axios";

const AddCategory = ({ setOpenAdd, userId }) => {
  const { records, setRecords, getData, hardDataIcons, colors } =
    useContext(RecordContext);
  const [iconColor, setIconColor] = useState("");

  const formik = useFormik({
    initialValues: {
      icon: "",
      title: "",
    },
    onSubmit: async (values) => {
      const newRecord = {
        ...values,
        iconColor,
        userId,
      };
      
      try {
        const response = await api.post("/records", newRecord, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setOpenAdd(true);
        getData();
        setRecords([...records, response.data]);
      } catch (error) {
        console.error(error);
      }
    },
    validate: (values) => {
      let errors = {};

      if (!values.icon) {
        errors.icon = "Icon сонгоно уу!";
      }
      if (!values.title) {
        errors.title = "Нэр бичнэ үү!";
      }
      return errors;
    },
  });

  const handleColorClick = (color) => {
    setIconColor(color);
  };

  return (
    <div className="bg-[#FFFFFF] md:w-[450px] h-fit m-auto rounded-xl">
      <p className="py-5 px-6 border-b-[1px] border-[#D1D5DB]">Add Category</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="gap-[32px] px-6 py-5 h-fit grid">
          <div className="flex gap-2">
            <div className="flex-1">
              <Select
                onValueChange={(value) => formik.setFieldValue("icon", value)}
              >
                <SelectTrigger className="border border-[#D1D5DB] rounded-[8px]">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#D1D5DB] rounded-[8px] grid grid-cols-3">
                  <div className="h-fit">
                    <div className="grid grid-cols-6 p-4">
                      {hardDataIcons.map((el, index) => {
                        const IconComponent = Icons[el.iconName];
                        return (
                          <SelectItem key={index} value={el.iconName}>
                            <IconComponent
                              color={iconColor}
                              className={classNames("cursor-pointer w-6 h-6")}
                            />
                          </SelectItem>
                        );
                      })}
                    </div>
                    <div className="border-t-[1px] border-[#D1D5DB]">
                      <div className="flex gap-4 mx-16 my-4">
                        {colors.map((color, index) => (
                          <FaCircle
                            key={index}
                            color={color}
                            className="w-6 h-6 rounded-full cursor-pointer"
                            onClick={() => handleColorClick(color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </SelectContent>
              </Select>

              {formik.errors.icon ? (
                <p className="text-red-500">{formik.errors.icon}</p>
              ) : null}
            </div>

            <div className="w-full">
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Name"
                className="outline-none py-2 border border-[#D1D5DB] rounded-[8px] px-4 w-full"
              />
              {formik.errors.title ? (
                <p className="text-red-500">{formik.errors.title}</p>
              ) : null}
            </div>
          </div>

          <Button
            className="bg-[#16A34A] hover:bg-green-500 rounded-[20px] text-white"
            type="submit"
          >
            <p>Add Category</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
