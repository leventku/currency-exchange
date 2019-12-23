import React, { createContext, useReducer, useContext } from 'react';

import {
  SERVER_URL,
  START_EXCHANGE_RATE_UPDATE_ACTION,
  FINISH_EXCHANGE_RATE_UPDATE_ACTION,
  FAIL_EXCHANGE_RATE_UPDATE_ACTION,
  TRIGGER_EXCHANGE_ACTION,
  CHANGE_POCKET_ACTION,
  SWAP_SLOTS_ACTION,
  INPUT_CHANGE_ACTION,
} from '../constants';
import { roundToDecimal } from '../shared';

const ExchangeStateContext = createContext();
const ExchangeDispatchContext = createContext();

export function exchangeReducer (state, action) {
  switch (action.type) {
    case TRIGGER_EXCHANGE_ACTION: {
      const sellCurrency = state.slots[0];
      const buyCurrency = state.slots[1];
      const sellPocketBalance = state.pockets[sellCurrency];
      const buyPocketBalance = state.pockets[buyCurrency];

      const sellPocket = { [sellCurrency]: sellPocketBalance - state.inputs[0] };
      const buyPocket = { [buyCurrency]: buyPocketBalance + state.inputs[1] };

      return { ...state, pockets: { ...state.pockets, ...sellPocket, ...buyPocket } };
    }
    case CHANGE_POCKET_ACTION : {
      // rate changes
      // changed pocket input value should be constant
      // other pocket input value should be re calculated
      const { slotIdx, newPocketCurrency } = action.payload;
      const slots = Array.from(state.slots);
      const inputs = Array.from(state.inputs);
      const inputValue = state.inputs[slotIdx];

      slots[slotIdx] = newPocketCurrency;

      inputs[slotIdx] = parseFloat(inputValue);
      if (slotIdx === 1) {
        const sellRate = state.exchangeRates[slots[1]];

        inputs[0] = parseFloat((parseFloat(inputValue) * (1 / sellRate)).toFixed(2));
      }

      return { ...state, slots, inputs };
    }
    case FINISH_EXCHANGE_RATE_UPDATE_ACTION: {
      // refresh input[1] as the new exchangeRates arrive
      const inputs = [...state.inputs];

      inputs[1] = parseFloat((inputs[0] * action.payload.rates[state.slots[1]]).toFixed(2));

      return { ...state, exchangeRates: action.payload.rates, inputs };
    }
    case SWAP_SLOTS_ACTION: {
      const slots = Array.from(state.slots);
      const inputs = Array.from(state.inputs);

      slots.reverse();
      inputs.reverse();

      return { ...state, slots, inputs };
    }

    case INPUT_CHANGE_ACTION: {
      const { slot, value } = action.payload;

      const inputs = Array.from(state.inputs);
      const sellRate = state.exchangeRates[state.slots[1]];

      inputs[slot] = parseFloat(value);
      if (slot === 0) {
        inputs[1] = parseFloat((parseFloat(value) * sellRate).toFixed(2));
      } else {
        inputs[0] = parseFloat((parseFloat(value) * (1 / sellRate)).toFixed(2));
      }

      return { ...state, inputs };
    }
    default: {
      // TODO: catch unreduced actions
      return state;
    }

  }
}

export const INITIAL_STATE = {
  pockets: {
    GBP: 100,
    USD: 5,
    EUR: 10,
    TRY: 10,
  },
  slots: [
    'GBP', 'USD',
  ],
  inputs: [
    0, 0,
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
      throw new Error('Bad response from server');
    } else {
      const json = await response.json();

      dispatch({ type: FINISH_EXCHANGE_RATE_UPDATE_ACTION, payload: json });
    }
  } catch (error) {
    dispatch({ type: FAIL_EXCHANGE_RATE_UPDATE_ACTION, error });
  }
}

export { ExchangeProvider, useExchangeState, useExchangeDispatch, getExchangeRates };
