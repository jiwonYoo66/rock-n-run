"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import styled from "styled-components";
import noImage from "@assets/images/noImageArticle.png";
import theme from "@styles/theme";

type EditorContentsProps = {
  title?: string;
  createdAt?: string;
  contents?: string;
  mainImg?: string;
};

const EditorContents = ({
  title,
  createdAt,
  contents,
  mainImg,
}: EditorContentsProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Wrapper>
      <Title
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title || "") }}
      />
      <DateText>
        {createdAt ? dayjs(createdAt).format("YYYY-MM-DD") : "-"}
      </DateText>
      <NextImage
        alt="Article Image"
        sizes="(max-width: 1080px) 100%"
        quality={75}
        width={688}
        height={460}
        src={mainImg && !imageError ? mainImg : noImage}
        onError={() => setImageError(true)}
      />
      <Contents
        id="react-quill"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            (contents as string)?.replaceAll("\n", "<br/>") || ""
          ),
        }}
      />
    </Wrapper>
  );
};

export default EditorContents;

const Wrapper = styled.article``;
const Title = styled.h1`
  ${theme.typography.headline1};
  font-family: PretendardSemiBold, sans-serif;
`;
const DateText = styled.div`
  color: ${theme.colors.lightGrayFontColor};
  margin: 8px 0 16px;
`;
const NextImage = styled(Image)`
  width: 100%;
  height: auto;
  transition: 0.25s;
`;
const Contents = styled.div`
  margin: 20px 0 64px;

  font-family: PretendardRegular, sans-serif;

  ${theme.devices.desktop} {
    margin: 24px 0 64px;

    & img {
      max-width: 688px;
    }
  }

  &,
  & * {
    font-size: 16px;
    line-height: 24px;
  }

  & img {
    width: 100%;
  }

  & p {
    word-break: break-all;
    margin: 4px 0;
  }

  & li {
    margin: 4px 0;
  }

  & ol,
  & ul {
    padding-left: 1.5em;
    margin: 6px 0;
  }

  & ol li {
    list-style: decimal;
    margin-left: 1.5em;
  }

  & ul li {
    list-style: disc;
    margin-left: 1.5em;
  }

  & h1 {
    font-size: 32px !important;
    font-weight: bold !important;
    margin-bottom: 6px;
  }

  & h2 {
    font-size: 24px !important;
    font-weight: bold !important;
    margin-bottom: 6px;
  }

  & h3 {
    font-size: 19px !important;
    font-weight: bold !important;
    margin-bottom: 4px;
  }

  & h4 {
    font-size: 16px !important;
    font-weight: bold !important;
    margin-bottom: 2px;
  }

  & h5 {
    font-size: 12px !important;
    font-weight: bold !important;
    margin-bottom: 2px;
  }

  & em {
    font-style: italic !important;
  }

  & b,
  & strong {
    font-size: inherit;
    font-weight: bold !important;
  }

  .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="AppleSDGothicNeo"]::before,
  .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="AppleSDGothicNeo"]::before {
    content: "AppleSDGothicNeo";
    font-family: AppleSDGothicNeoMedium, sans-serif !important;
  }

  .ql-font-AppleSDGothicNeo {
    font-family: AppleSDGothicNeoMedium, sans-serif !important;
  }

  // Nanum Gothic
  span.ql-font-NanumGothic,
  .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="NanumGothic"]::before,
  .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="NanumGothic"]::before {
    content: "NanumGothic";
    font-family: "Nanum Gothic", sans-serif !important;
  }

  .ql-font-AppleSDGothicNeo {
    font-family: AppleSDGothicNeoMedium, sans-serif !important;
  }

  // pretendard
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="pretendard"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="pretendard"]::before {
    content: "pretendard";
    font-family: PretendardMedium, sans-serif !important;
  }

  .ql-font-pretendard {
    font-family: PretendardMedium, sans-serif !important;
  }

  // sans-serif
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
    content: "sans-serif";
    font-family: sans-serif !important;
  }

  .ql-font-sans-serif {
    font-family: sans-serif !important;
  }

  // monospace
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "monospace";
    font-family: monospace !important;
  }

  .ql-font-monospace {
    font-family: monospace !important;
  }

  // font size
  .ql-size-12px,
  .ql-size span[data-value="12px"]::before {
    font-size: 12px !important;
  }

  .ql-size-14px,
  .ql-size span[data-value="14px"]::before {
    font-size: 14px !important;
  }

  .ql-size-15px,
  .ql-size span[data-value="15px"]::before {
    font-size: 15px !important;
  }

  .ql-size-16px,
  .ql-size span[data-value="16px"]::before {
    font-size: 16px !important;
  }

  .ql-size-18px,
  .ql-size span[data-value="18px"]::before {
    font-size: 18px !important;
  }

  .ql-size-20px,
  .ql-size span[data-value="20px"]::before {
    font-size: 20px !important;
  }

  .ql-size-22px,
  .ql-size span[data-value="22px"]::before {
    font-size: 22px !important;
  }

  .ql-size-24px,
  .ql-size span[data-value="24px"]::before {
    font-size: 24px !important;
  }

  .ql-size-26px,
  .ql-size span[data-value="26px"]::before {
    font-size: 26px !important;
  }

  .ql-size-28px,
  .ql-size span[data-value="28px"]::before {
    font-size: 28px !important;
  }

  .ql-size-30px,
  .ql-size span[data-value="30px"]::before {
    font-size: 30px !important;
  }

  .ql-size-32px,
  .ql-size span[data-value="32px"]::before {
    font-size: 32px !important;
  }

  // Bold
  .ql-editor strong {
    font-weight: bold !important;
  }

  .ql-editor em {
    font-style: italic !important;
  }

  .ql-align-right {
    text-align: right !important;
  }

  .ql-align-center {
    text-align: center !important;
  }

  .ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 3em !important;
  }

  .ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 6em !important;
  }

  .ql-indent-3:not(.ql-direction-rtl) {
    padding-left: 9em !important;
  }

  .ql-indent-4:not(.ql-direction-rtl) {
    padding-left: 12em !important;
  }

  .ql-indent-5:not(.ql-direction-rtl) {
    padding-left: 15em !important;
  }
`;
