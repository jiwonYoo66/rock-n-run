import styled from "styled-components";

import theme from "@styles/theme";

export const CardContainer = styled.ul`
    display: grid;
    gap: 32px;
    padding: 20px 0 52px;
    ${theme.devices.tablet} {
        grid-template-columns: repeat(2, 1fr);
        gap: 44px;
    }
    ${theme.devices.desktop} {
        grid-template-columns: repeat(4, minmax(237px, 1fr));
        gap: 44px;
        padding: 32px 0 146px;
    }
`;
