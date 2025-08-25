import localFont from "next/font/local";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./theme";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "swiper/css/bundle";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const PretendardRegular = localFont({
  src: [
    {
      path: "./fonts/Pretendard/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});
const PretendardMedium = localFont({
  src: [
    {
      path: "./fonts/Pretendard/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});
const PretendardSemiBold = localFont({
  src: [
    {
      path: "./fonts/Pretendard/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});
const PretendardBold = localFont({
  src: [
    {
      path: "./fonts/Pretendard/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
const Tenada = localFont({
  src: [
    {
      path: "./fonts/Tenada/Tenada.woff2",
      weight: "normal",
      style: "normal",
    },
  ],
});

export default createGlobalStyle`
  @font-face {
    font-family: Tenada;
    src: url(${Tenada});
  }

  @font-face {
    font-family: PretendardRegular;
    src: url(${PretendardRegular});
  }

  @font-face {
    font-family: PretendardMedium;
    src: url(${PretendardMedium});
  }

  @font-face {
    font-family: PretendardSemiBold;
    src: url(${PretendardSemiBold});
  }

  @font-face {
    font-family: PretendardBold;
    src: url(${PretendardBold});
  }

  /* @font-face {
    font-family: AppleSDGothicNeoEB;
    src: local('AppleSDGothicNeoEB'), url('/fonts/AppleSDGothicNeoEB.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: AppleSDGothicNeoB;
    src: local('AppleSDGothicNeoB'), url('/fonts/AppleSDGothicNeoB.woff') format('woff');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: AppleSDGothicNeoSB;
    src: local('AppleSDGothicNeoSB'), url('/fonts/AppleSDGothicNeoSB.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: AppleSDGothicNeoM;
    src: local('AppleSDGothicNeoM'), url('/fonts/AppleSDGothicNeoM.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: AppleSDGothicNeoR;
    src: local('AppleSDGothicNeoR'), url('/fonts/AppleSDGothicNeoR.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  } */

  * {
    box-sizing: border-box;
    &::-webkit-scrollbar {
    display: none !important;
    }
    
    -ms-overflow-style: none !important; // 인터넷 익스플로러
    scrollbar-width: none ; // 파이어폭스
  }
  /* html.hide-scrollbar {
    &::-webkit-scrollbar {
      display: none !important;
    }
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  } */

  body {
    position: static;
    top: 0 !important;
    margin: 0;
    touch-action: pan-x pan-y;
    background-color: ${theme.colors.whiteColor};
    font-size: 14px;
    line-height: 22px;
    font-family: PretendardRegular, sans-serif;
    scrollbar-width: none;
    -ms-overflow-style: none;

    ${theme.devices.mobile} {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    ${theme.devices.tablet} {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    ${theme.devices.desktop} {
      -ms-overflow-style: none !important; /* IE와 Edge */
      scrollbar-width: none !important; /* 파이어폭스 */

      &::-webkit-scrollbar {
        width: 4px;
        height: 0; /* 스크롤바 높이를 0으로 설정해 스크롤바 화살표를 제거합니다 */
      }

      &::-webkit-scrollbar-track {
        background: transparent !important; /* 스크롤바 트랙을 투명하게 설정 */
      }

      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) =>
          theme.colors.deepNavyBlueBgColor} !important; /* 스크롤바의 색상 */
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555; /* 스크롤바 핸들 호버 시 색상 */
      }
    }
  }

  a {
    color: ${theme.colors.blackColor};
    text-decoration: none;

    &:link,
    &:visited,
    &:active {
      text-decoration: none;
      border: none;
      outline: none;
    }
  }

  textarea {
    resize: none;
  }

  figure {
    outline: none;
  }

  input,
  textarea {
    font-size: 15px;
    font-family: PretendardRegular, sans-serif;
    border: none;
    outline: none;
    background-color: inherit;

    &::placeholder {
      font-size: 14px;
      font-family: PretendardRegular, sans-serif;
    }

    &:disabled {
      color: ${theme.colors.blackColor};
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea:focus,
  input:focus {
    outline: none;
  }

  button {
    padding: 0;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: ${theme.colors.whiteColor};
  }

  select {
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  // toast message
  .custom-toast {
    min-width: 320px;
    width: 320px;
    font-size: 14px;
    line-height: 1.2;
    white-space: pre-wrap;
    word-break: keep-all !important;
    margin: 0 auto;
    border-radius: 5px;
  }

  // 구글 번역기 
  .goog-te-banner-frame {
    display: none !important;
  }

  .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc {
    opacity: 0;
    //display: none;
  }

  iframe.skiptranslate {
    display: none !important;
  }

  .skiptranslate {
    display: none !important;
  }
  // React Quill Style
  //  .ql-snow
  //  .ql-picker.ql-font
  //  .ql-picker-label[data-value="AppleSDGothicNeo"]::before,
  //  .ql-snow
  //  .ql-picker.ql-font
  //  .ql-picker-item[data-value="AppleSDGothicNeo"]::before {
  //    content: "AppleSDGothicNeo";
  //    font-family: AppleSDGothicNeoMedium, sans-serif !important;
  //  }
  //
  //  .ql-font-AppleSDGothicNeo {
  //    font-family: AppleSDGothicNeoMedium, sans-serif !important;
  //  }
  //
  //  // Nanum Gothic
  //  span.ql-font-NanumGothic,
  //  .ql-snow
  //  .ql-picker.ql-font
  //  .ql-picker-label[data-value="NanumGothic"]::before,
  //  .ql-snow
  //  .ql-picker.ql-font
  //  .ql-picker-item[data-value="NanumGothic"]::before {
  //    content: "NanumGothic";
  //    font-family: "Nanum Gothic", sans-serif !important;
  //  }
  //
  //  .ql-font-AppleSDGothicNeo {
  //    font-family: AppleSDGothicNeoMedium, sans-serif !important;
  //  }
  //
  //  // pretendard
  //  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="pretendard"]::before,
  //  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="pretendard"]::before {
  //    content: "pretendard";
  //    font-family: PretendardMedium, sans-serif !important;
  //  }
  //
  //  .ql-font-pretendard {
  //    font-family: PretendardMedium, sans-serif !important;
  //  }
  //
  //  // sans-serif
  //  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
  //  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
  //    content: "sans-serif";
  //    font-family: sans-serif !important;
  //  }
  //
  //  .ql-font-sans-serif {
  //    font-family: sans-serif !important;
  //  }
  //
  //  // monospace
  //  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  //  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  //    content: "monospace";
  //    font-family: monospace !important;
  //  }
  //
  //  .ql-font-monospace {
  //    font-family: monospace !important;
  //  }
  //
  //  // font size
  //  .ql-size-12px,
  //  .ql-size span[data-value="12px"]::before {
  //    font-size: 12px !important;
  //  }
  //
  //  .ql-size-14px,
  //  .ql-size span[data-value="14px"]::before {
  //    font-size: 14px !important;
  //  }
  //
  //  .ql-size-15px,
  //  .ql-size span[data-value="15px"]::before {
  //    font-size: 15px !important;
  //  }
  //
  //  .ql-size-16px,
  //  .ql-size span[data-value="16px"]::before {
  //    font-size: 16px !important;
  //  }
  //
  //  .ql-size-18px,
  //  .ql-size span[data-value="18px"]::before {
  //    font-size: 18px !important;
  //  }
  //
  //  .ql-size-20px,
  //  .ql-size span[data-value="20px"]::before {
  //    font-size: 20px !important;
  //  }
  //
  //  .ql-size-22px,
  //  .ql-size span[data-value="22px"]::before {
  //    font-size: 22px !important;
  //  }
  //
  //  .ql-size-24px,
  //  .ql-size span[data-value="24px"]::before {
  //    font-size: 24px !important;
  //  }
  //
  //  .ql-size-26px,
  //  .ql-size span[data-value="26px"]::before {
  //    font-size: 26px !important;
  //  }
  //
  //  .ql-size-28px,
  //  .ql-size span[data-value="28px"]::before {
  //    font-size: 28px !important;
  //  }
  //
  //  .ql-size-30px,
  //  .ql-size span[data-value="30px"]::before {
  //    font-size: 30px !important;
  //  }
  //
  //  .ql-size-32px,
  //  .ql-size span[data-value="32px"]::before {
  //    font-size: 32px !important;
  //  }
  //
  //  // Bold
  //  .ql-editor strong {
  //    font-weight: bold !important;
  //  }
  //
  //  .ql-editor em {
  //    font-style: italic !important;
  //  }
  //
  //  .ql-align-right {
  //    text-align: right !important;
  //  }
  //
  //  .ql-align-center {
  //    text-align: center !important;
  //  }
  //
  //  .ql-indent-1:not(.ql-direction-rtl) {
  //    padding-left: 3em !important;
  //  }
  //
  //  .ql-indent-2:not(.ql-direction-rtl) {
  //    padding-left: 6em !important;
  //  }
  //
  //  .ql-indent-3:not(.ql-direction-rtl) {
  //    padding-left: 9em !important;
  //  }
  //
  //  .ql-indent-4:not(.ql-direction-rtl) {
  //    padding-left: 12em !important;
  //  }
  //
  //  .ql-indent-5:not(.ql-direction-rtl) {
  //    padding-left: 15em !important;
  //  }

  ${reset}
`;
