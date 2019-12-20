import React from 'react';
import styled from 'styled-components';

import { currencySigns } from '../../constants';
import { removeFromArray, getSign } from '../../shared';
import Dropdown from '../Dropdown';

const PocketWrap = styled.div``;
const Input = styled.input.attrs({ type: 'number' })``;
const Balance = styled.p`
  color: ${p => p.insufficient ? 'red' : 'normal'};
`;

const checkSufficient = (pocketValue, amountValue) => pocketValue < amountValue;

const handleFocus = e => { (parseFloat(e.target.value)) === 0 && e.target.select(); };

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
      onFocus={handleFocus}
      onKeyUp={handleFocus}
    />
    <Balance insufficient={isSeller && checkSufficient(children, amountValue)}>
      Balance: {currencySigns[currency]}{children}
    </Balance>
  </PocketWrap>);
};

export default Pocket;

