interface OpenModalButtonProps {
  text: string;
}

export default function OpenModalButton({ text }: OpenModalButtonProps) {
  return (
    <button className="text-[#FFFFFFB3] ml-auto text-sm border-[#ffffff33] border rounded-[10px] px-3 py-2 hover:cursor-pointer">
      {text}
    </button>
  );
}
