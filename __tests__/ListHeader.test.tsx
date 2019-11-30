import React from 'react';
import { shallow, ShallowWrapper } from "enzyme";

import ListHeader from '../src/App/List/ListHeader/ListHeader';

describe('ListHeader', () => {
    let wrapper: ShallowWrapper<any>;

    beforeEach(() => {
        wrapper = shallow(<ListHeader />);
    });

    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});