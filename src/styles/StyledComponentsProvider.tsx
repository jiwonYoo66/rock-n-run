"use client";
import React, { ReactNode, useMemo } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import { ToastContainer, Zoom } from "react-toastify";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";

export default ({ children }: { children: ReactNode }) => {
  const styledComponentsStyleSheet = useMemo(() => new ServerStyleSheet(), []);

  useServerInsertedHTML(() => {
    // Server 에서 생성되는 컴포넌트
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return <ThemeProvider theme={theme}>{styles}</ThemeProvider>;
  });

  if (typeof window !== "undefined") {
    // Server 실행 후 Client 에서 렌더링되는 컴포넌트
    return (
      <ThemeProvider theme={theme}>
        {children}
        <ToastContainer
          draggable
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          transition={Zoom}
          theme="dark"
          toastClassName="custom-toast"
        />
      </ThemeProvider>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
        <ToastContainer
          draggable
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          transition={Zoom}
          theme="dark"
          toastClassName="custom-toast"
        />
      </ThemeProvider>
    </StyleSheetManager>
  );
};
