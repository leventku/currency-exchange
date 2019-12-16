import React from 'react';

import Exchange from '../Exchange';
import { ExchangeProvider } from '../../contexts/ExchangeContext';

const App = () => {
  return (
    <ExchangeProvider>
      <Exchange />
    </ExchangeProvider>
  );
};

export default App;
