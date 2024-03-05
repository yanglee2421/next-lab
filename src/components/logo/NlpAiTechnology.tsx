// React Imports
import React from "react";

import { styled } from "@mui/material";

export const NlpAiTechnology = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <StyledSvg
      ref={ref}
      id="_图层_1"
      data-name="图层 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      {...props}
    >
      <defs>
        <linearGradient
          id="_未命名的渐变_6"
          data-name="未命名的渐变 6"
          x1="415.4"
          y1="400"
          x2="640.51"
          y2="400"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2e44d9" />
          <stop offset="1" stopColor="#4b80e6" />
        </linearGradient>
        <linearGradient
          id="_未命名的渐变_81"
          data-name="未命名的渐变 81"
          x1="176.23"
          y1="400"
          x2="401.34"
          y2="400"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#04d3f4" />
          <stop offset="1" stopColor="#16f2e1" />
        </linearGradient>
      </defs>
      <path
        className="cls-7"
        d="M640.51,400c0-44.96-26.37-83.76-64.49-101.79v-7.77c0-62.1-50.34-112.44-112.44-112.44h-20.08c-15.52,0-28.11,12.59-28.11,28.11v387.78c0,15.52,12.59,28.11,28.11,28.11h20.08c62.1,0,112.44-50.34,112.44-112.44v-7.77c38.11-18.03,64.49-56.82,64.49-101.79Z"
      />
      <path
        className="cls-6"
        d="M373.23,178h-20.08c-62.1,0-112.44,50.34-112.44,112.44v7.77c-38.11,18.03-64.49,56.82-64.49,101.79s26.37,83.76,64.49,101.79v7.77c0,62.1,50.34,112.44,112.44,112.44h20.08c15.52,0,28.11-12.59,28.11-28.11V206.11c0-15.52-12.59-28.11-28.11-28.11Z"
      />
      <path
        className="cls-3"
        d="M439.94,469.65l55.93,28.1c8.45,2.7,17.08-3.61,17.08-12.48v-16.25h8.07c7.23,0,13.1-5.86,13.1-13.1v-120.05c0-7.23-5.86-13.1-13.1-13.1h-225.3c-7.23,0-13.1,5.86-13.1,13.1v120.05c0,7.23,5.86,13.1,13.1,13.1h140.23c1.35,0,2.7,.21,3.98,.62Z"
      />
      <circle className="cls-5" cx="335.71" cy="393.12" r="19.56" />
      <circle className="cls-5" cx="409.07" cy="393.12" r="19.56" />
      <circle className="cls-5" cx="482.43" cy="393.12" r="19.56" />
      <g>
        <line
          className="cls-4"
          x1="362.58"
          y1="318.7"
          x2="362.58"
          y2="256.07"
        />
        <circle className="cls-1" cx="362.58" cy="256.07" r="17.68" />
      </g>
      <line className="cls-4" x1="362.58" y1="476.85" x2="362.58" y2="539.48" />
      <circle className="cls-1" cx="362.58" cy="539.48" r="17.68" />
      <line className="cls-3" x1="278.61" y1="400" x2="234.64" y2="400" />
      <circle className="cls-1" cx="232.21" cy="400" r="17.68" />
      <g>
        <line
          className="cls-4"
          x1="415.4"
          y1="251.54"
          x2="478.03"
          y2="251.54"
        />
        <circle className="cls-2" cx="478.03" cy="251.54" r="17.68" />
      </g>
      <line className="cls-4" x1="415.4" y1="552.37" x2="478.03" y2="552.37" />
      <circle className="cls-2" cx="478.03" cy="552.37" r="17.68" />
      <line className="cls-3" x1="640.51" y1="400" x2="596.55" y2="400" />
      <circle className="cls-2" cx="594.11" cy="400" r="17.68" />
    </StyledSvg>
  );
});

const StyledSvg = styled("svg")(`.cls-1 {
  fill: #6dddc3;
}

.cls-1, .cls-2, .cls-3 {
  stroke-width: 13.01px;
}

.cls-1, .cls-2, .cls-3, .cls-4 {
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cls-2 {
  fill: #2e6cee;
}

.cls-5 {
  fill: #fff;
}

.cls-6 {
  fill: url(#_未命名的渐变_81);
}

.cls-3, .cls-4 {
  fill: none;
}

.cls-4 {
  stroke-width: 15.61px;
}

.cls-7 {
  fill: url(#_未命名的渐变_6);
}`);
