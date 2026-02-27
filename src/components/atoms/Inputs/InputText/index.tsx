import type { ChangeEvent } from "react";
import { useState } from "react";
import type { InputProps } from "../Inputs";
import { Inputs } from "../Inputs";

interface InputTextProps extends InputProps {
  defaultValue?: string | number;
  step?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  isClearable?: boolean;
}

export const InputText = ({
  type = "text",
  size = "md",
  direction = "column",
  id,
  label,
  placeholder,
  width,
  name,
  disabled,
  onChange,
  onBlur,
  defaultValue,
  register,
  step,
  value: propValue,
  isClearable,
}: InputTextProps) => {
  // 내부 상태로 입력값 관리 (외부 value prop이 있으면 그 값을 우선)
  const [innerValue, setInnerValue] = useState<string | number | undefined>(
    propValue ?? defaultValue
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value);
    onChange && onChange(e);
  };

  const handleClear = () => {
    setInnerValue("");
    if (onChange) {
      const event = {
        target: { name, value: "" },
      } as any;
      onChange(event);
    }
  };

  // value 우선순위: propValue > innerValue
  const value = propValue !== undefined ? propValue : innerValue;

  return (
    <Inputs
      id={id && id}
      label={label && label}
      size={size}
      width={width}
      direction={direction}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <input
          name={name}
          id={id && id}
          placeholder={placeholder && placeholder}
          type={type}
          disabled={disabled}
          onChange={handleChange}
          onBlur={onBlur}
          value={value}
          defaultValue={defaultValue}
          step={step}
          {...register}
          style={{ width: "100%", paddingRight: isClearable ? 28 : undefined }}
        />
        {isClearable && value && value !== "" && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              position: "absolute",
              right: 6,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              color: "#aaa",
              padding: 0,
              lineHeight: 1,
            }}
            tabIndex={-1}
            aria-label="입력값 지우기"
          >
            ×
          </button>
        )}
      </div>
    </Inputs>
  );
};
