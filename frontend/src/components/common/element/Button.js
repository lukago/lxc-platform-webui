import React from 'react';
import styled from 'styled-components';
import { color, margin } from '../../styles/base';
import { fontWeight, fontSize } from '../../styles/typography';

const MainButton = props => (
  <button className="btn btn-click" {...props}>
    {props.text}
    {props.children}
  </button>
);

const StyledButton = styled(MainButton)`
  border-radius: 2px;
  border-width: 0;
  font-size: ${fontSize.normal};
  font-weight: ${fontWeight.bold};
  color: #FFFFFF;
  background-color: ${props => props.disabled && color.darkGrey} !important;
  min-height: 40px;
  padding: 0 ${margin.md};
  cursor: pointer;
  text-align: center;
`;

const StyledPrimaryButton = styled(StyledButton)`
  background-color: ${color.tealish};
`;

const StyledSecondaryButton = styled(StyledButton)`
  background-color: white;
  color: ${color.veryDarkGrey}
`;

export const Button = props => (
  <StyledButton {...props} />
);

export const PrimaryButton = props => (
  <StyledPrimaryButton {...props} />
);

export const SecondaryButton = props => (
  <StyledSecondaryButton {...props} />
);
