
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
  it('should assign new slot and input values when CHANGE_POCKET_ACTION kicks in. change 2nd slot', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [1, 1.1],
      exchangeRates: { a: 1, b: 1.1, c: 1.3 },
    };
    const outOfReducer = {
      slots: ['a', 'c'],
      inputs: [0.85, 1.1], // 1.2/1.3 = 0.92
      exchangeRates: { a: 1, b: 1.1, c: 1.3 },
    };

    expect(exchangeReducer(intoReducer, {
      type: CHANGE_POCKET_ACTION, payload: { slotIdx: 1, newPocketCurrency: 'c' } }))
      .toEqual(outOfReducer);
  });
  it('should assign new slot and input values when CHANGE_POCKET_ACTION kicks in. change 1st slot', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [1, 1.2],
      exchangeRates: { a: 1, b: 1.1, c: 1.3 },
    };
    const outOfReducer = {
      slots: ['c', 'b'],
      inputs: [1, 0], // comes 1 as from previous value to be updated
      exchangeRates: { a: 1, b: 1.1, c: 1.3 },
    };

    expect(exchangeReducer(intoReducer, {
      type: CHANGE_POCKET_ACTION, payload: { slotIdx: 0, newPocketCurrency: 'c' } }))
      .toEqual(outOfReducer);
  });
  it('should update rates and input[1] with new rate when FINISH_EXCHANGE_RATE_UPDATE_ACTION kicks in', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [1, 1.2],
      exchangeRates: { a: 1, b: 1.1, c: 1.3 },
    };
    const outOfReducer = {
      slots: ['a', 'b'],
      inputs: [1, 1.4],
      exchangeRates: { a: 1, b: 1.4, c: 1.2 },
    };

    expect(exchangeReducer(intoReducer, {
      type: FINISH_EXCHANGE_RATE_UPDATE_ACTION,
      payload: {
        rates: { a: 1, b: 1.4, c: 1.2 },
      },
    }))
      .toEqual(outOfReducer);
  });
  it('should swap slots and inputs when SWAP_SLOTS_ACTION kicks in', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [1, 1.2],
    };
    const outOfReducer = {
      slots: ['b', 'a'],
      inputs: [1.2, 1],
    };

    expect(exchangeReducer(intoReducer, {
      type: SWAP_SLOTS_ACTION,
    }))
      .toEqual(outOfReducer);
  });
  it('should update other input when INPUT_CHANGE_ACTION kicks in', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      inputs: [1, 1.2],
      exchangeRates: { a: 1, b: 1.2 },
    };
    const outOfReducer = {
      slots: ['a', 'b'],
      inputs: [10, 12],
      exchangeRates: { a: 1, b: 1.2 },
    };

    expect(exchangeReducer(intoReducer, {
      type: INPUT_CHANGE_ACTION,
      payload: {
        slot: 0,
        value: 10,
      },
    }))
      .toEqual(outOfReducer);
  });
  it('should update active pockets and reset inputs after TRIGGER_EXCHANGE_ACTION kicks in', () => {
    const intoReducer = {
      slots: ['a', 'b'],
      pockets: { a: 10, b: 20 },
      inputs: [1, 1.2],
    };
    const outOfReducer = {
      slots: ['a', 'b'],
      pockets: { a: 9, b: 21.2 },
      inputs: [0, 0],
    };

    expect(exchangeReducer(intoReducer, {
      type: TRIGGER_EXCHANGE_ACTION,
    }))
      .toEqual(outOfReducer);
  });
});
