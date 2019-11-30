import React from 'react';
import { shallow, ShallowWrapper } from "enzyme";

import Header from '../src/App/Header/Header';

describe('Header', () => {
    let wrapper: ShallowWrapper<any>;
    const props = {
        loading: false,
        loadBlockInformation: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<Header {...props} />);
    });

    test('renders correctly with default props', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('renders correctly with props in loading state', () => {
        wrapper.setProps({...props, loading: true});
        expect(wrapper).toMatchSnapshot();
    });

    test('fires function on load button click', () => {
        const button = wrapper.find('[data-testid="loadButton"]');
        button.simulate('click');
        expect(props.loadBlockInformation).toHaveBeenCalled();
    });
});