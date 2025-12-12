interface StockBannerItemProps {
  name: string;
  number: string;
  percent: number;
}

const StockBannerItem = ({ name, number, percent }: StockBannerItemProps) => {
  return (
    <div className="flex min-w-[200px] h-[60px] bg-[#1C1D1F] items-center px-4 justify-between border-r border-[#3A3B3D] hover:bg-[#292B2D]">
      <div className="flex flex-col">
        <span className="font-bold text-sm text-[#D0D3DA]">{name}</span>
        <span className="text-[10px] text-[#9399AA]">{number}</span>
      </div>
      <span className="font-extrabold text-4xl text-[#18E996]">{percent}%</span>
    </div>
  );
};

export default StockBannerItem;
