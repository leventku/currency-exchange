import React, { createContext, useReducer, useContext } from 'react';

import {
  SERVER_URL,
  START_EXCHANGE_RATE_UPDATE_ACTION,
  FINISH_EXCHANGE_RATE_UPDATE_ACTION,
  FAIL_EXCHANGE_RATE_UPDATE_ACTION,
  TRIGGER_EXCHANGE,
  CHANGE_POCKET_ACTION,
  SWAP_SLOTS_ACTION,
  INPUT_CHANGE_ACTION,
} from '../constants';

const ExchangeStateContext = createContext();
const ExchangeDispatchContext = createContext();

function exchangeReducer (state, action) {
  // console.log(action)
  switch (action.type) {
    case TRIGGER_EXCHANGE: {
      return state;
    }
    case CHANGE_POCKET_ACTION : {
      const results = Array.from(state.slots);
      const { slot, value } = action.payload;

      results[slot] = value;

      return { ...state, slots: results };
    }
    case FINISH_EXCHANGE_RATE_UPDATE_ACTION: {
      // console.log(action.payload)
      return { ...state, exchangeRates: action.payload.rates };
    }
    case SWAP_SLOTS_ACTION: {
      const slots = Array.from(state.slots);

      slots.reverse();

      const inputs = Array.from(state.inputs);

      inputs.reverse();

      return { ...state, slots, inputs };
    }

    case INPUT_CHANGE_ACTION: {
      const { slot, value } = action.payload;
      const inputs = Array.from(state.inputs);

      const sellRate = state.exchangeRates[state.slots[1]];

      inputs[slot] = value;
      if (slot === 0) {
        inputs[1] = value * sellRate;
      } else {
        inputs[0] = value * (1 / sellRate);
      }

      return { ...state, inputs };
    }
    default: {
      // TODO: catch unreduced actions
      return state;
    }

  }
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

const INITIAL_STATE = {
  pockets: {
    GBP: 100,
    USD: 5,
    JPY: 10,
    TRY: 10,
  },
  slots: [
    'GBP', 'USD',
  ],
  inputs: [
    '', '',
  ],
  exchangeRates: {},
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
  dispatch({ type: START_EXCHANGE_RATE_UPDATE_ACTION });
  try {
    const response = await fetch(`${SERVER_URL}${fromCurrency}`, { mode: 'cors' });

    if (response.status >= 400 && response.status < 600) {
      // console.log('bad response');
      throw new Error('Bad response from server');
    } else {
      // console.log('good response');
      const json = await response.json();

      dispatch({ type: FINISH_EXCHANGE_RATE_UPDATE_ACTION, payload: json });
    }
  } catch (error) {
    dispatch({ type: FAIL_EXCHANGE_RATE_UPDATE_ACTION, error });
    // console.log('fail response');
  }
}

export { ExchangeProvider, useExchangeState, useExchangeDispatch, getExchangeRates };
