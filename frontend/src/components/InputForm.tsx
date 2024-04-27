export const InputForm = ({
  id,
  value,
  placeholder,
  Icon,
  type,
  required = false,
  handleChange,
}: {
  id: string;
  value: string;
  placeholder: string;
  Icon: any;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => {
  return (
    <div className="relative w-full h-[68px] rounded-[10px] border-2 border-[#777777] flex items-center">
      <Icon className="absolute w-[18px] h-[18px]  md:w-[20px] md:h-[20px] lg:w-[28px] lg:h-[28px]  left-0 my-auto ml-2 md:ml-4 text-[#777777] " />
      {required == true && value === "" && (
        <span className="absolute right-6 font-bold text-[15px] text-red-500">
          *
        </span>
      )}
      <input
        className={`placeholder:absolute placeholder:select-none bg-color-white md:pl-[40px] lg:pl-[50px] pl-[30px] min w-full h-[68px] rounded-[10px] border-2 border-[#777777] text-[10px] lg:text-[16px] md:text-[12px]`}
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};
