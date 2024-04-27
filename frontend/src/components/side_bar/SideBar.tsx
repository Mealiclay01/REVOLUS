"use client";

import React from "react";
import MenuItem from "./MenuItem";
import { SlHome } from "react-icons/sl";
import { BsBagCheck } from "react-icons/bs";
import { BsClipboard2Check } from "react-icons/bs";
import { BiBarChartAlt2 } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { authCheck } from "@/api/entryPage";
import Loading from "@/pages/Loading";
// import { headers } from "next/headers";

const MainSideBar = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await authCheck("auth/"),
    queryKey: ["auth"],
  });
  if (isLoading || !data) {
    return <Loading />;
  } else
    return (
      <div className=" h-screen flex flex-col justify-center items-center border-r-2 border-black w-0 lg:w-[300px] overflow-hidden">
        <div className="flex-grow w-full h-fit flex flex-col gap-5 text-[18px]">
          <div className="mt-[200px]"></div>
          <MenuItem name="Home" Icon={SlHome} link="/" />
          <MenuItem name="My Test" Icon={BsBagCheck} link="/" />
          <MenuItem name="My Result" Icon={BsClipboard2Check} link="/" />
          <MenuItem name="Support" Icon={BiBarChartAlt2} link="/" />
        </div>
        <div className="mb-10  w-full flex flex-col gap-5">
          <MenuItem name="Profile" Icon={CgProfile} link="/" />
          <MenuItem name="Logout" Icon={TbLogout2} link="/login" />
        </div>
      </div>
    );
};

import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const isLoged = ["/login", "/signup"].includes(pathname || "");

  if (!isLoged) return <MainSideBar />;
  else return <></>;
};

export default SideBar;
