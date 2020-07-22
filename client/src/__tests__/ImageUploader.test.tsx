import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageUploader from '../components/ImageUploader/ImageUploader';

configure({ adapter: new Adapter() })

describe('Create ImageUploader', () => {
  it('should render imageuploader component renderly', () => {
    const wrapper = shallow(<ImageUploader />)
    expect(wrapper).toMatchSnapshot();
  });
});