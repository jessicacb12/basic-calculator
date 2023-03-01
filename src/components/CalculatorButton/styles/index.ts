import styled from 'styled-components';

import { BUTTON_DEFAULT_STYLE, PRIMARY_BUTTON_DEFAULT_STYLE, PRIMARY_BUTTON_DEFAULT_STYLE_HOVER } from '../../../styles/presets';

export const DefaultButton = styled.button `
    ${BUTTON_DEFAULT_STYLE};
    &[data-disabled="false"] {
        ${PRIMARY_BUTTON_DEFAULT_STYLE_HOVER};
    }
    &[data-disabled="false"]:hover {
        ${PRIMARY_BUTTON_DEFAULT_STYLE}
    }
`