import styled from 'styled-components';

import { INDIGO, BUTTON_DEFAULT_STYLE, PRIMARY_BUTTON_DEFAULT_STYLE, PRIMARY_BUTTON_DEFAULT_STYLE_HOVER } from '../../../styles/presets';

export const MainContainer = styled.div({
    gridColumn: '2',
    gridRow: '2',
    display: 'grid',
    gridGap: '8px',
    gridTemplateRows: 'repeat(10, 1fr)',
    gridTemplateColumns: 'repeat(10, 1fr)',
});

export const CalculatorScreen = styled.div`
    grid-column: 2 / -3;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 800;
    padding: 7px 4px 0;
    color: ${INDIGO};
    border: 2px solid ${INDIGO};
    & p {
        margin: 0;
        white-space: nowrap;
        overflow: scroll;
    }
`;

export const OnOffButton = styled.button`
    grid-row: 3;
    grid-column: 6 / 8;
    ${PRIMARY_BUTTON_DEFAULT_STYLE}
    ${BUTTON_DEFAULT_STYLE}
    &:hover {
        ${PRIMARY_BUTTON_DEFAULT_STYLE_HOVER}
    }
`

export const ResetButton = styled.button`
    grid-row: 4;
    grid-column: 7;
    ${BUTTON_DEFAULT_STYLE}
    &[data-disabled="false"] {
        ${PRIMARY_BUTTON_DEFAULT_STYLE}
    }
    &[data-disabled="false"]:hover {
        ${PRIMARY_BUTTON_DEFAULT_STYLE_HOVER}
    }
`