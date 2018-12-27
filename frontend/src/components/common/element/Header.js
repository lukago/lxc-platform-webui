import React from 'react';
import styled from 'styled-components';
import { color } from '../../styles/base';
import { fontSize } from '../../styles/typography';

const StyledHeader = styled.h1`
  font-size: ${fontSize.heading};
  color: ${color.brownishGrey};
`;

const StyledHeaderSmall = styled(StyledHeader)`
  font-size: ${fontSize.headingSmall};
`;

const StyledHeaderMedium = styled(StyledHeader)`
  font-size: ${fontSize.headingMedium};
`;

const StyledHeaderLarge = styled(StyledHeader)`
  font-size: ${fontSize.headingLarge};
`;

const StyledSubheader = styled(StyledHeader)`
  font-size: ${fontSize.subheading};
`;

export const Header = props => (
  <StyledHeader className={ props.className }{...props} />
);

export const HeaderSmall = props => (
  <StyledHeaderSmall className={ props.className }{...props} />
);

export const HeaderMedium = props => (
  <StyledHeaderMedium className={ props.className } {...props} />
);

export const HeaderLarge = props => (
  <StyledHeaderLarge className={ props.className }{...props} />
);

export const Subheader = props => (
  <StyledSubheader className={ props.className }{...props} />
);
