import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './Reducers/Index';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Root} from 'native-base';

import HomeAction from './Actions/HomeCallAction';
import DetailsAction from './Actions/DetailsCallAction';
import RNBootSplash from 'react-native-bootsplash';

const ProfileStack = createStackNavigator();
// Navigation stack
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Home"
      component={HomeAction}
      options={{headerShown: false}}
    />
    <ProfileStack.Screen
      name="Details"
      component={DetailsAction}
      options={{headerShown: false}}
    />
  </ProfileStack.Navigator>
);

export default class Async_Redux extends Component {
  componentDidMount() {
    //Hiding splash screen
    RNBootSplash.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Root>
            <ProfileStackScreen />
          </Root>
        </NavigationContainer>
      </Provider>
    );
  }
}
