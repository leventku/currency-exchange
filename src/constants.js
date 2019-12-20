
// export const SERVER_URL = 'https://api.exchangerate-api.com/v4/latest/';
export const SERVER_URL = 'https://api.exchangeratesapi.io/latest?base=';

export const currencySigns = {
  GBP: '£',
  USD: '$',
  JPY: '¥',
  TRY: '₺',
};

// Data fetching action types
export const START_EXCHANGE_RATE_UPDATE_ACTION = 'START_EXCHANGE_RATE_UPDATE';
export const FINISH_EXCHANGE_RATE_UPDATE_ACTION = 'FINISH_EXCHANGE_RATE_UPDATE';
export const FAIL_EXCHANGE_RATE_UPDATE_ACTION = 'FAIL_EXCHANGE_RATE_UPDATE';

// App action types
export const TRIGGER_EXCHANGE = 'TRIGGER_EXCHANGE';
export const CHANGE_POCKET_ACTION = 'CHANGE_POCKET';
export const SWAP_SLOTS_ACTION = 'SWAP_SLOTS';
export const INPUT_CHANGE_ACTION = 'INPUT_CHANGE';
