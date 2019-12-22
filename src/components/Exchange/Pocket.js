import React, { useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

import { currencySigns, inputFontSize } from '../../constants';
import { removeFromArray } from '../../shared';
import Dropdown from '../Dropdown';

const PocketWrap = styled.div`
  margin: 50px 0;
`;
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const MinusPlus = styled.span`
  font-size: ${inputFontSize}px;
`;
const Input = styled.input.attrs({ type: 'number' })`
  border:none;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
  ::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
  }
  ::-webkit-outer-spin-button{
      -webkit-appearance: none;
      margin: 0;
  }
  font-size: ${inputFontSize}px;
  width: auto;
  width: 3ch;
  text-align: right;
  color: ${p => p.value === 0 ? '#8C959C' : 'normal'};
`;
const Balance = styled.p`
  color: ${p => p.insufficient ? '#EB008D' : '#8C959C'};
  font-size: 24px;
`;

const checkSufficient = (pocketValue, amountValue) => pocketValue < amountValue;

const handleFocus = e => { (parseFloat(e.target.value)) === 0 && e.target.select(); };

const getSign = (length, isSeller) => {
  if (!length) { return; }

  return isSeller ? '-' : '+';
};

const Pocket = ({ children, currency, ddOptions, onChange, onAmountChange, amountValue, isSeller, index }) => {
  useEffect(() => {
    const { current } = inputRef;

    current.style.width = `${current.value.length + 0.5}ch`;
  }, [amountValue]);

  const inputRef = useRef();

  const dropdown = useMemo(() => (<Dropdown
    options={removeFromArray(ddOptions, ddOptions.findIndex(o => o === currency))}
    handleChange={onChange}
    initialValue={currency}
    // we can keep the same rendered component as long as initialValue is the same.
    /* eslint-disable-next-line */
  />), [currency]);

  return (<PocketWrap>
    <Controls>
      {dropdown}
      <div>
        <MinusPlus>
          {getSign(amountValue, isSeller)}
        </MinusPlus>
        <Input
          label={`slot-${index}`}
          onChange={onAmountChange}
          value={isNaN(amountValue) ? '0' : amountValue}
          onFocus={handleFocus}
          onKeyUp={handleFocus}
          ref={inputRef}
        />
      </div>
    </Controls>
    <Balance insufficient={isSeller && checkSufficient(children, amountValue)}>
      Balance: {currencySigns[currency] + children.toFixed(2)}
    </Balance>
  </PocketWrap>);
};

export default Pocket;

