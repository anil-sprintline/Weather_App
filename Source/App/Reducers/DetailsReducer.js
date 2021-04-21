import * as Actions from '../Actions/ActionTypes';

const DetailsReducer = (
  state = {isLoading: false, error: undefined, data: []},
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default DetailsReducer;
