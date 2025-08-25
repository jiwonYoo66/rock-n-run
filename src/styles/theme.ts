import { DefaultTheme } from "styled-components";

export type ColorsTypes = typeof colors;
export type DeviceTypes = typeof devices;
export type TypographyTypes = typeof typography;

const colors = {
  // General
  whiteColor: "#FFFFFF",
  blackColor: "#000000",
  activeRed: "#C61200",
  activeLightRed: "#FF0000",
  activeBlue: "#2491FF",
  activeIndigo: "#0C326F",
  activeOrange: "#FF5300",

  // Font
  grayFontColor: "#919191", // icon
  deepGrayFontColor: "#6E6E6E", // subtext, placeholder
  lightGrayFontColor: "#B3B3B3", // disabled
  darkPoint: "#222222",

  // Border
  grayBorderColor: "#D1D1D1",
  lightGrayBorderColor: "#E5E5E5", // line
  textSeperateBorder: "#D9D9D9",

  // Background
  componentsBgColor: "#F6F6F6",
  deepNavyBlueBgColor: "#2F3644",
  ultraLightGrayBgColor: "#F3F3F3", // bg
  whiteHoverColor: "#F0F0F0",
  disabledColor: "#f2f2f2",

  ///// MainPage /////
  // BG
  blueBg: "#2F5BDB",
  // TEXT
  positiveBlue: "#0078FF",
  textBlue: "#14AAFF",
  mainYellow: "#F9C920", // 락앤런 포인트
  pointYellow: "#FEEA00", // point

  //   activeBrightRed: "#FF6969",
  //   deepGrayFontColor2: "#707070",
  //   darkGrayFontColor: "#333333",
  //   ultraLightGrayFontColor: "#AAAAAA",
  //   footerBgColor: "#F9F9F9",
  //   brightBg: "#DCEDF5",
  //   darkBg: "#050D1C",
  //   textGray: "#CDCFD3",
  //   textSide: "#738FC3",
  //   textHoverBlue: "#2F5CDD",
};
const deviceSizes = {
  mobile: 375,
  tablet: 720,
  desktop: 1080,
};
const devices = {
  // 모바일 ~ 719px
  mobile: `@media screen and (max-width: ${deviceSizes.tablet - 1}px)`,
  // 테블릿 720px ~ 1080px
  tablet: `@media screen and (min-width: ${deviceSizes.tablet}px) and (max-width: ${deviceSizes.desktop - 1}px)`,
  // 태블릿 이하 ~ 1079px
  underTablet: `@media screen and (max-width: ${deviceSizes.desktop - 1}px)`,
  // PC 1080px ~
  desktop: `@media screen and (min-width: ${deviceSizes.desktop}px)`,
};
const typography = {
  emphasizedTitle: {
    // Emphasized Title
    fontSize: "36px",
    lineHeight: "52px",
  },
  largeTitle: {
    // Large Title
    fontSize: "24px",
    lineHeight: "32px",
    // fontSize: "28px",
    // lineHeight: "40px",
  },
  headline1: {
    // Headline 1
    fontSize: "20px",
    lineHeight: "28px",
  },
  headline2: {
    // Headline 2
    fontSize: "16px",
    lineHeight: "24px",
  },
  bodyDesktop: {
    // Body Desktop
    fontSize: "18px",
    lineHeight: "26px",
  },
  bodyMobile: {
    // Body Mobile
    fontSize: "14px",
    lineHeight: "22px",
  },
  caption: {
    // Caption
    fontSize: "12px",
    lineHeight: "18px",
  },
};
const theme: DefaultTheme & {
  colors: ColorsTypes;
  devices: DeviceTypes;
  typography: TypographyTypes;
} = {
  colors,
  devices,
  typography,
};

export default theme;
