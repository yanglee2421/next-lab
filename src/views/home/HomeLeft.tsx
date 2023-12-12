import { useThemeStore } from "@/hooks/store";
// import { useShallow } from "zustand/react/shallow";

export function HomeLeft() {
  /**
   * Dispatching state updates when the set function is called
   * Compare the results returned by the selector within the component (using Object.is)
   * If the result is different from the last time, re-render is triggered
   *
   * When using useShallow
   * Shallow comparison will be performed on the results returned by the selector
   * Even if the objects are not the same
   * But when the reference of the object is exactly the same as the previous object
   * Re-render will not be triggered
   */

  //   const keys = useThemeStore(
  //     useShallow((state) => {
  //       return [state.mode];
  //     })
  //   );

  const keys = useThemeStore((state) => {
    return [state.mode];
  });

  console.log("render HomeLeft", keys);

  return <>Left</>;
}
