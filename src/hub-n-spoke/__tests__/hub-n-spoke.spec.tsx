import * as React from 'react';
import {HubNSpoke} from '..';
import {cleanup, fireEvent, render} from "react-testing-library";
import {mockItems} from "./mock-items";


afterEach(cleanup);

describe('<HubNSpoke />', () => {
  it('renders the HubNSpoke correctly', () => {
    const comp = render(<HubNSpoke items={mockItems} />);
    expect(comp.asFragment()).toMatchSnapshot();
  });

  it('show the edition panel for the clicked hub', () => {
    const comp = render(<HubNSpoke items={mockItems} />);
    const editHub1Button = comp.getByLabelText('edit-hub1');
    fireEvent.click(editHub1Button);
    expect(comp.getByText('this is hub 1 edition form')).toBeDefined();
    expect(comp.asFragment()).toMatchSnapshot();
    fireEvent.click(comp.getByLabelText('close-hub1'));
    expect(comp.getByText('this is hub 2 overview')).toBeDefined();
    expect(comp.asFragment()).toMatchSnapshot();
  });
});
