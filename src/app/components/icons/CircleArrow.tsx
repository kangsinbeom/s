export interface CircleArrowIconProps {
  direction?: "right" | "left";
}

export const CircleArrowIcon = ({ direction }: CircleArrowIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: direction === "left" ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    >
      <path
        d="M13 20.5L18.5 15L13 9.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
