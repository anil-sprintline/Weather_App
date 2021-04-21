import * as ActionTypes from './ActionTypes';
import {connect} from 'react-redux';
import axios from 'axios';

import HomeComponent from '../Components/HomeComponent';

const mapStateToProps = state => ({
  isLoading: state.homeReducer.isLoading,
  error: state.homeReducer.error,
  data: state.homeReducer.data,
  currentWeatherData: state.homeReducer.currentWeatherData,
});

const mapDispatchToProps = dispatch => ({
  callWeatherDataService: () => dispatch(callWeatherDataWebService()),
  callCurrentWeatherDataService: (latitude, longitude) =>
    dispatch(callCurrentWeatherDataWebService(latitude, longitude)),
});
// Full citys weather fetching from api
export const callWeatherDataWebService = () => {
  return dispatch => {
    dispatch(weatherDataServicePending());

    axios
      .get(
        'https://api.openweathermap.org/data/2.5/group?id=1185241,4140963,5128581,1880252,1261481,1609350,1275004,1605651&units=metric&appid=22d3dc6be4a2e856c242b8f065f81dbc',
      )

      .then(response => {
        var data = [];
        response.data.list.map(Item => {
          data.push({
            lon: Item.coord.lon,
            lat: Item.coord.lat,
            description: Item.weather[0].description,
            temp: parseFloat(Item.main.temp.toFixed(0)),
            id: Item.id,
            name: Item.name,
            humidity: Item.main.humidity,
            temp_min: parseFloat(Item.main.temp_min.toFixed(0)),
            temp_max: parseFloat(Item.main.temp_max.toFixed(0)),
            wind_speed: Item.wind.speed,
            icon: Item.weather[0].icon,
          });
        });

        dispatch(weatherDataServiceSuccess(data));
      })

      .catch(error => {
        dispatch(weatherDataServiceError(error));
      });
  };
};

// Current location weather fetching from api
export const callCurrentWeatherDataWebService = (latitude, longitude) => {
  return dispatch => {
    dispatch(weatherDataServicePending());

    axios
      .get(
        'https://api.openweathermap.org/data/2.5/find?lat=' +
          latitude +
          '&lon=' +
          longitude +
          '&cnt=1&units=metric&appid=22d3dc6be4a2e856c242b8f065f81dbc',
      )

      .then(response => {
        var data = [];
        response.data.list.map(Item => {
          data.push({
            lon: Item.coord.lon,
            lat: Item.coord.lat,
            description: Item.weather[0].description,
            temp: parseFloat(Item.main.temp.toFixed(0)),
            id: Item.id,
            name: Item.name,
            humidity: Item.main.humidity,
            temp_min: parseFloat(Item.main.temp_min.toFixed(0)),
            temp_max: parseFloat(Item.main.temp_max.toFixed(0)),
            wind_speed: Item.wind.speed,
            icon: Item.weather[0].icon,
          });
        });

        dispatch(currentWeatherDataServiceSuccess(data));
      })

      .catch(error => {
        dispatch(weatherDataServiceError(error));
      });
  };
};

export const weatherDataServicePending = () => ({
  type: ActionTypes.WEATHERDATA_SERVICE_PENDING,
});

export const weatherDataServiceError = error => ({
  type: ActionTypes.WEATHERDATA_SERVICE_ERROR,
  error: error,
});

export const weatherDataServiceSuccess = data => ({
  type: ActionTypes.WEATHERDATA_SERVICE_SUCCESS,
  data: data,
});

export const currentWeatherDataServiceSuccess = data => ({
  type: ActionTypes.CURRENTWEATHERDATA_SERVICE_SUCCESS,
  currentWeatherData: data,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
