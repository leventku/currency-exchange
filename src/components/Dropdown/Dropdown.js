import React from 'react';
import styled from 'styled-components';

import { inputFontSize } from '../../constants';

const Select = styled.select`
  appearance: none;
  border: none;
  font-size: 1.1em;
  outline: none;
  color: black;
  font-size: ${inputFontSize}px;
`;
const DropdownHolder = styled.div`
  display: inline-block;
  color: black;
  border-radius: 5px;
`;
const Dropdown = ({ initialValue, options, handleChange }) => {
  return (
    <DropdownHolder>
      <Select defaultValue="default"
        onChange={handleChange}
      >
        <option value="default">{initialValue}</option>
        {options.map((val, index) => (
          <option key={index + Math.random()} value={val}>{val}</option>
        ))}
      </Select>
    </DropdownHolder>
  );
};

export default Dropdown;
