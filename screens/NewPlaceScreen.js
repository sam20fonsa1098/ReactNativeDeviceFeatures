import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import {useDispatch} from 'react-redux';

import ImagePicker from '../components/ImagePicker';

import Colors from '../constants/Colors'
import * as placesActions from '../store/actions/places';

const NewPlaceScreen = props => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState();

    const titleChangeHandler = (value) => {
        setTitle(value);
    }
    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title, image));
        props.navigation.goBack();
    }
    const takeImageHandler = (imagePath) => {
        setImage(imagePath);
    }
    return (
        <ScrollView>
            <View style = {styles.form}>
                <Text style = {styles.label}>Title</Text>
                <TextInput 
                    style = {styles.textInput}
                    onChangeText = {titleChangeHandler}
                    value = {title}/>
                <ImagePicker onImageTake = {takeImageHandler}/>
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