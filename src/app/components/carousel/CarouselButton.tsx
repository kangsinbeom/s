import clsx from "clsx";
import { CircleArrowIcon, CircleArrowIconProps } from "../icons/CircleArrow";

interface CarouselButtonProps extends CircleArrowIconProps {
  onClick?: () => void;
  visible?: boolean;
}

const CarouselButton = ({
  direction,
  onClick,
  visible = false,
}: CarouselButtonProps) => {
  const directionClass =
    direction === "left"
      ? "left-0 -translate-x-1/2"
      : "right-0 translate-x-1/2";
  const visibleClass = visible ? "opacity-100" : "opacity-0";
  return (
    <button
      className={clsx(
        "flex absolute rounded-full bg-[#2F3033] p-0.5 hover:cursor-pointer transition-opacity duration-100",
        directionClass,
        visibleClass
      )}
      onClick={onClick}
    >
      <CircleArrowIcon direction={direction} />
    </button>
  );
};

export default CarouselButton;
