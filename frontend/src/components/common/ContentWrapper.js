import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {deviceSize, margin} from '../styles/base';

const Content = styled.div`
  max-width: 1500px;
  margin-left: ${margin.xl};
  margin-right: ${margin.xl};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color} !important;
  
  @media (max-width: ${deviceSize.tabletMax}) {
    width: 100%;
    margin: 0;
    padding: 0 ${margin.md};
  }
`;

const ContentWrapper = (props) => (
    <Content className={props.className} backgroundColor={props.backgroundColor}
             color={props.color}>{props.children}
    </Content>
);

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};

ContentWrapper.defaultProps = {
  className: null,
  backgroundColor: null,
  color: null,
};

export default ContentWrapper;
