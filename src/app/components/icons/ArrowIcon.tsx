interface ArrowIconProps {
  isAscending: "asc" | "desc" | "none";
}

const ArrowIcon = ({ isAscending }: ArrowIconProps) => {
  return (
    <div className="flex flex-col gap-1">
      <svg
        width="8"
        height="4"
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.6375 20.9124L39.4125 20.65L22.4125 1.08745C21.8375 0.42495 20.975 0.0124512 20.0125 0.0124512C19.05 0.0124512 18.1875 0.43745 17.6125 1.08745L0.625 20.6124L0.3375 20.9375C0.125 21.25 0 21.625 0 22.025C0 23.1125 0.925 24 2.075 24H37.925C39.075 24 40 23.1125 40 22.025C40 21.6125 39.8625 21.2249 39.6375 20.9124Z"
          fill={isAscending === "asc" ? "#000000" : "#D9D9D9"}
        />
      </svg>

      <svg
        width="8"
        height="4"
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.362499 3.08755L0.587502 3.35005L17.5875 22.9125C18.1625 23.575 19.025 23.9875 19.9875 23.9875C20.95 23.9875 21.8125 23.5625 22.3875 22.9125L39.375 3.38755L39.6625 3.06255C39.875 2.75005 40 2.37505 40 1.97505C40 0.887548 39.075 4.95911e-05 37.925 4.95911e-05L2.075 4.95911e-05C0.925001 4.95911e-05 0 0.887548 0 1.97505C0 2.38755 0.137499 2.77505 0.362499 3.08755Z"
          fill={isAscending === "desc" ? "#000000" : "#D9D9D9"}
        />
      </svg>
    </div>
  );
};

export default ArrowIcon;
