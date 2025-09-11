interface ButtonProps {
  icons?: React.ReactNode;
  text?: string;
  onClick?: () => void;
}

const Button = ({ icons, onClick, text }: ButtonProps) => {
  return (
    <button
      className="inline-flex gap-2 border px-4 py-2 rounded-full border-[#4d4d4d] font-semibold hover:cursor-pointer  hover:bg-[#202123] w-auto"
      onClick={onClick}
    >
      {icons}
      <span className="hover:cursor-pointer">{text}</span>
    </button>
  );
};

export default Button;
