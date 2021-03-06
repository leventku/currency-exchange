import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { useExchangeState, useExchangeDispatch, getExchangeRates } from '../../contexts/ExchangeContext';
import Pocket from './Pocket';
import { CHANGE_POCKET_ACTION, SWAP_SLOTS_ACTION, INPUT_CHANGE_ACTION, TRIGGER_EXCHANGE_ACTION, currencySigns } from '../../constants';

const ExchangeWrap = styled.div`
  position:relative;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  width: 720px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Title = styled.h1`
  font-size: 36px;
  height: 5%;
  position: absolute;
`;

const MiddleControls = styled.section`
  font-size: 26px;
  position: absolute;
  top: 35%;
  width: 100%;
`;

const SwapSlotButton = styled.button`
  display: inline-block;
  color: #0074E8;
  border: none;
  font-size: 20px;
`;

const PocketWrap = styled.div`
  height: 20%;
  margin-top: 80px;
`;

const ExchangeButton = styled.button`
  background-color: #EB008D;
  width: 90%;
  height: 85px;
  border-radius: 40px;
  font-size: 28px;
  color: #FFFCFF;
  box-shadow: 5px 15px 21px #eb008d40;
  margin: 100px 0;
  &:disabled {
    background-color: #e89ecb;
  }
`;
const Rate = styled.div`
  color: #0074E8;
  position: absolute;
  left: calc(50% - 8ch);
  top: 0;
`;
const BottomControls = styled.section`
  display: flex;
  justify-content: center;
  height: 20%;
`;

const Exchange = () => {
  const { pockets, slots, exchangeRates, inputs } = useExchangeState();
  const dispatch = useExchangeDispatch();

  const ddOptions = Object.keys(pockets);

  const handleAmountChange = useCallback(slot => (value) => {
    dispatch({ type: INPUT_CHANGE_ACTION, payload: { slot, value } });

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

  const handlePocketChange = (slotIdx) => (e) => {
    const newPocketCurrency = e.target.value;

    if (newPocketCurrency === slots[slotIdx === 0 ? 1 : 0]) {
      handleSwapSlots();
    } else {
      dispatch({
        type: CHANGE_POCKET_ACTION,
        payload: { slotIdx, newPocketCurrency },
      });
    }
  };

  const canTriggerExchange = () => inputs[0] > 0 && pockets[slots[0]] >= inputs[0];

  const triggerExchange = () => {
    dispatch({ type: TRIGGER_EXCHANGE_ACTION });
  };

  return (
    <ExchangeWrap>
      <Title>Exchange</Title>

      {slots.map((slot, index) => (
        <PocketWrap key={`${index}${slot}}`}>
          <Pocket
            ddOptions={ddOptions}
            onChange={handlePocketChange(index)}
            currency={slots[index]}
            isSeller={index === 0}
            onAmountChange={handleAmountChange(index)}
            amountValue={inputs[index]}
            index={index}
          >
            {pockets[slots[index]]}
          </Pocket>
        </PocketWrap>
      	))}

      <MiddleControls>
        <SwapSlotButton onClick={handleSwapSlots}>⇅</SwapSlotButton>
        <Rate data-testid="exchangeRate">
          ↗ {currencySigns[slots[0]]}1 = {currencySigns[slots[1]]}
          {
            exchangeRates[slots[1]]
              ? (exchangeRates[slots[1]]).toFixed(4)
              : ''
          }
        </Rate>
      </MiddleControls>

      <BottomControls>
        <ExchangeButton disabled={!canTriggerExchange()} onClick={triggerExchange}>Exchange</ExchangeButton>
      </BottomControls>
    </ExchangeWrap>
  );
};

export default Exchange;
