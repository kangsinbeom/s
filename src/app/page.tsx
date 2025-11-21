"use client";

export default function Home() {
  const handleTest = async () => {
    await fetch("/apis/chzzkUserInfo").then(async (res) => {
      const data = await res.json();
      console.log(data);
    });
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-28">
      <button onClick={handleTest}>test button</button>
    </div>
  );
}
