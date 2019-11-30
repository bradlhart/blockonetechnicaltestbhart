import React from 'react';
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent, getByTestId} from "@testing-library/react";

import BlockSegment  from '../src/App/List/BlockSegment/BlockSegment';

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

describe('BlockSegment', () => {
    let wrapper: ShallowWrapper<any>;
    const props = {
        blockInfo: GetBlockResultMock
    };

    beforeEach(() => {
        wrapper = shallow(<BlockSegment {...props} />);
    });

    test('renders correctly with default props (without transactions)', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('renders correctly with default props (with transactions)', () => {
        const blockInfo = props.blockInfo.transactions = [{}];
        wrapper.setProps({...props, blockInfo});
        expect(wrapper).toMatchSnapshot();
    });

    test('expands raw data container when clicking on row', () => {
        const props = {
            blockInfo: GetBlockResultMock
        };

        const { container } = render(<BlockSegment {...props} />);
        const rowContainer = getByTestId(container, "rowContainer");
        expect(rowContainer.children.length).toEqual(1);
        fireEvent.click(rowContainer);
        expect(rowContainer.children.length).toEqual(2);
        fireEvent.click(rowContainer);
        expect(rowContainer.children.length).toEqual(1);
    });
});