"use client";

import React from "react";
import Search from "./Search";

const Header = () => {
  return (
    <div className=" w-full h-[90px] flex md:justify-center justify-end items-end">
      <Search />
    </div>
  );
};

export default Header;
