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
  temperature: {
    fontSize: 29,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cityNameView: {
    paddingBottom: 10,
  },
  weatherItems: {
    fontSize: 14,
  },
  weatherItemsView: {
    paddingBottom: 8,
  },
  verticalHorizonatalCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: deviceWidth,
    height: deviceHeight,
  },

  mapOverlayContainer: {
    padding: 5,
    position: 'absolute',
    bottom: 80,
    width: deviceWidth,
  },
  mapOverlay: {
    backgroundColor: 'white',
    height: 200,
    padding: 15,
    paddingLeft: 20,
  },
};
