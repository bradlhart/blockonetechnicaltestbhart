import React from 'react';
import { mount, shallow, ShallowWrapper } from "enzyme";

import App, { propagateBlockNumberList } from '../src/App/App';

jest.mock('../src/App/rpc', () => ({
  rpcGetBlock: () => {
    return {
      timestamp: "timestamp",
      producer: "producer",
      confirmed: 0,
      previous: "previous",
      transaction_mroot: "transaction_mroot",
      action_mroot: "action_mroot",
      schedule_version: 0,
      producer_signature: "producer_signature",
      id: "id",
      block_num: 0,
      ref_block_prefix: 0,
    };
  },
  rpcGetInfo: () => {
    return { last_irreversible_block_num: 9};
  }
}));

describe('App', () => {
  let wrapper: ShallowWrapper<any>;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('loadBlockInformation', async () => {
    const container = mount(<App />);
    container.find('[data-testid="loadButton"]').simulate('click');


  });
});

describe('propagateBlockNumberList', () => {
  test('no lastBlockNum, full load', () => {
    const expected = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const result = propagateBlockNumberList(undefined, 9, 10);
    expect(result).toEqual(expected);
  });

  test('lastBlockNum, partial load', () => {
    const expected = [9, 8, 7];
    const result = propagateBlockNumberList(6, 9, 10);
    expect(result).toEqual(expected);
  });
});
