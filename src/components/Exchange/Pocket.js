import React from 'react';
import styled from 'styled-components';

import { currencySigns } from '../../constants';
import Dropdown from '../Dropdown';

const PocketWrap = styled.div``;
const Input = styled.input.attrs({ type: 'number' })``;
const Balance = styled.p`
  color: ${p => p.insufficient ? 'red' : 'normal'};
`;

const removeFromArray = (array, toRemoveIdx) =>
  [...array.slice(0, toRemoveIdx), ...array.slice(toRemoveIdx + 1)];

const getSign = (length, seller) => {
  if (!length) { return; }

  return seller ? '-' : '+';
};

const checkSufficient = (pocketValue, amountValue) => pocketValue < amountValue;

const Pocket = ({ children, currency, ddOptions, handleSlotChange, onAmountChange, amountValue, isSeller }) => {
  return (<PocketWrap>
    <Dropdown
      options={removeFromArray(ddOptions, ddOptions.findIndex(o => o === currency))}
      handleChange={handleSlotChange}
      initialValue={currency}
    >
    </Dropdown>
    {getSign(amountValue, isSeller)}
    <Input
      onChange={onAmountChange}
      value={amountValue}
      onFocus={e=>{ e.target.value === '0' && e.target.select(); }}
    />
    <Balance insufficient={isSeller && checkSufficient(children, amountValue)}>
      Balance: {currencySigns[currency]}{children}
    </Balance>
  </PocketWrap>);
};

export default Pocket;

