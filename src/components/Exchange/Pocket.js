import React from 'react';
import styled from 'styled-components';

import Dropdown from '../Dropdown';

const PocketWrap = styled.div``;
const Input = styled.input.attrs({ type: 'number' })``;
const Balance = styled.div``;

const removeFromArray = (array, toRemoveIdx) =>
  [...array.slice(0, toRemoveIdx), ...array.slice(toRemoveIdx + 1)];

const Pocket = ({ children, currency, ddOptions, handleSlotChange }) => (<PocketWrap>
  <Dropdown
    options={removeFromArray(ddOptions, ddOptions.findIndex(o => o === currency))}
    handleChange={handleSlotChange}
    initialValue={currency}
  >
  </Dropdown>
  <Input />
  <Balance>
    {children}
  </Balance>
</PocketWrap>);

export default Pocket;

