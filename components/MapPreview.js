import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import ENV from '../env';

const MapPreview = props => {
    let imagePreviewUrl;
    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latitude},${props.location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.latitude},${props.location.longitude}&key=${ENV.googleApiKey}`;
        console.log(imagePreviewUrl)
    }
    return (
        <TouchableOpacity style = {{...styles.mapPreview, ...props.style}} onPress = {props.onPress}>
            {props.location ? 
            <Image style = {styles.mapImage} source = {{uri: imagePreviewUrl}}>

            </Image>
            :
            props.children
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage:{
        width: '100%',
        height: '100%'
    }
})

export default MapPreview;