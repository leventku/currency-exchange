import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { inputFontSize } from '../../constants';

const Select = styled.select`
  appearance: none;
  border: none;
  font-size: 1.1em;
  outline: none;
  color: black;
  font-size: ${inputFontSize}px;
  background-color: white;
  width: 160px;
`;
const DropdownHolder = styled.div`
  display: inline-block;
  position: relative;
  color: black;
  border-radius: 5px;
  &::after {
    content: '▼';
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 0px;
    pointer-events: none;
  }
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

Dropdown.propTypes = {
  handleChange: PropTypes.func,
  initialValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default Dropdown;
