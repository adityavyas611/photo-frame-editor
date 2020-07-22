import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Editor from '../components/Editor/Editor';

configure({ adapter: new Adapter() })

describe('Create Editor', () => {
  it('should render editor component properly', () => {
    const wrapper = shallow(<Editor imgData={{}} imgUrl="" />)
    expect(wrapper).toMatchSnapshot();
  });
});