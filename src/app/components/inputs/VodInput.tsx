interface VodInputProps {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
}

const VodInput = ({ label, placeholder, ref }: VodInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="url" className="text-[#909091]">
        {label}
      </label>
      <input
        className="border py-2 rounded-full border-[#4d4d4d] focus:outline-none focus:border-[#009962] bg-[#202123] text-white caret-[#009962] min-w-2xl px-6"
        placeholder={placeholder ?? "chzzk.naver.com/video/{number}"}
        type="url"
        id="url"
        name="url"
        ref={ref}
      />
    </div>
  );
};

export default VodInput;
