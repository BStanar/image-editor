import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "@/features/editor/types";
import { rgbaObjectToStr } from "../utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
};

export const ColorPicker = ({
  value,
  onChange,
}: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToStr(color.rgb);
          onChange(formattedValue);
        }}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToStr(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};
