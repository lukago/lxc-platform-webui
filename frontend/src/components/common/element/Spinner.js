import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255,255,255,0.9);
  padding-top: 20%;
`;

const SpinnerImage = styled.img`
  display: block;
  max-height: 200px;
`;

const Spinner = ({ show, children }) => {
  if (show) {
    return (
      <StyledSpinner>
        <SpinnerImage src="/img/loading_spinner_transparent.gif" alt="loading" />
        {children}
      </StyledSpinner>
    );
  }
  return null;
};

Spinner.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
};

Spinner.defaultProps = {
  children: null,
  show: false,
};

export default Spinner;
