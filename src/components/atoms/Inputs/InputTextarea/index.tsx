import type { InputProps } from "../Inputs";
import { Inputs } from "../Inputs";
import * as S from "./InputTextarea.style";

export const InputTextarea = (props: InputProps) => {
  return (
    <Inputs
      id={props.id && props.id}
      label={props.label && props.label}
      size={props.size}
      width={props.width}
      direction={props.direction}
      errored={props.errored}
      erroredTxt={props.erroredTxt}
    >
      <S.Textarea
        id={props.id && props.id}
        name={props.name}
        size={props.size}
        height={props.height}
        placeholder={props.placeholder && props.placeholder}
        value={props.value}
        disabled={props.disabled}
        {...props.register}
        // {...props.register}
      />
    </Inputs>
  );
};
