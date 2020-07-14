import { mount } from 'enzyme';

import Layout from '../Layout';

jest.mock('../Layout.module.scss', () => ({
  column: 'columnClass',
  container: 'containerClass',
}))

describe('<Layout />', () => {
  const TestComponent = () => (<div id="test">Test</div>);

  describe('Default Props', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Layout>
          <TestComponent />
        </Layout>
      );
    })

    it('should render children', () => {
      const Children = wrapper.find(TestComponent)
      expect(Children).not.toBe(null);
      expect(Children).toHaveLength(1);
    });

    it('should render with styles.container', () => {
      const ContainerClass = wrapper.find('.containerClass');
      expect(ContainerClass).not.toBe(null);
      expect(ContainerClass).toHaveLength(1);
    });
  });

  describe('with column set to true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Layout column>
          <TestComponent />
        </Layout>
      );
    });

    it('should render container with column and container classNames', () => {
      const ContainerClass = wrapper.find('div.containerClass.columnClass');
      expect(ContainerClass).not.toBe(null);
      expect(ContainerClass).toHaveLength(1);
    });
  });
});
