import { mount } from 'enzyme';
import Login from '../../pages/login';

describe('Page: Login', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Login />);
  });

  it('should display Login', () => {
    expect(wrapper.text()).toContain('Login');
  });

  it('should display link to home page', () => {
    const IndexLink = wrapper.find('Link').at(0)
    expect(IndexLink.props().href).toBe('/home')
    expect(IndexLink.text()).toBe('Home');
  });

  it('should display link to landing page', () => {
    const IndexLink = wrapper.find('Link').at(1)
    expect(IndexLink.props().href).toBe('/')
    expect(IndexLink.text()).toBe('Next Auth');
  });
});