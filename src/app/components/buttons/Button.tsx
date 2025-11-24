import { buttonSizeMap, buttonStyleMap } from "@/app/styles/button";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons?: React.ReactNode;
  text?: string;
  size?: keyof typeof buttonSizeMap;
  styleType?: keyof typeof buttonStyleMap;
  textAlign?: "start" | "center" | "end";
}

const Button = ({
  icons,
  text,
  size = "md",
  styleType = "basicRounded",
  textAlign = "center",
  ...props
}: ButtonProps) => {
  const sizeClass = buttonSizeMap[size];
  const styleClass = buttonStyleMap[styleType];
  const alignStyle = `justify-${textAlign}`;

  return (
    <button
      className={clsx(
        "inline-flex items-center hover:cursor-pointer",
        alignStyle,
        sizeClass,
        styleClass
      )}
      {...props}
    >
      {icons}
      <span className="font-bold text-[15px]">{text}</span>
    </button>
  );
};

export default Button;
