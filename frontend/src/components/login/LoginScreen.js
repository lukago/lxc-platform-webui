import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentWrapper from '../common/ContentWrapper';
import {color, deviceSize, margin} from '../styles/base';
import {fontSize} from '../styles/typography';
import InputText from '../common/element/InputText';
import {PrimaryButton, SecondaryButton} from '../common/element/Button';
import {HeaderSmall} from '../common/element/Header';
import Spinner from '../common/element/Spinner';
import Warning from '../common/element/Warning';
import DefaultLayout from '../common/DefaultLayout';
import * as t from '../../locale/translations';

const InputTextStyled = styled(InputText)`
  margin-bottom: ${margin.md};
  
  @media (max-width: ${deviceSize.tabletMax}) {  
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: ${margin.md};
  margin-bottom: ${margin.lg};
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-flow: row wrap;
`;

const ButtonStyled = styled(PrimaryButton)`
  width: 100%;
  margin-top: ${margin.xs};
`;

const HeaderSmallWrapped = styled(HeaderSmall)`
  margin-top: ${margin.md};
  margin-bottom: ${margin.lg};
`;

const SpinnerMessage = styled.div`
  font-size: ${fontSize.large};
  margin-bottom: ${margin.md};
`;

const UserProfileScreen = (props) => {
  const {
    loginDisabled, credentials, startLogin, restartLogin,
    handleChange, children, spinnerVisible, loginFailedMessage,
  } = props;

  return (
      <DefaultLayout>
        <ContentWrapper backgroundColor={color.veryLightGrey}>
          <div>
            <HeaderSmallWrapped>{t.login.head}</HeaderSmallWrapped>

            <InputTextStyled
                propName="username"
                label={t.login.username}
                value={credentials.username}
                onChange={handleChange}
            />
            <InputTextStyled
                propName="password"
                label={t.login.password}
                value={credentials.password}
                onChange={handleChange}
            />

            <ButtonWrapper>
              <ButtonStyled text={t.login.start} onClick={startLogin} disabled={loginDisabled}/>
            </ButtonWrapper>

            {loginFailedMessage && (
                <Warning message={loginFailedMessage}/>
            )}

            {spinnerVisible && (
                <Spinner show>
                  <SpinnerMessage>{t.login.spinner}</SpinnerMessage>
                  <SecondaryButton type="button" onClick={restartLogin}
                                   text={t.common.cancel}/>
                </Spinner>
            )}
          </div>
          {children}
        </ContentWrapper>
      </DefaultLayout>
  );
};

UserProfileScreen.propTypes = {
  loginDisabled: PropTypes.bool.isRequired,
  credentials: PropTypes.shape({}).isRequired,
  startLogin: PropTypes.func.isRequired,
  restartLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  spinnerVisible: PropTypes.bool.isRequired,
  loginFailedMessage: PropTypes.string.isRequired,
};

UserProfileScreen.defaultProps = {
  spinnerVisible: false,
};

export default UserProfileScreen;
