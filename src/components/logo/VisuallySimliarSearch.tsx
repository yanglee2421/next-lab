// React Imports
import React from "react";

// MUI Imports
import { styled } from "@mui/material";

export const VisuallySimliarSearch = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <StyledSvg
      ref={ref}
      data-name="图层 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      {...props}
    >
      <defs>
        <linearGradient
          id="_未命名的渐变_17"
          data-name="未命名的渐变 17"
          x1="5118.46"
          y1="-5244.59"
          x2="5231.82"
          y2="-5244.59"
          gradientTransform="translate(5408.48 -4844.59) rotate(-180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ff2656" />
          <stop offset="1" stopColor="#e7882e" />
        </linearGradient>
        <linearGradient
          id="_未命名的渐变_12"
          data-name="未命名的渐变 12"
          x1="5011.86"
          y1="-5244.59"
          x2="5119.01"
          y2="-5244.59"
          gradientTransform="translate(5408.48 -4844.59) rotate(-180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8035e5" />
          <stop offset="1" stopColor="#d94dd9" />
        </linearGradient>
        <filter id="drop-shadow-4" filterUnits="userSpaceOnUse">
          <feOffset dx="-14.39" dy="0" />
          <feGaussianBlur result="blur" stdDeviation="14.39" />
          <feFlood floodColor="#000" floodOpacity=".1" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <linearGradient
          id="_未命名的渐变_6"
          data-name="未命名的渐变 6"
          x1="4777.73"
          y1="-5244.59"
          x2="4998.59"
          y2="-5244.59"
          gradientTransform="translate(5408.48 -4844.59) rotate(-180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2e44d9" />
          <stop offset="1" stopColor="#4b80e6" />
        </linearGradient>
        <filter id="drop-shadow-5" filterUnits="userSpaceOnUse">
          <feOffset dx="-14.39" dy="0" />
          <feGaussianBlur result="blur-2" stdDeviation="14.39" />
          <feFlood floodColor="#000" floodOpacity=".1" />
          <feComposite in2="blur-2" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter id="outer-glow-6" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="0" />
          <feGaussianBlur result="blur-3" stdDeviation="14.39" />
          <feFlood floodColor="#000" floodOpacity=".2" />
          <feComposite in2="blur-3" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g>
        <polygon
          className="cls-2"
          points="173.3 217.83 626.7 243.46 626.7 556.54 173.3 582.17 173.3 217.83"
        />
        <polygon
          className="cls-3"
          points="286.65 198.32 626.7 243.46 626.7 556.54 286.65 601.68 286.65 198.32"
        />
        <polygon
          className="cls-4"
          points="400 178.82 626.7 243.46 626.7 556.54 400 621.18 400 178.82"
        />
      </g>
      <g className="cls-5">
        <path
          className="cls-1"
          d="M536.39,523.2c5.44-7.93,3.43-18.79-4.5-24.25l-13.67-9.4c-19.21-13.21-27.53-37.32-20.2-58.68,7.23-21.08,8.51-44.09,3.68-66.47-9.69-45.1-46.44-82.09-91.42-92.06-40.25-8.96-80.38,1.66-110.21,29.04-29.36,26.95-43.74,66.8-38.44,106.62,6.97,52.18,47.94,94.75,99.64,103.53,28.36,4.76,56.41,.07,81.06-13.81,8.4-4.72,11.38-15.36,6.66-23.74-4.71-8.39-15.36-11.37-23.74-6.66-17.61,9.9-37.69,13.25-58.14,9.81-36.8-6.24-65.96-36.59-70.92-73.76-3.85-28.96,6.15-56.8,27.46-76.34,21.3-19.54,50.14-27.06,79.06-20.67,31.92,7.08,58,33.35,64.9,65.37,3.5,16.19,2.61,32.74-2.58,47.83-12.36,36.09,1.39,76.69,33.45,98.72l13.67,9.4c3,2.07,6.45,3.07,9.85,3.07,5.54,0,11-2.63,14.38-7.57Z"
        />
        <circle className="cls-1" cx="382.41" cy="391.09" r="52.23" />
      </g>
    </StyledSvg>
  );
});

const StyledSvg = styled("svg")(`
.cls-1 {
  fill: #fff;
}

.cls-2 {
  fill: url(#_未命名的渐变_17);
}

.cls-3 {
  fill: url(#_未命名的渐变_12);
  filter: url(#drop-shadow-4);
}

.cls-4 {
  fill: url(#_未命名的渐变_6);
  filter: url(#drop-shadow-5);
}

.cls-5 {
  filter: url(#outer-glow-6);
}
`);
