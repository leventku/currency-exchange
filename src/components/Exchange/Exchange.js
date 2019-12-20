import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useExchangeState, useExchangeDispatch, getExchangeRates } from '../../contexts/ExchangeContext';
import Pocket from './Pocket';
import { CHANGE_POCKET_ACTION, SWAP_SLOTS_ACTION } from '../../constants';

const Title = styled.h1``;
const Button = styled.button``;
const Rate = styled.span``;

const roundToDecimal = (number, afterDecimalCount) => Math.round(number * 10 ** afterDecimalCount) / (10 ** afterDecimalCount);

const Exchange = () => {
  const { pockets, slots, exchangeRates } = useExchangeState();
  const dispatch = useExchangeDispatch();

  const ddOptions = Object.keys(pockets);

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
    const newPocket = e.currentTarget.value;
    const otherSlot = (slot + 1) % 2;

    if (newPocket === slots[otherSlot]) {
      handleSwapSlots();
    } else {
      dispatch({
        type: CHANGE_POCKET_ACTION,
        payload: { slot, value: newPocket },
      });
    }
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

      <Button>Exchange</Button>
    </>
  );
};

export default Exchange;
