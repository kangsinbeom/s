interface OpenModalButtonProps {
  text: string;
  onClick?: () => void;
}

export default function OpenModalButton({
  text,
  onClick,
}: OpenModalButtonProps) {
  return (
    <button
      className="text-[#FFFFFFB3] ml-auto text-sm border-[#ffffff33] border rounded-[10px] px-3 py-2 hover:cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
