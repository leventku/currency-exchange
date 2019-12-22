
import { exchangeReducer, INITIAL_STATE } from './ExchangeContext';

import {
  START_EXCHANGE_RATE_UPDATE_ACTION,
  FINISH_EXCHANGE_RATE_UPDATE_ACTION,
  FAIL_EXCHANGE_RATE_UPDATE_ACTION,
  TRIGGER_EXCHANGE_ACTION,
  CHANGE_POCKET_ACTION,
  SWAP_SLOTS_ACTION,
  INPUT_CHANGE_ACTION,
} from '../constants';

import expect from 'expect';

describe('exchangeReducer', () => {
  it('should swap slots and inputs values when SWAP_SLOTS_ACTION kicks in', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [1, 2],
    };
    const outOfReducer = {
      slots: ['b', 'a'],
      inputs: [2, 1],
    };

    expect(exchangeReducer(intoReducer, { type: SWAP_SLOTS_ACTION }))
      .toEqual(outOfReducer);

  });
  it('should assign new slot and input values when INPUT_CHANGE_ACTION kicks in. change 1st slot', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [0, 0],
      exchangeRates: { a: 1, b: 1.1 },
    };
    const outOfReducer = {
      slots: ['a', 'b'],
      inputs: [10.91, 12],
      exchangeRates: { a: 1, b: 1.1 },
    };

    expect(exchangeReducer(intoReducer, { type: INPUT_CHANGE_ACTION, payload: { slot: 0, value: 10.91 } }))
      .toEqual(outOfReducer);
  });
  it('should assign new slot and input values when INPUT_CHANGE_ACTION kicks in. change 2nd slot', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [0, 0],
      exchangeRates: { a: 1, b: 1.1 },
    };
    const outOfReducer = {
      slots: ['a', 'b'],
      inputs: [10.91, 12],
      exchangeRates: { a: 1, b: 1.1 },
    };

    expect(exchangeReducer(intoReducer, { type: INPUT_CHANGE_ACTION, payload: { slot: 1, value: 12 } }))
      .toEqual(outOfReducer);
  });
  it('should assign new slot and input values when CHANGE_POCKET_ACTION kicks in. change 1nd slot', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [1, 2],
      exchangeRates: { a: 1, b: 1.1, c: 1.3 },
    };
    const outOfReducer = {
      slots: ['a', 'c'],
      inputs: [1.54, 2],
      exchangeRates: { a: 1, b: 1.1, c: 1.3 },
    };

    expect(exchangeReducer(intoReducer, {
      type: CHANGE_POCKET_ACTION, payload: { slotIdx: 1, value: 'c' } }))
      .toEqual(outOfReducer);
  });
});
