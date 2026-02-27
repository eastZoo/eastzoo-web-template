import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { InputProps } from "../../Inputs/Inputs";
import { Inputs } from "../../Inputs/Inputs";
import type { ChangeEvent } from "react";

interface ControlCheckBoxProps extends InputProps {
  control: Control<any>;
  defaultValue?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ControlCheckBox = ({
  type = "checkbox",
  size = "md",
  direction = "column",
  id,
  label,
  placeholder,
  width,
  name,
  disabled,
  control,
  defaultValue,
}: ControlCheckBoxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, formState }) => (
        <Inputs
          id={id}
          label={label}
          size={size}
          width={width}
          direction={direction}
          errored={!!formState.errors[name]}
          erroredTxt={formState.errors[name]?.message}
        >
          <input
            id={id}
            placeholder={placeholder}
            type={type}
            onChange={(e) => field.onChange(e.target.checked)} // checked 값으로 업데이트
            checked={!!field.value} // boolean 값으로 설정
            disabled={disabled}
          />
        </Inputs>
      )}
    />
  );
};
