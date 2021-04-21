import {color} from 'react-native-reanimated';

const React = require('react-native');
const {Dimensions, Platform} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  headerStyle: {
    backgroundColor: '#00804A',
    alignItems: 'flex-end',
  },
  cityContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ebebeb',
  },
  cityName: {
    fontSize: 18,
  },
  cityNameView: {
    paddingBottom: 5,
  },
  contentStyle: {
    padding: 10,
    flex: 1,
  },
  weatherName: {
    color: 'gray',
    fontSize: 14,
  },
  temperature: {
    fontSize: 26,
  },
  verticalHorizonatalCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noInternetImageStyle: {
    width: 140,
    height: 140,
  },
  noInternetView: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  whoopsStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noInternetText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
  },
  noInternetTextView: {
    padding: 10,
    paddingLeft: 70,
    paddingRight: 70,
  },
  refreshButton: {
    padding: 20,
  },
};
