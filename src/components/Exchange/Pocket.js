import React from 'react';
import styled from 'styled-components';

import { currencySigns } from '../../constants';
import Dropdown from '../Dropdown';

const PocketWrap = styled.div``;
const Input = styled.input.attrs({ type: 'number' })``;
const Balance = styled.div``;

const removeFromArray = (array, toRemoveIdx) =>
  [...array.slice(0, toRemoveIdx), ...array.slice(toRemoveIdx + 1)];

const getSign = (length, seller) => {
  if (!length) { return; }

  return seller ? '-' : '+';
};

const Pocket = ({ children, currency, ddOptions, handleSlotChange, onAmountChange, amountValue, seller }) => {
  return (<PocketWrap>
    <Dropdown
      options={removeFromArray(ddOptions, ddOptions.findIndex(o => o === currency))}
      handleChange={handleSlotChange}
      initialValue={currency}
    >
    </Dropdown>
    {getSign(amountValue, seller)}<Input onChange={onAmountChange} value={amountValue} />
    <Balance>
      Balance: {currencySigns[currency]}{children}
    </Balance>
  </PocketWrap>);
};

export default Pocket;

