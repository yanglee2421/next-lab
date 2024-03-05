import type { SwitchProps } from "@mui/material";
import { Switch } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

export function InputSwitch(props: Props) {
  const { name, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name,
    disabled,
    defaultValue: false,
  });

  return (
    <Switch
      {...controller.field}
      checked={controller.field.value}
      onChange={(evt, checked) => {
        void evt;
        controller.field.onChange(checked);
      }}
      {...restProps}
    ></Switch>
  );
}

type Props = SwitchProps & {
  name: string;
};
