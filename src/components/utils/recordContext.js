"use client";

import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Icons from "react-icons/pi";
import classNames from "classnames";
import { api } from "@/lib/axios";

export const RecordContext = createContext(null);

export const RecordProvider = ({ children }) => {
  const [newCategory, setNewCategory] = useState("");
  const [records, setRecords] = useState([]);
  const getData = async () => {
    try {
      const response = await api.get("/records", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const hardDataIcons = [
    { iconName: "PiHouseFill" },
    { iconName: "PiHouseLineFill" },
    { iconName: "PiIdentificationBadgeFill" },
    { iconName: "PiIdentificationCardFill" },
    { iconName: "PiLadderFill" },
    { iconName: "PiIntersectSquareFill" },
    { iconName: "PiImageSquareFill" },
    { iconName: "PiMagnifyingGlassPlusFill" },
    { iconName: "PiMicrophoneFill" },
    { iconName: "PiMicrosoftExcelLogoFill" },
    { iconName: "PiNotepadFill" },
    { iconName: "PiListPlusFill" },
    { iconName: "PiLeafFill" },
    { iconName: "PiNumberFiveFill" },
    { iconName: "PiNumberCircleSevenFill" },
    { iconName: "PiRoadHorizonFill" },
    { iconName: "PiHourglassSimpleMediumFill" },
    { iconName: "PiAnchorSimpleFill" },
    { iconName: "PiBezierCurveFill" },
    { iconName: "PiExcludeFill" },
    { iconName: "PiVignetteFill" },
    { iconName: "PiBaseballFill" },
    { iconName: "PiQuestionFill" },
    { iconName: "PiExamFill" },
    { iconName: "PiWatchFill" },
    { iconName: "PiGlobeSimpleFill" },
    { iconName: "PiOrangeSliceFill" },
    { iconName: "PiPeaceFill" },
    { iconName: "PiToiletPaperFill" },
    { iconName: "PiPencilFill" },
  ];
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
        const response = await api.post(
          "/records",
          newRecord,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
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
  const colors = [
    "#0166FF",
    "#01B3FF",
    "#41CC00",
    "#F9D100",
    "#FF7B01",
    "#AE01FF",
    "#FF0101",
  ];
  const renderIcon = (recordCategoryId) => {
    const record = records?.find((el) => el.id === recordCategoryId);

    if (record) {
      const IconComponent = Icons[record.icon];
      return (
        <div className="flex gap-2 relative mx-2 my-2">
          <IconComponent
            className={classNames("cursor-pointer w-10 h-10 my-2")}
            color={record.iconColor}
          />
          <p className="text-lg font-normal">{record.title}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <RecordContext.Provider
      value={{
        newCategory,
        setNewCategory,
        records,
        getData,
        hardDataIcons,
        formik,
        colors,
        renderIcon,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};
