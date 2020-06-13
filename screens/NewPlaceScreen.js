import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import {useDispatch} from 'react-redux';

import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

import Colors from '../constants/Colors'
import * as placesActions from '../store/actions/places';

const NewPlaceScreen = props => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const titleChangeHandler = (value) => {
        setTitle(value);
    }
    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title, image, selectedLocation));
        props.navigation.goBack();
    }
    const takeImageHandler = (imagePath) => {
        setImage(imagePath);
    }
    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);
    return (
        <ScrollView>
            <View style = {styles.form}>
                <Text style = {styles.label}>Title</Text>
                <TextInput 
                    style = {styles.textInput}
                    onChangeText = {titleChangeHandler}
                    value = {title}/>
                <ImagePicker onImageTake = {takeImageHandler}/>
                <LocationPicker navigation = {props.navigation} onLocationPicked = {locationPickedHandler}/>
                <Button title = "Save Place" color = {Colors.primary} onPress = {savePlaceHandler}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen;