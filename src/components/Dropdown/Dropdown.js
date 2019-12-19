import React from 'react';
import styled from 'styled-components';

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
const Dropdown = ({ children, options, handleChange }) => {
  return (
    <DropdownHolder>
      <Select defaultValue="default"
        onChange={handleChange}
      >
        <option value="default">{children}</option>
        {options.map((val, index) => (
          <option key={index + Math.random()} value={val}>{val}</option>
        ))}
      </Select>
    </DropdownHolder>
  );
};

export default Dropdown;
