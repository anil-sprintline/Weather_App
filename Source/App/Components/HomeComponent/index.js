import React, {Component} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Body,
  Grid,
  Col,
} from 'native-base';
import PushNotification from 'react-native-push-notification';
import Geolocation from 'react-native-geolocation-service';

import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const noInternetImage = require('../../../assets/no-internet.png');

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
      isInternet: true,
    };

    this.checkInternetLoadInitial();
  }
  checkInternetLoadInitial() {
    //Loading weather details list if internet.
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.getLocation();
        this.props.callWeatherDataService();
        this.setState({
          isInternet: true,
        });
      } else {
        this.setState({
          isInternet: false,
        });
      }
    });
  }
  hasLocationPermission = async () => {
    //GPS Permission Checking
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    }

    return false;
  };

  getLocation = async () => {
    //Get GPS location
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({location: position, loading: false});

          this.props.callCurrentWeatherDataService(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        error => {
          this.setState({loading: false});
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };

  componentDidMount() {
    //Push Notification
    setTimeout(() => {
      if (this.props.currentWeatherData.length != 0) {
        PushNotification.cancelAllLocalNotifications();
        //Push Notification channel creating
        PushNotification.createChannel(
          {
            channelId: 'weqs-123-wede',
            channelName: 'Weather App',
          },
          created => {},
        );
        //Push Notification Scheduling
        PushNotification.localNotificationSchedule({
          channelId: 'weqs-123-wede',
          title: this.props.currentWeatherData[0].name,
          message:
            'Current temperature is ' +
            this.props.currentWeatherData[0].temp +
            '°C',
          date: new Date(Date.now() + 3000), // Push interval in minutes

          largeIcon: 'ic_launcher',
          largeIconUrl:
            'https://openweathermap.org/img/wn/' +
            this.props.currentWeatherData[0].icon +
            '@2x.png',
          smallIcon: 'ic_notification',

          bigLargeIcon: 'ic_launcher',
          bigLargeIconUrl:
            'https://openweathermap.org/img/wn/' +
            this.props.currentWeatherData[0].icon +
            '@2x.png',

          repeatType: 'minute', 
        });
      }
    }, 5000);
  }

  static async getDerivedStateFromProps(nextProps, prevState) {
    //console.log('nextProps', nextProps);
    //console.log('prevState', prevState);

    return {dataSource: nextProps.data};
  }

  render() {
    const renderCitys = ({item, index}) => (
      <TouchableOpacity
        key={item.id}
        style={styles.cityContainer}
        onPress={() => {
          //Redirecting to Details page with data
          this.props.navigation.navigate('Details', {
            weatherDetails: item,
          });
        }}>
        <Grid>
          <Col>
            <View style={styles.cityNameView}>
              <Text style={styles.cityName}>{item.name}</Text>
            </View>
            <Text style={styles.weatherName}>{item.description}</Text>
          </Col>
          <Col style={{justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={styles.temperature}>{item.temp}°C</Text>
          </Col>
        </Grid>
      </TouchableOpacity>
    );

    return (
      <Container>
        <Header androidStatusBarColor="#00482a" style={styles.headerStyle}>
          <Body style={styles.verticalHorizonatalCenter}>
            <Title>WeatherApp</Title>
          </Body>
        </Header>
        <View style={styles.contentStyle}>
          {this.state.isInternet ? (
            <View>
              {this.props.data ? (
                <FlatList
                  keyboardShouldPersistTaps="handled"
                  renderItem={renderCitys}
                  style={{}}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={10}
                  data={this.props.data}
                />
              ) : null}
            </View>
          ) : (
            <View style={styles.noInternetView}>
              <Image
                style={styles.noInternetImageStyle}
                source={noInternetImage}
              />
              <Text style={styles.whoopsStyle}>Whoops</Text>
              <View style={styles.noInternetTextView}>
                <Text style={styles.noInternetText}>
                  Slow or no internet connection please check your internet
                  settings
                </Text>
              </View>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={() => {
                  this.checkInternetLoadInitial();
                }}>
                <Icon name="refresh" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Container>
    );
  }
}
