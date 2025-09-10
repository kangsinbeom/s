interface ButtonProps {
  icons?: React.ReactNode;
  text?: string;
  onClick: () => void;
}

const Button = ({ icons, onClick, text }: ButtonProps) => {
  return (
    <div
      className="flex gap-2 border px-4 py-2 rounded-full border-[#4d4d4d] font-semibold hover:cursor-pointer hover:bg-[#202123]"
      onClick={onClick}
    >
      {icons}
      <button className="">{text}</button>
    </div>
  );
};

export default Button;
