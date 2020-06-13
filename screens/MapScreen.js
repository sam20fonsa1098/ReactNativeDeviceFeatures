import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet, Platform, Alert} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Colors from '../constants/Colors';

const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readonly = props.navigation.getParam('readonly');
    const mapRegion = {
        latitude: initialLocation? initialLocation.latitude : 37.78,
        longitude: initialLocation? initialLocation.longitude : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)

    const selectLocationHandler = event => {
        if (readonly) {
            return;
        }
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
    }

    let markerCoordinates;
    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
        }
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                'Can not Save!',
                'You need to choose a location to save',
                [{text: 'Okay'}]
            );
            return;
        }
        props.navigation.navigate("NewPlace", {
            pickedLocation: selectedLocation
        });
    }, [selectedLocation])

    useEffect(() => {
        props.navigation.setParams({
            saveLocation: savePickedLocationHandler
        })
    }, [savePickedLocationHandler])

    return (
        <MapView style = {styles.map} region = {mapRegion} onPress = {selectLocationHandler}>
            {selectedLocation && <Marker title = "Picked Location" coordinate = {markerCoordinates}></Marker>}
        </MapView>
    );
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam("saveLocation");
    const readonly = props.navigation.getParam('readonly');
    if (readonly) {
        return {};
    }
    return {
        headerRight: () => 
            <TouchableOpacity style = {styles.headerButton} onPress = {saveFn}>
                <Text style = {styles.headerButtonText}>
                    Save
                </Text>
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' :  Colors.primary
    }
})

export default MapScreen;