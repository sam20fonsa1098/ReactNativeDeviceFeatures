import React, {useEffect} from 'react';
import {StyleSheet, Platform, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux'

import * as placesActions from '../store/actions/places';

import CustomHeaderButton from '../components/HeaderButton';

import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {
    const dispatch = useDispatch(); 
    const places   = useSelector(state => state.places.places);
    useEffect(() => {
        dispatch(placesActions.loadPlaces())
    }, [dispatch])
    return (
        <FlatList 
            data = {places}
            keyExtractor = {item => item.id}
            renderItem = {itemData => <PlaceItem 
                                            image = {itemData.item.image} 
                                            title = {itemData.item.title}
                                            address = {itemData.item.address}
                                            onSelect = {() => {
                                                props.navigation.navigate("PlaceDetails", {
                                                    placeTitle: itemData.item.title,
                                                    placeId: itemData.item.id}
                                                )}}/>}/>
    );
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerRight: () =>  
            <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <Item 
                    title = "Add Place" 
                    iconName = {Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress = {() => {navData.navigation.navigate("NewPlace")}}/>
            </HeaderButtons>
        ,
    }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen;