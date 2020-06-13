import React, {useState, useEffect} from 'react';
import {View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors'
import MapPreview from './MapPreview';

const LocationPicker = props => {

    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();
    const mapPickedLocation = props.navigation.getParam("pickedLocation");

    const {onLocationPicked} = props;
    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app',
                [{text: 'Okay'}]
            );
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return ;
        }
        try{
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({timeout: 5000});
            setPickedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            props.onLocationPicked({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            
        } catch(err) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again or pick a location on the map',
                [{text: 'Okay'}]
            )
        }
        setIsFetching(false);
    }

    const pickedOnMapHandler = () => {
        props.navigation.navigate('Map');
    }

    return (
        <View style = {styles.locationPicker}>
            <MapPreview style = {styles.mapPreview} location = {pickedLocation} onPress = {pickedOnMapHandler}>
                {isFetching ? <ActivityIndicator size = "large" color = {Colors.primary}/> : <Text>No location chosen yet!</Text>}
            </MapPreview>
            <View style = {styles.action}>
                <Button title = "Get User Location" color = {Colors.primary} onPress = {getLocationHandler}/>
                <Button title = "Pick on Map" color = {Colors.primary} onPress = {pickedOnMapHandler}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})

export default LocationPicker;