import { createSelector } from 'reselect';

export const HIDE_MESSAGE_MODAL = 'HIDE_MESSAGE_MODAL';
export const SHOW_MESSAGE_MODAL = 'SHOW_MESSAGE_MODAL';

export const initialState = {
  messageModal: {
    isVisibile: false,
    message: '',
    autoClose: true,
  },
};

export const hideMessageModal = () => ({
  type: HIDE_MESSAGE_MODAL,
});

export const showMessageModal = (props) => ({
  type: SHOW_MESSAGE_MODAL,
  payload: props,
});

export const reducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case HIDE_MESSAGE_MODAL: {
      return {
        ...state,
        // sets default props
        messageModal: {
          isVisible: false,
          message: '',
          autoClose: true,
        }
      };
    }
    case SHOW_MESSAGE_MODAL: {
      return {
        ...state,
        messageModal: {
          isVisible: true,
          ...payload,
        }
      }
    }
    default:
      return state;
  }
};

const rootSelector = (state) => state.portals;

export const getMessageModal = createSelector(
  rootSelector,
  (portalState) => portalState.messageModal
);

export const isMessageModalVisible = createSelector(
  getMessageModal,
  (messageModalState) => messageModalState.isVisibile
);
