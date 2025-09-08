import Link from "next/link";
import styled from "styled-components";
import theme from "@styles/theme";

export const SearchArea = styled.div`
  margin-top: 48px;
`;
export const SearchText = styled.div`
  font-size: 14px;
  color: ${theme.colors.grayFontColor};
`;
export const Empty = styled.div`
  padding: 40px 12px;
`;
export const Result = styled.div`
  padding: 20px 12px;
`;
