import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";

export const sizes = {
  medium: { w: 320, h: 32, p: 8, f: 14, prefixW: 72 },
  large: { w: 320, h: 40, p: 8, f: 16, prefixW: 61 },
};

type Variant = "default" | "darker" | "lighter";

export interface DGA_TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  label?: React.ReactNode;
  size?: "large" | "medium";
  variant?: Variant;
  error?: boolean;
  prefix?: React.ReactNode;
  prefixStyle?: "solid" | "subtle";
  suffix?: React.ReactNode;
  suffixStyle?: "solid" | "subtle";
}

const TextInput = React.forwardRef<HTMLInputElement, DGA_TextInputProps>(
  (
    {
      label,
      size = "large",
      variant,
      error,
      prefix,
      prefixStyle = "solid",
      suffix,
      suffixStyle = "solid",
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const sizeResult: "large" | "medium" = size ?? "large";

    // Default
    let fontColor = theme.textColor;
    let placeholderFontColor = theme.palette.neutral[500];
    let border = `1px solid ${
      error ? theme.palette.error[700] : theme.palette.neutral[400]
    }`;
    let borderHovered = `1px solid ${
      error ? theme.palette.error[700] : theme.palette.neutral[700]
    }`;
    let borderFocused = `1px solid ${
      error ? theme.palette.error[700] : theme.palette.neutral[700]
    }`;
    let backgroundColor = "#FFF";
    let animationColor = error ? theme.palette.error[700] : theme.textColor;
    let shadowFocus = theme.elevation.shadows.md;
    let prefixBg =
      prefixStyle === "solid" ? theme.palette.neutral[100] : "transparent";
    let prefixBgHover = theme.palette.neutral[100];
    let prefixBgActive = theme.palette.neutral[200];
    let suffixBg =
      suffixStyle === "solid" ? theme.palette.neutral[100] : "transparent";
    let suffixBgHover = theme.palette.neutral[100];
    let suffixBgActive = theme.palette.neutral[200];

    if (variant === "lighter") {
      backgroundColor = theme.palette.neutral[25];
      border = "1px solid transparent";
      borderHovered = `1px solid ${theme.palette.neutral[400]}`;
      borderFocused = `1px solid ${theme.palette.neutral[400]}`;
    }
    if (variant === "darker") {
      backgroundColor = theme.palette.neutral[100];
    }

    if (props.disabled) {
      fontColor = theme.palette.neutral[400];
      border = `1px solid ${theme.palette.neutral[200]}`;
      borderHovered = `1px solid ${theme.palette.neutral[200]}`;
    }

    return (
      <RootStyledComponent
        $theme={theme}
        className={mergeStrings("dgaui dgaui_textInput", props.className)}
        $customStyle={{
          prefixBg,
          prefixBgHover,
          prefixBgActive,
          suffixBg,
          suffixBgHover,
          suffixBgActive,
          size,
        }}
      >
        <label
          style={{ marginBottom: 8, textAlign: "start" }}
          htmlFor={props.id}
        >
          {label}
        </label>
        {prefix && <div className="prefix">{prefix}</div>}
        {suffix && <div className="suffix">{suffix}</div>}
        <StyledComponent
          $customStyle={{
            direction: theme.direction,
            minWidth: sizes[sizeResult].w,
            height: sizes[sizeResult].h,
            padding: sizes[sizeResult].p,
            fontSize: sizes[sizeResult].f,
            placeholderFontColor,
            fontColor,
            border,
            borderHovered,
            borderFocused,
            backgroundColor,
            shadowFocus,
          }}
          {...props}
          ref={ref}
        />
        <StyledComponentSpan
          $bgColor={animationColor}
          className="dgauiInputSeparator"
        />
      </RootStyledComponent>
    );
  }
);

const RootStyledComponent = styled.div<{
  $theme: Theme;
  $customStyle: {
    prefixBg: string;
    prefixBgHover: string;
    prefixBgActive: string;
    suffixBg: string;
    suffixBgHover: string;
    suffixBgActive: string;
    size?: "large" | "medium";
  };
}>`
  position: relative;
  direction: ${(p) => p.$theme.direction};
  display: flex;
  flex-direction: column;
  color: ${(p) => p.$theme.textColor};
  width: 100%;
  overflow: hidden;

  .prefix,
  .suffix {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(p) => (p.$customStyle.size === "large" ? "74px" : "61px")};
    height: ${(p) => (p.$customStyle.size === "large" ? "38px" : "30px")};
    background-color: ${(p) => p.$customStyle.prefixBg};
    bottom: 3px;
    inset-inline-start: 1px;
    border-start-start-radius: 4px;
    border-end-start-radius: 4px;
    font-size: 16px;
    color: ${(p) => p.$theme.palette.neutral[500]};
    transition: background-color 0.2s;
    overflow: hidden;

    &:hover {
      background-color: ${(p) => p.$customStyle.prefixBgHover};
    }
    &:active {
      background-color: ${(p) => p.$customStyle.prefixBgActive};
    }
  }

  .suffix {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    border-start-end-radius: 4px;
    border-end-end-radius: 4px;
    inset-inline-start: unset;
    inset-inline-end: 1px;
  }

  &:has(.prefix) {
    input {
      padding-inline-start: calc(
        ${(p) => (p.$customStyle.size === "large" ? "74px" : "61px")} + 8px
      );
    }
  }

  &:has(.suffix) {
    input {
      padding-inline-end: calc(
        ${(p) => (p.$customStyle.size === "large" ? "74px" : "61px")} + 8px
      );
    }
  }
`;

const StyledComponent = styled.input<{
  $customStyle: {
    direction: string;
    minWidth: number;
    height: number;
    padding: number;
    fontSize: number;
    fontColor: string;
    border: string;
    shadowFocus: string;
    placeholderFontColor: string;
    borderHovered: string;
    borderFocused: string;
    backgroundColor: string;
  };
}>`
  outline: none;
  direction: ${(props) => props.$customStyle.direction};
  border-radius: 4px;
  width: 100%;
  height: ${(props) => props.$customStyle.height}px;
  padding: 0 ${(props) => props.$customStyle.padding}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor};
  border: ${(props) => props.$customStyle.border};
  background-color: ${(props) => props.$customStyle.backgroundColor};
  overflow: hidden;
  box-sizing: border-box;

  &::placeholder {
    color: ${(props) => props.$customStyle.placeholderFontColor};
    font-weight: 300;
  }
  &:focus {
    ${(props) => props.$customStyle.shadowFocus};
    border: ${(props) => props.$customStyle.borderFocused};
    + .dgauiInputSeparator {
      transform: scaleX(0.995) translateY(-2.5px);
      opacity: 1;
    }
  }

  &:hover {
    border: ${(props) => props.$customStyle.borderHovered};
  }

  &:active + .dgauiInputSeparator {
    transform: scaleX(0.5) translateY(-2.5px);
    opacity: 1;
  }
  &:read-only + .dgauiInputSeparator,
  &:disabled + .dgauiInputSeparator {
    transform: scaleX(0) translateY(-2.5px);
    opacity: 0;
    pointer-events: none;
  }
`;

const StyledComponentSpan = styled.span<{ $bgColor: string }>`
  height: 2px;
  background: ${(props) => props.$bgColor};
  display: block;
  transform: scaleX(0) translateY(-2.5px);
  transform-origin: 50%;
  opacity: 1;
  transition: all 0.2s;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

export default TextInput;
