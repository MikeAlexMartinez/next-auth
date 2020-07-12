import { mount } from 'enzyme';
import Home from '../../pages/home';

describe('Page: Home', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Home />);
  });

  it('should display Home', () => {
    expect(wrapper.text()).toContain('Home');
  });

  it('should display link to index page', () => {
    const IndexLink = wrapper.find('Link').at(0)
    expect(IndexLink.props().href).toBe('/')
    expect(IndexLink.text()).toBe('Next Auth');
  });

  it('should display link to login page', () => {
    const IndexLink = wrapper.find('Link').at(1)
    expect(IndexLink.props().href).toBe('/login')
    expect(IndexLink.text()).toBe('Login');
  });
});
