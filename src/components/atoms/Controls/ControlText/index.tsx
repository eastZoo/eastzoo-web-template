import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ChangeEvent } from "react";
import type { InputProps } from "../../Inputs/Inputs";
import { Inputs } from "../../Inputs/Inputs";

interface ControlTextProps extends InputProps {
  control: Control<any>;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  step?: string;
}

export const ControlText = ({
  type = "text",
  size = "md",
  direction = "column",
  step,
  id,
  label,
  placeholder,
  width,
  name,
  disabled,
  control,
  defaultValue,
}: ControlTextProps) => {
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
          {type === "number" ? (
            <input
              id={id}
              placeholder={placeholder}
              type={type}
              step={step}
              onChange={field.onChange}
              value={field.value}
              disabled={disabled}
            />
          ) : type === "date" ? (
            <input
              id={id}
              placeholder={placeholder}
              type={type}
              onChange={field.onChange}
              value={field.value}
              disabled={disabled}
              max="3000-01-01"
              min="1900-01-01"
            />
          ) : type === "file" ? (
            <input
              id={id}
              type={type}
              onChange={(e) => field.onChange(e.target.files?.[0] || null)}
              disabled={disabled}
            />
          ) : (
            <input
              id={id}
              placeholder={placeholder}
              type={type}
              onChange={field.onChange}
              value={field.value}
              disabled={disabled}
            />
          )}
        </Inputs>
      )}
    />
  );
};
