// React Imports
import React from "react";

export const Shoplazza = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      ref={ref}
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4601"
      width="200"
      height="200"
      {...props}
    >
      <path
        d="M102.4 1024l275.2-64 19.2-166.4c25.6 83.2 115.2 140.8 198.4 140.8 134.4 0 236.8-121.6 236.8-256 0-108.8-64-185.6-147.2-211.2h172.8l64-467.2-275.2 64-19.2 172.8a211.2 211.2 0 0 0-198.4-140.8C294.4 96 192 217.6 192 352c0 108.8 64 185.6 147.2 211.2H166.4l-64 460.8z"
        fill="#E63323"
        p-id="4602"
      ></path>
    </svg>
  );
});
