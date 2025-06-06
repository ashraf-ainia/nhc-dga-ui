import React from "react";
import InlineAlert, { DGA_InlineAlertProps } from "../InlineAlert";
import styled, { css, keyframes } from "styled-components";
import { createRoot } from "react-dom/client";

export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface Props extends DGA_InlineAlertProps {
  position?: Position;
  duration?: number;
  rtl?: boolean;
}

const toast: (props: Props) => void = ({
  position = "bottom-left",
  duration = 993000,
  rtl,
  ...props
}) => {
  const container = document.createElement("div");
  container.className = "dgaui dgaui_toastContainer";
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(container);

  const root = createRoot(container);

  const onCloseHandler = () => {
    props.onClose?.();
    root.unmount();
    container.remove();
  };

  const closeHandler = () => {
    addCloseClass();
    setTimeout(onCloseHandler, 200);
  };

  const addCloseClass = () => {
    if (container.childNodes[0] && container.childNodes[0] instanceof Element) {
      container.childNodes[0].className =
        container.childNodes[0].className + " toastClose";
    }
  };

  setTimeout(addCloseClass, +duration);
  setTimeout(onCloseHandler, +duration + 200);

  root.render(
    <StyledComponent className="dgaui_toast" $position={position}>
      <InlineAlert
        {...props}
        onClose={closeHandler}
        hasClose
        style={{ direction: rtl ? "rtl" : "ltr" }}
      />
    </StyledComponent>
  );
};

const getAnimation = (position: Position) => {
  switch (position) {
    case "top-left": {
      return {
        keyframes: keyframes`
            from {
                left: -484px;
            }
            to {
                left: 16px;
            }
          `,
        css: css`
          top: 16px;
          left: 16px;
        `,
        backCss: css`
          left: -484px;
        `,
        mobileCss: css`
          padding-inline-end: 16px;
        `,
      };
    }
    case "top-center": {
      return {
        keyframes: keyframes`
            from {
                top: -100vh;
            }
            to {
                top: 16px;
            }
          `,
        css: css`
          top: 16px;
          left: calc(50% - 242px);
        `,
        backCss: css`
          top: -100vh;
        `,
        mobileCss: css`
          padding: 0 8px;
        `,
      };
    }
    case "top-right": {
      return {
        keyframes: keyframes`
              from {
                  right: -484px;
              }
              to {
                  right: 16px;
              }
            `,
        css: css`
          top: 16px;
          right: 16px;
        `,
        backCss: css`
          right: -484px;
        `,
        mobileCss: css`
          padding-inline-start: 16px;
        `,
      };
    }
    case "bottom-left": {
      return {
        keyframes: keyframes`
            from {
                left: -484px;
            }
            to {
                left: 16px;
            }
          `,
        css: css`
          bottom: 16px;
          left: 16px;
        `,
        backCss: css`
          left: -484px;
        `,
        mobileCss: css`
          padding-inline-end: 16px;
        `,
      };
    }
    case "bottom-center": {
      return {
        keyframes: keyframes`
            from {
                bottom: -100vh;
            }
            to {
                bottom: 16px;
            }
          `,
        css: css`
          bottom: 16px;
          left: calc(50% - 242px);
        `,
        backCss: css`
          bottom: -100vh;
        `,
        mobileCss: css`
          padding: 0 8px;
        `,
      };
    }
    case "bottom-right": {
      return {
        keyframes: keyframes`
              from {
                  right: -484px;
              }
              to {
                  right: 16px;
              }
            `,
        css: css`
          bottom: 16px;
          right: 16px;
        `,
        backCss: css`
          right: -484px;
        `,
        mobileCss: css`
          padding-inline-start: 16px;
        `,
      };
    }
  }
};

const StyledComponent = styled.div<{ $position: Position }>`
  z-index: 2500;
  width: 484px;
  position: fixed;
  transition: all 0.2s;
  ${(p) => getAnimation(p.$position)?.css};
  animation: ${(p) => getAnimation(p.$position)?.keyframes} 0.2s
    cubic-bezier(0.075, 0.82, 0.165, 1);

  &.toastClose {
    ${(p) => getAnimation(p.$position)?.backCss};
    animation-direction: reverse;
  }

  .dgaui_inlineAlert {
    box-shadow: 0 32px 64px -12px #10182824;
  }

  &:has(.dgaui_inlineAlert.mobile) {
    ${(p) => getAnimation(p.$position)?.mobileCss};
  }

  @media screen and (max-width: 640px) {
    width: calc(100% - 32px);
  }
`;

export default toast;
