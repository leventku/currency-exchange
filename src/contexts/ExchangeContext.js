import React, { createContext, useReducer, useContext } from 'react';

const ExchangeStateContext = createContext();
const ExchangeDispatchContext = createContext();

function exchangeReducer (state, action) {
  switch (action.type) {
    case 'exchange': {
      return state;
    }
    case 'pocketChange': {
      return state;
    }
  }
}

// ACTIONS
// {
//   type: 'exchange',
//   payload: {
//     fromCurrency: 'GBP',
//     toCurrency: 'EUR',
//     amount: 10,
//     rate: 1.20,
//   },
// };

// {
//   type: 'pocketChange',
//   slot: 1,
//   newCurrency: 'EUR',
// };

// INITIAL STATE
const INITIAL_STATE = {
  pockets: {
    GBP: {
      balance: 100,
      active: true,
    },
    USD: {
      balance: 0,
      active: true,
    },
    EUR: {
      balance: 0,
      active: false,
    },
  },
  slots: [
    'GBP', 'USD',
  ],
  exchangeRate: 1.331789,
};

function ExchangeProvider ({ children }) {
  const [state, dispatch] = useReducer(exchangeReducer, INITIAL_STATE);

  return (
    <ExchangeStateContext.Provider value={state}>
      <ExchangeDispatchContext.Provider value={dispatch}>
        {children}
      </ExchangeDispatchContext.Provider>
    </ExchangeStateContext.Provider>
  );
}

function useExchangeState () {
  const context = useContext(ExchangeStateContext);

  if (typeof context === 'undefined') {
    throw new Error('useExchangeState must be used within a ExchangeProvider');
  }

  return context;
}

function useExchangeDispatch () {
  const context = useContext(ExchangeDispatchContext);

  if (typeof context === 'undefined') {
    throw new Error('useExchangeDispatch must be used within a ExchangeProvider');
  }
}

export { ExchangeProvider, useExchangeState, useExchangeDispatch };
