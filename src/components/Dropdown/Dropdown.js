import React from 'react';

import styled from 'styled-components';

import { useExchangeDispatch } from '../../contexts/ExchangeContext';

const Select = styled.select`
  appearance: none;
  border: none;
  font-size: 1.1em;
  outline: none;
  color: black;
  padding: 6px;
`;
const DropdownHolder = styled.div`
  display: inline-block;
  color: black;
  border-radius: 5px;
  ::after {
    content: '▼';
    display: inline-block;
    padding-right: 6px;
  }
`;
const Dropdown = ({ children, options, action }) => {
  const dispatch = useExchangeDispatch();

  return (
    <DropdownHolder>
      <Select defaultValue="default"
        onChange={(e) => {
          dispatch({ type: action.type, payload: e.currentTarget.value });
        }}
      >
        <option value="default" disabled>{children}</option>
        {options.map(val => (
          <option key={val} value={val}>{val[0].toUpperCase() + val.substr(1)}</option>
        ))}
      </Select>
    </DropdownHolder>
  );
};

export default Dropdown;
