"use client";
import React from "react";
import Image from "next/image";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";
import "./test1.css";
import Chip from "@mui/material/Chip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { GrAttachment } from "react-icons/gr";

const CustomTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "0", // Set the radius to 0
      width: "100%",
    },
    "& .MuiAutocomplete-inputRoot": {
      width: "100%",
      borderRadius: "10px", // Change the border radius as needed
      border: "1px solid #ccc",
      borderColor: "#000",
      boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)",
      hover: {
        borderColor: "rgb(239 68 68 / var(--tw-bg-opacity))",
      },
    },
  },
})(TextField);

type T_option = {
  title: string;
  year: number;
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
];

const Test = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<T_option[]>([]);
  return (
    <div className="w-[calc(100vw-2px)] h-[calc(100vh-80px)] px-10 py-5 flex-grow overflow-hidden">
      <div className="flex flex-row flex-grow h-full max-h-full">
        <div className=" w-full h-full flex flex-col justify-center ">
          <div className="flex w-full items-center gap-4 flex-grow self-start select-none">
            <Image
              src="/icons/report.svg"
              width={80}
              height={80}
              alt="profile"
            />
            <h1 className="sm:text-[42px] text-[24px] font-bold whitespace-nowrap">
              Clinical Information
            </h1>
          </div>
          <div className="flex-grow min-w-0 w-full h-full flex flex-col justify-around items-center py-10 px-[15px] overflow-y-auto gap-6 ">
            <div className="flex flex-col gap-2 w-full max-w-full">
              <div className="flex w-full">
                <label htmlFor="multiple-limit-tags" className="pl-4 w-full">
                  HPO
                </label>
                <HiQuestionMarkCircle size={30} color="red" />
              </div>
              <Autocomplete
                multiple
                className="max-w-full !w-full !h-[50px]"
                limitTags={3}
                filterSelectedOptions
                id="multiple-limit-tags"
                options={top100Films}
                value={selectedOptions}
                onChange={(_, newValue) => {
                  setSelectedOptions(newValue);
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.title}>
                      {option.title}
                    </li>
                  );
                }}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option.title}
                      label={option.title}
                    />
                  ));
                }}
                getOptionLabel={(option) => option.title}
                // defaultValue={[top100Films[5]]}
                renderInput={(params) => (
                  <CustomTextField
                    // props={params}
                    {...params}
                  />
                )}
                sx={{ width: "500px" }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full max-w-full">
              <div className="flex w-full">
                <label htmlFor="clinical-description" className="pl-4 w-full">
                  Clinical Description
                </label>
                <HiQuestionMarkCircle size={30} color="red" />
              </div>
              <input
                id="clinical-description"
                type="text"
                className=" px-4 h-[50px] rounded-[10px] border-2 border-black w-full"
              />
              <button className="w-[180px] bg-color-gray text-black h-[50px] flex items-center justify-around px-4 rounded-[10px] text-[15px] mt-4">
                Attach Files
                <GrAttachment size={18} />
              </button>
            </div>
          </div>
        </div>
        <Image
          className=" hidden lg:flex select-none"
          src="/images/test_1/test_1.png"
          width={515}
          height={350}
          alt="home-1"
        />
      </div>
    </div>
  );
};

export default Test;
function makeStyles(
  arg0: (theme: any) => {
    root: {
      "& .MuiOutlinedInput-notchedOutline": { borderRadius: number };
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        borderRadius: string;
      };
    };
  }
) {
  throw new Error("Function not implemented.");
}
