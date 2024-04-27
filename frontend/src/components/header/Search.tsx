"use client";

import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [isSearch, setIsSearch] = React.useState("");

  const handelSearch = () => {
    if (isSearch === "") return;
    // TODO: search
  };

  return (
    <div className="relative w-[80%] md:w-[50%] h-[60px]  md:mr-0 mr-6 select-none">
      <input
        type="search"
        id="search"
        className="w-full h-full rounded-[15px] bg-color-white placeholder:text-[#9CA3AF] pl-16 pr-2"
        placeholder="Search"
        onChange={(e) => setIsSearch(e.target.value)}
        value={isSearch}
      />
      <CiSearch
        className="absolute top-1/2 left-4 -translate-y-1/2 min-w-[30px] cursor-pointer"
        size={30}
        onClick={handelSearch}
      />
    </div>
  );
};

export default Search;
