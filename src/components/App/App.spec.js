
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import App from './index';

fit('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
