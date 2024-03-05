// MUI Imports
import React from "react";

import {
  CardContent,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

// Components Imports
import { WooAutomatic } from "./WooAutomatic";
import { WooManual } from "./WooManual";

// React Imports

export function WooForm() {
  const [way, setWay] = React.useState(1);

  return (
    <>
      <CardContent>
        <RadioGroup
          row
          value={way}
          onChange={(evt, v) => {
            void evt;
            React.startTransition(() => {
              setWay(Number(v));
            });
          }}
        >
          <FormControlLabel
            control={<Radio></Radio>}
            label="Automatic"
            value={1}
          ></FormControlLabel>
          <FormControlLabel
            control={<Radio></Radio>}
            label="Manual"
            value={2}
          ></FormControlLabel>
        </RadioGroup>
        {(() => {
          switch (way) {
            case 1:
              return (
                <FormHelperText>
                  Automatically connect via WooCommerce plugin
                </FormHelperText>
              );
            case 2:
              return (
                <FormHelperText>
                  Manually fill in APIKey and Secret
                </FormHelperText>
              );
            default:
              return null;
          }
        })()}
      </CardContent>
      {(() => {
        switch (way) {
          case 1:
            return <WooAutomatic></WooAutomatic>;
          case 2:
            return <WooManual></WooManual>;
          default:
            return null;
        }
      })()}
    </>
  );
}
