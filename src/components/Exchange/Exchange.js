import React, {useEffect} from 'react';
import styled from 'styled-components';

import { useExchangeState, useExchangeDispatch, getExchangeRates } from '../../contexts/ExchangeContext';
import Dropdown from '../Dropdown';
import {CHANGE_POCKET_ACTION, SWAP_SLOTS_ACTION} from '../../constants';

const Title = styled.h1``;
const Pocket = styled.div``;
const Button = styled.button``;
const Rate = styled.span``;
const Input = styled.input.attrs({ type: 'number' })``;
const Balance = styled.div``;
const Currency = styled.span``;

const Exchange = () => {
  const { pockets, slots, exchangeRates } = useExchangeState();
  const dispatch = useExchangeDispatch();

  const ddOptions = Object.keys(pockets);


  useEffect(() => {
    getExchangeRates(dispatch, slots[0])
    const intervalId = setInterval(() => {getExchangeRates(dispatch, slots[0])}, 10000);

    return function cleanup () {
      clearInterval(intervalId);
    }
  }, [slots[0]]);

  const handleSwapSlots = () => {
    const newSlots = [...slots];
    dispatch({ type: SWAP_SLOTS_ACTION });
  };

  const handleSlotChange = (slot) => (e) => {
    dispatch({
      type: CHANGE_POCKET_ACTION,
      payload: {slot, value: e.currentTarget.value}
    });
  };

  return (
    <>
      <Title>Exchange</Title>
      <Pocket>
        <Currency>{slots[0]}</Currency>
        <Dropdown
          options={ddOptions}
          handleChange={handleSlotChange(0)}
        >
          {slots[0]}
        </Dropdown>
        <Input />
        <Balance>
          {pockets[slots[0]]}
        </Balance>
      </Pocket>

      <Button onClick={handleSwapSlots}>↕</Button>
      <Rate>{exchangeRates[slots[1]]}</Rate>

      <Pocket>
        <Currency>{slots[1]}</Currency>
        <Dropdown
          options={ddOptions}
          action={{ type: CHANGE_POCKET_ACTION, payload: {slot: 1} }}
          dispatch={dispatch}
          handleChange={handleSlotChange(1)}
        >
          {slots[1]}
        </Dropdown>
        <Input />
        <Balance>
          {pockets[slots[1]]}
        </Balance>
      </Pocket>

      <Button>Exchange</Button>
    </>
  );
};

export default Exchange;
