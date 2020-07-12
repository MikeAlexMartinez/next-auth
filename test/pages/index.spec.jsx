import { mount } from 'enzyme';
import IndexPage from '../../pages/index';

describe('Page: Index', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<IndexPage />);
  });

  it('should render Head with `Next Auth` title', () => {
    const Head = wrapper.find('Head');
    const Component = Head.find('Component');
    const title = Component.props().children[0]
    expect(title.type).toBe('title');
    expect(title.props.children).toBe('Next Auth');
  });

  it('should render title', () => {
    const h1 = wrapper.find('h1.title');
    expect(h1.text()).toContain('Welcome to Next.js Auth!');
  });

  it('should render Link to home page', () => {
    const IndexLink = wrapper.find('Link').at(0);
    expect(IndexLink.props().href).toBe('/home');
    expect(IndexLink.text()).toBe('Home');
  });

  it('should render Link to login page', () => {
    const IndexLink = wrapper.find('Link').at(1);
    expect(IndexLink.props().href).toBe('/login');
    expect(IndexLink.text()).toBe('Login');
  });
})