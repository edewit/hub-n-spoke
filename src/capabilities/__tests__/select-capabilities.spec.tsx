import * as React from 'react';
import {cleanup, render} from "react-testing-library";
import capabilities from '../../data-examples/capabilities.json';
import {SelectCapabilities} from "../select-capabilities";

afterEach(cleanup);

describe('<SelectCapabilities />', () => {
  it('renders the SelectCapabilities correctly', () => {
    const comp = render(<SelectCapabilities items={capabilities} />);
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
