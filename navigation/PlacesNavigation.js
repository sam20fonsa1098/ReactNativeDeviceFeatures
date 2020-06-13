import {Platform} from 'react-native'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import PlacesListScreen from '../screens/PlaceListScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
    PlacesList: {
        screen: PlacesListScreen,
        navigationOptions: {
            headerTitle: "All Places",
        }
    },
    PlaceDetails: {
        screen: PlaceDetailsScreen,
    },
    NewPlace: {
        screen: NewPlaceScreen,
        navigationOptions: {
            headerTitle: "Add Place",
        }
    },
    Map: {
        screen: MapScreen,
        navigationOptions: {
            headerTitle: "Maps",
        }
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(PlacesNavigator);

