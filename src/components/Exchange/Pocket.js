import React, { useEffect, useRef } from 'react';
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
const Input = styled.input`
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
  max-width: 400px;
  width: 3ch;
  text-align: right;
  color: ${p => p.value === 0 ? '#8C959C' : 'black'};
`;
const Balance = styled.p`
  color: ${p => p.insufficient ? '#EB008D' : '#8C959C'};
  font-size: 24px;
`;

const checkSufficient = (pocketValue, amountValue) => pocketValue < amountValue;

const validateInput = (value) => {
  const arr = /^(\d*)\.(\d*)$/.exec(value);

  if (!arr) { return value; }

  const decimal = arr[2];

  if (decimal && decimal.length > 2) {
    return parseFloat(value).toFixed(2);
  }

  return value;
};

const handleFocus = e => { (parseFloat(e.target.value)) === 0 && e.target.select(); };

const handleKeyDown = amountChange => e => {
  e.target.value = validateInput(e.target.value);
  amountChange(e.target.value);
};

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

  return (<PocketWrap>
    <Controls>
      <Dropdown
        options={removeFromArray(ddOptions, ddOptions.findIndex(o => o === currency))}
        handleChange={onChange}
        initialValue={currency}
      />
      <div>
        <MinusPlus>
          {getSign(amountValue, isSeller)}
        </MinusPlus>
        <Input
          min="0"
          value="0"
          type="number"
          data-testid={`pocketInput-${index}`}
          onChange={handleKeyDown(onAmountChange)}
          onFocus={handleFocus}
          value={isNaN(amountValue) ? '0' : amountValue}
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

