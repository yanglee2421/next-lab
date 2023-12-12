import { useThemeStore } from "@/hooks/store";
export function HomeRight() {
  const setCount = useThemeStore((state) => state.setCount);
  console.log("render HomeRight");

  return (
    <>
      <button onClick={() => setCount()}>click me</button>
    </>
  );
}
