import React from 'react';
import styled from 'styled-components';

import { useExchangeState } from '../../contexts/ExchangeContext';
import Dropdown from '../Dropdown';

const Title = styled.h1``;
const Pocket = styled.div``;
const Button = styled.button``;
const Rate = styled.span``;
const Input = styled.input.attrs({ type: 'number' })``;
const Balance = styled.div``;

const Exchange = () => {
  const { pockets, slots, exchangeRate } = useExchangeState();

  const ddOptions = Object.keys(pockets);

  return (
    <>
      <Title>Exchange</Title>
      <Pocket currency={slots[0]}>
        <Dropdown options={ddOptions} action={{ type: 'pocketChange' }}>{slots[0]}</Dropdown>
        <Input></Input>
        <Balance>
          {pockets[slots[0]].balance}
        </Balance>
      </Pocket>

      <Button>&#8597;</Button>
      <Rate>{exchangeRate}</Rate>

      <Pocket currency={slots[1]}>
        <Dropdown options={ddOptions} action={{ type: 'pocketChange' }}>{slots[1]}</Dropdown>
        <Input></Input>
        <Balance>
          {pockets[slots[1]].balance}
        </Balance>
      </Pocket>

      <Button>Exchange</Button>
    </>
  );
};

export default Exchange;
