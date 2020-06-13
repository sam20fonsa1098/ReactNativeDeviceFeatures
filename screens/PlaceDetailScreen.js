import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';

import Colors from '../constants/Colors'

import MapPreview from '../components/MapPreview';

const PlaceDetailsScreen = props => {
    const placeId = props.navigation.getParam("placeId");
    const selectedPlaces = useSelector(state => state.places.places.find(place => place.id === placeId))
    const selectedLocation = {latitude: selectedPlaces.latitude, longitude: selectedPlaces.longitude};
    const showMaphandler = () => {
        props.navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        })
    }
    return (
        <ScrollView contentContainerStyle = {{alignItems: 'center'}}>
            <Image source = {{uri: selectedPlaces.image}} style = {styles.image}/>
            <View style = {styles.locationContainer}>
                <View style = {styles.addressContainer}>
                    <Text style = {styles.address}>{selectedPlaces.address}</Text>
                </View>
                <MapPreview onPress = {showMaphandler} style = {styles.mapPreview} location = {selectedLocation}/>
            </View>
        </ScrollView>
    );
}

PlaceDetailsScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('placeTitle');
    return {
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
      backgroundColor: '#ccc'
    },
    locationContainer: {
      marginVertical: 20,
      width: '90%',
      maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10
    },
    addressContainer: {
      padding: 20
    },
    address: {
      color: Colors.primary,
      textAlign: 'center'
    },
    mapPreview: {
      width: '100%',
      maxWidth: 350,
      height: 300,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  });

export default PlaceDetailsScreen;