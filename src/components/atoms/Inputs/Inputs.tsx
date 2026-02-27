import type { HTMLInputTypeAttribute } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import * as S from "./Inputs.style";

export interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  width?: number;
  height?: number;
  direction?: "column" | "row";
  name?: any;
  value?: any;
  disabled?: boolean;
  options?: any;
  endDate?: boolean;
  children?: React.ReactElement;
  errored?: boolean;
  erroredTxt?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  explain?: string;
  register?: any;
  onChange?: any;
}

export const Inputs = (props: InputProps) => {
  return (
    <S.InputBox
      direction={props.direction === "column" ? "column" : "row"}
      width={props.width}
    >
      <>
        {props.label && (
          <S.InputLabel
            htmlFor={props.id && props.id}
            direction={props.direction === "column" ? "column" : "row"}
          >
            <>{props.label}</>
          </S.InputLabel>
        )}
        <S.Input size={props.size} errored={props.errored}>
          <>
            {props.children}
            {props.errored && (
              <S.InputErroredTxt>
                {props.erroredTxt?.toString()}
              </S.InputErroredTxt>
            )}
            {props.explain && (
              <S.InputExplainTxt>{props.explain}</S.InputExplainTxt>
            )}
          </>
        </S.Input>
      </>
    </S.InputBox>
  );
};
