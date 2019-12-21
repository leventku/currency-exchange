import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { ExchangeProvider } from '../../contexts/ExchangeContext';
import Exchange from '../Exchange';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: sans-serif;
    background-color: #dadada
  }
`;

const AppWrap = styled.div`
  display: flex;
  height: 100vh;
`;

const App = () => {
  return (
    <AppWrap>
      <GlobalStyle />

      <ExchangeProvider>
        <Exchange />
      </ExchangeProvider>
    </AppWrap>
  );
};

export default App;
