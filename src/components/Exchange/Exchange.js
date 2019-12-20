import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { useExchangeState, useExchangeDispatch, getExchangeRates } from '../../contexts/ExchangeContext';
import Pocket from './Pocket';
import { CHANGE_POCKET_ACTION, SWAP_SLOTS_ACTION, INPUT_CHANGE_ACTION, TRIGGER_EXCHANGE_ACTION } from '../../constants';
import { roundToDecimal } from '../../shared';

const Title = styled.h1``;
const Button = styled.button``;
const Rate = styled.span``;

const Exchange = () => {
  const { pockets, slots, exchangeRates, inputs } = useExchangeState();
  const dispatch = useExchangeDispatch();

  const ddOptions = Object.keys(pockets);

  const handleAmountChange = useCallback(slot => (e) => {
    if (e.target.value === '') {
      e.target.value = 0;
    }
    dispatch({ type: INPUT_CHANGE_ACTION, payload: { slot, value: e.target.value } });
  }, [dispatch]);

  useEffect(() => {
    getExchangeRates(dispatch, slots[0]);

    const intervalId = setInterval(() => { getExchangeRates(dispatch, slots[0]); }, 10000);

    return function cleanup () {
      clearInterval(intervalId);
    };
  }, [dispatch, slots]);

  const handleSwapSlots = () => {
    dispatch({ type: SWAP_SLOTS_ACTION });
  };

  const handleSlotChange = (slot) => (e) => {
    const newPocket = e.target.value;

    if (newPocket === slots[slot === 0 ? 1 : 0]) {
      handleSwapSlots();
    } else {
      dispatch({
        type: CHANGE_POCKET_ACTION,
        payload: { slot, value: newPocket },
      });
    }
  };

  const canTriggerExchange = () => pockets[slots[0]] > inputs[0];

  const triggerExchange = () => {
    dispatch({ type: TRIGGER_EXCHANGE_ACTION });
  };

  return (
    <>
      <Title>Exchange</Title>

      {slots.map((slot, index) => (
        <Pocket
          key={index}
          ddOptions={ddOptions}
          handleSlotChange={handleSlotChange(index)}
          currency={slots[index]}
          isSeller={index === 0}
          onAmountChange={handleAmountChange(index)}
          amountValue={inputs[index]}
        >
          {pockets[slots[index]]}
        </Pocket>
      ))}

      <Button onClick={handleSwapSlots}>↕</Button>
      <Rate>
        {
          exchangeRates[slots[1]]
            ? roundToDecimal(exchangeRates[slots[1]], 4)
            : ''
        }
      </Rate>

      <Button disabled={!canTriggerExchange()} onClick={triggerExchange}>Exchange</Button>
    </>
  );
};

export default Exchange;
