export const buttonSizeMap: Record<string, string> = {
  md: "gap-2 px-3.5 py-1.5 max-w-[150px] w-fit h-auto",
  full: "w-full h-auto py-1.5 gap-2 px-2",
};

export const buttonStyleMap = {
  basicRounded: "border rounded-full border-[#4d4d4d] hover:bg-[#202123]",
  grayRounded:
    "border rounded-full bg-[#dfe2ea] border-[#4d4d4d] hover:bg-[#202123]",
  noneRounded: "rounded-lg hover:bg-[#4d4d4d]",
} as const;
