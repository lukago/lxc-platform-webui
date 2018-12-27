import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, margin } from '../../styles/base';

const WarningWrapper = styled.div`
  display: flex;
  background-color: ${color.warningLightRed};
  color: ${color.warningDarkRed};
  width: 100%;
  padding: ${margin.md};
  margin-top: ${margin.lg};
`;

const WarningIcon = styled.img`
  max-width: 22px;
  max-height: 22px;
`;

const WarningMessage = styled.div`
  margin-left: ${margin.sm};
`;

const Warning = ({ message }) => (
  <WarningWrapper>
    <WarningIcon src="/img/exclamation.png" />
    <WarningMessage>{message}</WarningMessage>
  </WarningWrapper>
);

Warning.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Warning;
