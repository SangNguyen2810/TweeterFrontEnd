
import React from 'react';
import {mount,shallow} from 'enzyme';
import Dashboard from '../containers/Dashboard';
describe('Dashboard component', () => {
  it('should have splitMessage', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.instance().splitMessage().equals(true));
  });
});