import { buttonSizeMap, buttonStyleMap } from "@/app/styles/button";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons?: React.ReactNode;
  text?: string;
  size?: keyof typeof buttonSizeMap;
  styleType?: keyof typeof buttonStyleMap;
}

const Button = ({
  icons,
  text,
  size = "md",
  styleType = "basicRounded",
  ...props
}: ButtonProps) => {
  const sizeClass = buttonSizeMap[size];
  const styleClass = buttonStyleMap[styleType];

  return (
    <button
      className={`inline-flex items-center justify-center hover:cursor-pointer ${sizeClass} ${styleClass}`}
      {...props}
    >
      {icons}
      <span className="font-bold text-[15px]">{text}</span>
    </button>
  );
};

export default Button;
