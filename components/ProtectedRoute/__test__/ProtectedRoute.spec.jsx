import { mount } from 'enzyme';

import ProtectedRoute from '../ProtectedRoute';

import useAuth from '../../../hooks/useAuth';

jest.mock('../../../hooks/useAuth.js')
useAuth.mockReturnValue([
  {
    isAuthenticated: true
  },
])

describe('<ProtectedRoute />', () => {
  describe('isAuthenticated is true', () => {
    const TestComponent = () => (<div id="test">Test</div>);
    let wrapper;

    it('should render Children', () => {
      wrapper = mount(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );
      const Children = wrapper.find(TestComponent)
      expect(Children).not.toBe(null);
      expect(Children).toHaveLength(1);
    });
  });

  describe('isAuthenticated is false', () => {

  });
});
