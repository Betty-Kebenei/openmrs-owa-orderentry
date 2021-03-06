import React from 'react';

import { SearchAndAddOrder } from '../../../app/js/components/orderEntry/SearchAndAddOrder';
import store from '../../../app/js/redux-store';

const props = {
  outpatientCareSetting:{
    uuid:{}
  },
  inpatientCareSetting: {
    uuid: {}
  },
  getPastOrders: jest.fn(),
  location:{
    search:()=>{}
  },
  fetchInpatientCareSetting: jest.fn(),
  fetchOutpatientCareSetting: jest.fn(),
  drug: "abc-e345-thed-uuid2345",
};

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    const wrapper = shallow(<SearchAndAddOrder {...props} />  );
    expect(wrapper).toMatchSnapshot()
  });
});
