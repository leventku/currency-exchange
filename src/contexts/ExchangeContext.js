import React, { createContext, useReducer, useContext } from 'react';

import {
  SERVER_URL,
  START_EXCHANGE_RATE_UPDATE,
  FINISH_EXCHANGE_RATE_UPDATE,
  FAIL_EXCHANGE_RATE_UPDATE,
  TRIGGER_EXCHANGE,
  CHANGE_POCKET
} from '../constants';

const ExchangeStateContext = createContext();
const ExchangeDispatchContext = createContext();

function exchangeReducer (state, action) {
  console.log(action)
  switch (action.type) {
    case TRIGGER_EXCHANGE: {
      return state;
    }
    case CHANGE_POCKET : {
      return state;
    }
    case FINISH_EXCHANGE_RATE_UPDATE: {
      return {...state, exchangeRate: action.payload.rates[state.slots[1]]};
    }
  }
  return state;
}

// ACTIONS
// {
//   type: 'TRIGGER_EXCHANGE',
//   payload: {
//     fromCurrency: 'GBP',
//     toCurrency: 'EUR',
//     amount: 10,
//     rate: 1.20,
//   },
// };

// {
//   type: 'CHANGE_POCKET',
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

  return context;
}

async function getExchangeRates (dispatch, fromCurrency) {
  dispatch({ type: START_EXCHANGE_RATE_UPDATE });
  try {
    const response = await fetch(`${SERVER_URL}/${fromCurrency}`);

    if (response.status >= 400 && response.status < 600) {
      console.log('bad response');
      throw new Error('Bad response from server');
    } else {
      console.log('good responses');

      const json = await response.json();

      dispatch({ type: FINISH_EXCHANGE_RATE_UPDATE, payload: json });
    }
  } catch (error) {
    console.log('fail response', error);
    dispatch({ type: FAIL_EXCHANGE_RATE_UPDATE, error });
  }
}

export { ExchangeProvider, useExchangeState, useExchangeDispatch, getExchangeRates };
