"use client";
import React from "react";
import Image from "next/image";
import jHome from "./home.json";
import Link from "next/link";

export type T_service = {
  name: string;
  id: number;
  link: string;
};

const MainLayout = ({
  title,
  main,
  left,
}: {
  title: React.JSX.Element;
  main: React.JSX.Element;
  left: React.JSX.Element;
}) => {};

const HomePage = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] px-10 py-5 flex-grow">
      <div className="flex flex-row flex-grow h-full max-h-full">
        <div className=" w-full h-full flex flex-col justify-center ">
          <div className="flex w-full items-center gap-4 flex-grow self-start select-none">
            <Image
              src="/images/profile/profile.png"
              width={80}
              height={80}
              alt="profile"
            />
            <h1 className="text-[42px] font-bold whitespace-nowrap">
              Hello Dr.X
            </h1>
          </div>
          <div className="flex-grow w-full h-full flex flex-col justify-start items-start py-16 px-[15%] overflow-y-auto gap-4">
            {jHome.services_list.map((item: T_service, index) => (
              <Link
                key={index}
                className="w-full bg-color-orange text-color-white h-[60px] flex items-center justify-center rounded-[10px] text-[20px] hover:bg-color-blue"
                href={item.link}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className=" hidden lg:flex justify-center items-center w-[540px] h-[380px] min-w-[540px] min-h-[380px] bg-color-white rounded-[20px] self-center mb-[80px] select-none">
          <Image
            src="/images/home/home_1.png"
            width={515}
            height={350}
            alt="home-1"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
