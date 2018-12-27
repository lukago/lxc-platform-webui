import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deviceSize } from '../styles/base';

const Page = styled.div`
  display: flex;
  flex-direction: row;
  
  @media (max-width: ${deviceSize.hugeTabletMax}) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ComponentWrapper = styled.div`
  flex: 1;
`;

const DefaultLayout = ({ children }) => (
  <Fragment>
    <Page>
      <Content>
        <ComponentWrapper>
          {children}
        </ComponentWrapper>
      </Content>
    </Page>
  </Fragment>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
