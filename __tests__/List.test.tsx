import React from 'react';
import { shallow, ShallowWrapper } from "enzyme";

import List from '../src/App/List/List';
import BlockSegment from "../src/App/List/BlockSegment/BlockSegment";

const GetBlockResultMock = {
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

describe('List', () => {
    let wrapper: ShallowWrapper<any>;
    const props = {
        loading: false,
        errorMsg: '',
        blockList: []
    };

    beforeEach(() => {
        wrapper = shallow(<List {...props} />);
    });

    test('renders correctly with default props', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('renders correctly with props in loading state', () => {
        wrapper.setProps({...props, loading: true});
        expect(wrapper).toMatchSnapshot();
    });

    test('renders correctly with props in error state', () => {
        wrapper.setProps({...props, errorMsg: 'Error Retrieving Chain Info:'});
        expect(wrapper).toMatchSnapshot();
    });

    test('renders correctly with props containing data', () => {
        wrapper.setProps({...props, blockList: [<BlockSegment key={GetBlockResultMock.id} blockInfo={GetBlockResultMock}/>]});
        expect(wrapper).toMatchSnapshot();
    });
});
