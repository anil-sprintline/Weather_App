import * as Actions from '../Actions/ActionTypes';

const HomeReducer = (
  state = {
    isLoading: false,
    error: undefined,
    data: [],
    currentWeatherData: [],
  },
  action,
) => {
  switch (action.type) {
    case Actions.WEATHERDATA_SERVICE_PENDING:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
      });
    case Actions.WEATHERDATA_SERVICE_ERROR:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        error: action.error,
      });
    case Actions.WEATHERDATA_SERVICE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        data: action.data,
        error: undefined,
      });
    case Actions.CURRENTWEATHERDATA_SERVICE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        currentWeatherData: action.currentWeatherData,
        error: undefined,
      });

    default:
      return state;
  }
};

export default HomeReducer;
