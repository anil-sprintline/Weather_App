import React, {Component} from 'react';

import {Text, View, Image, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Title,
  Icon,
  Left,
  Body,
  Button,
  Grid,
  Col,
} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class DetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
    };
  }

  static async getDerivedStateFromProps(nextProps, prevState) {
   // console.log('nextProps', nextProps);
   // console.log('prevState', prevState);

    return {dataSource: null};
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#00482a" style={styles.headerStyle}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={[{paddingLeft: 40}]}>
            <Title>WeatherApp</Title>
          </Body>
        </Header>
        <View style={styles.contentStyle}>
          <View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: this.props.route.params.weatherDetails.lat - 0.07,
                longitude: this.props.route.params.weatherDetails.lon,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
              }}>
              <Marker
                coordinate={{
                  latitude: this.props.route.params.weatherDetails.lat,
                  longitude: this.props.route.params.weatherDetails.lon,
                }}
                title={''}
                description={''}
              />
            </MapView>

            <View style={styles.mapOverlayContainer}>
              <View style={styles.mapOverlay}>
                <Grid>
                  <Col>
                    <View style={styles.cityNameView}>
                      <Text style={styles.cityName}>
                        {this.props.route.params.weatherDetails.name}
                      </Text>
                    </View>

                    <View style={styles.weatherItemsView}>
                      <Text style={styles.weatherItems}>
                        {this.props.route.params.weatherDetails.description}
                      </Text>
                    </View>

                    <View style={styles.weatherItemsView}>
                      <Text style={styles.weatherItems}>
                        Humidity:{' '}
                        {this.props.route.params.weatherDetails.humidity}
                      </Text>
                    </View>

                    <View style={styles.weatherItemsView}>
                      <Text style={styles.weatherItems}>
                        Wind Speed:{' '}
                        {this.props.route.params.weatherDetails.wind_speed}
                      </Text>
                    </View>

                    <View style={styles.weatherItemsView}>
                      <Text style={styles.weatherItems}>
                        Max. Temp:{' '}
                        {this.props.route.params.weatherDetails.temp_max}°C
                      </Text>
                    </View>

                    <View style={styles.weatherItemsView}>
                      <Text style={styles.weatherItems}>
                        Min. Temp:{' '}
                        {this.props.route.params.weatherDetails.temp_min}°C
                      </Text>
                    </View>
                  </Col>
                  <Col style={styles.verticalHorizonatalCenter}>
                    <View>
                      <Text style={styles.temperature}>
                        {this.props.route.params.weatherDetails.temp}°C
                      </Text>
                    </View>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{
                        uri:
                          'https://openweathermap.org/img/wn/' +
                          this.props.route.params.weatherDetails.icon +
                          '@2x.png',
                      }}
                    />
                  </Col>
                </Grid>
              </View>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
