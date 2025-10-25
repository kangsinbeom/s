export const TimeInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { h: number; m: number; s: number };
  onChange: (val: { h: number; m: number; s: number }) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="w-10">{label}</span>
      <input
        type="number"
        min={0}
        value={value.h}
        onChange={(e) => onChange({ ...value, h: +e.target.value })}
        className="w-14 px-2 py-1 rounded-md bg-gray-800 text-white"
      />
      :
      <input
        type="number"
        min={0}
        max={59}
        value={value.m}
        onChange={(e) => onChange({ ...value, m: +e.target.value })}
        className="w-14 px-2 py-1 rounded-md bg-gray-800 text-white"
      />
      :
      <input
        type="number"
        min={0}
        max={59}
        value={value.s}
        onChange={(e) => onChange({ ...value, s: +e.target.value })}
        className="w-14 px-2 py-1 rounded-md bg-gray-800 text-white"
      />
    </div>
  );
};
