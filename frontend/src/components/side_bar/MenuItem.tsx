import Link from "next/link";
import { IconType } from "react-icons";

const MenuItem = ({
  name,
  Icon,
  link,
}: {
  name: string;
  Icon: IconType;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="flex gap-2 xl:gap-4 w-[80%] p-3 hover:bg-color-orange  hover:text-white text-black font-bold rounded-xl !cursor-pointer select-none self-center whitespace-nowrap	overflow-hidden text-ellipsis"
    >
      <Icon className="min-w-[30px] " size={30} />
      {name}
    </Link>
  );
};

export default MenuItem;
