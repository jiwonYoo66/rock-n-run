import styled, { css } from "styled-components";

import theme from "@styles/theme";

export const BorderBox = styled.div<{ $grayBg?: boolean }>`
    margin: 32px 0;
    padding: 21px 16px;
    width: 100%;
    border: ${theme.colors.blackColor} 1px solid;
    ${({ $grayBg }) =>
        $grayBg &&
        css`
            margin: 0;
            border: none;
            background-color: ${theme.colors.ultraLightGrayBgColor};
        `}
`;
export const Box = styled.div`
    position: relative;
    margin-left: 26px;
`;
export const Label = styled.label<{
    $fontSize?: number;
    $fontColor?: string;
    $fontFamily?: string;
    $margin?: string;
    $top?: number;
}>`
    font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 18)}px;
    font-family:
        ${({ $fontFamily }) =>
            $fontFamily ? $fontFamily : "PretendardRegular"},
        sans-serif;
    color: ${({ $fontColor }) =>
        $fontColor ? $fontColor : theme.colors.blackColor};
    padding-top: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 4px;
    cursor: pointer;

    &:before {
        content: "";
        display: inline-block;
        top: ${({ $top }) => ($top ? $top : 5)}px;
        left: -22px;
        vertical-align: top;
        -webkit-transition: -webkit-transform 0.4s
            cubic-bezier(0.45, 1.8, 0.5, 0.75);
        -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
        transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        z-index: 1;
        width: 10px;
        height: 4px;
        border-top-style: none;
        border-right-style: none;
        border-width: 2px;
        position: absolute;
        cursor: pointer;
    }

    &:after {
        content: "";
        width: 20px;
        height: 20px;
        display: inline-block;
        position: absolute;
        margin-left: -20px;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
        box-sizing: border-box;
        border-radius: 2px;
        border: ${theme.colors.blackColor} 1px solid;
    }
`;
export const Input = styled.input`
    position: absolute;
    opacity: 0;
    z-index: -1;
    &:checked + ${Label} {
        &:before {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
            border-bottom-style: solid;
            border-left-style: solid;
            border-color: ${theme.colors.whiteColor};
        }

        &:after {
            border-color: ${theme.colors.blackColor};
            background-color: ${theme.colors.blackColor};
        }
    }
`;

export const AgreementContent = styled.div`
    /* margin: 20px 0 0; */
    padding: 12px 16px;
    max-height: 343px;
    overflow: auto;
    border-top: ${theme.colors.lightGrayBorderColor} 1px solid;
    border-bottom: ${theme.colors.lightGrayBorderColor} 1px solid;
`;
export const Agreement = styled.div`
    ${theme.typography.bodyDesktop}
    white-space: pre-wrap;
`;
