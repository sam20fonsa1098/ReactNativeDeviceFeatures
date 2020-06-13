import * as FileSystem from 'expo-file-system';
import {insertPlace, fetchPlaces} from '../../helpers/db'
import ENV from '../../env'


export const ADD_PLACE   = "ADD_PLACE";
export const LOAD_PLACES = "LOAD_PLACES"

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${ENV.openKey}`);
        
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        
        const resData = await response.json();
        if (!resData.results) {
            throw new Error('Something went wrong!');
        }
        const address = resData.results[0].formatted;

        const fileName = image.split('/').pop(); 
        const newPath  = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(title, newPath, address, location.latitude, location.longitude);
            console.log(dbResult);
            dispatch({ 
                type: ADD_PLACE, 
                placeData: 
                {id: dbResult.insertId ,
                title, 
                image: newPath, 
                address: address, 
                coords: {
                    latitude: location.latitude, 
                    longitude: location.longitude
                }
            }})
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            console.log(dbResult);
            dispatch({
                type: LOAD_PLACES,
                places: dbResult.rows._array
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
        
    }
}