"use client";

import { PlusIcon } from "@/assets/icon/PlusIcon";
import { HeaderLogo } from "../assets/icon/HeaderLogo";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon } from "@/assets/icon/CloseIcon";
import { useAuth } from "./utils/AuthProvider";
import { IoIosLogOut } from "react-icons/io";
import { RecordAdd } from "./RecordAdd";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export const Header = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const [openAdd, setOpenAdd] = useState(true);
  const { user, logout } = useAuth();

  const paths = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Records",
      path: "/records",
    },
  ];
  return (
    <div className="flex md:w-screen  py-4 bg-white ">
      <div className="md:w-[1440px] md:m-auto flex md:justify-between  max-md:px-3 ">
        <div className="flex w-[226px] gap-6 align-baseline ">
          <HeaderLogo />
          {paths.map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                className="text-[#0F172A] font-normal"
                style={{
                  fontWeight: pathname === path.path ? "600" : "400",
                }}
              >
                {path.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-6 px-12 ">
          <Button
            className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-blue-400 md:visible max-md:hidden "
            onClick={() => setOpen(!open)}
          >
            <PlusIcon /> Record
          </Button>
          <div>
            <Avatar className="" onClick={() => setOpenAdd(!openAdd)}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div
              className={`  w-fit h-fit fixed  z-20 ${
                openAdd ? "invisible" : "visible"
              }  duration-150 `}
            >
              <div className="w-[300px] h-[300px] border border-[#D1D5DB] rounded-xl bg-white">
                <div className="px-8 py-6 h-fit grid gap-40 ">
                  <div className="flex items-center gap-2 ">
                    <Avatar className="" onClick={() => setOpenAdd(!openAdd)}>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>DN</AvatarFallback>
                    </Avatar>
                    <p className="text-black">{user?.name}</p>
                  </div>

                  <Button className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-red-400 px-12">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className="flex gap-2">
                          <p>Log Out</p>
                          <div>
                            <IoIosLogOut size={24} />
                          </div>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white  rounded-[12px]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Гарахдаа итгэлтэй байна уу?
                          </AlertDialogTitle>
                          <AlertDialogDescription></AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-[#0166FF] rounded-[8px] border-[#0166FF] text-white hover-bg-[#0166FF]">
                            Үгүй
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={logout}
                            className="border rounded-[8px] border-[#0166FF]"
                          >
                            Тийм
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Button>
                </div>
              </div>
              <div
                onClick={() => setOpenAdd(!openAdd)}
                className="absolute top-8 right-8 cursor-pointer  "
              >
                <CloseIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecordAdd open={open} setOpen={setOpen} />
    </div>
  );
};
