import React from 'react';

import { ExchangeProvider } from '../../contexts/ExchangeContext';
import Exchange from '../Exchange';

const App = () => {
  return (
    <ExchangeProvider>
      <Exchange />
    </ExchangeProvider>
  );
};

export default App;
