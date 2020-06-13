import {ADD_PLACE, LOAD_PLACES} from '../actions/places'
import Place from '../../models/place';

const initialState = {
    places: [],
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case (ADD_PLACE):
            const newPlace = new Place(
                                        actions.placeData.id.toString(), 
                                        actions.placeData.title, 
                                        actions.placeData.image,
                                        actions.placeData.address,
                                        actions.placeData.coords.latitude,
                                        actions.placeData.coords.longitude)
            return {
                places: state.places.concat(newPlace)
            }
        case (LOAD_PLACES):
            return {
                places: actions.places.map(pl => new Place(pl.id.toString(), pl.title, pl.image, pl.address, pl.latitude, pl.longitude))
            }
        default:
            return state;
    }
};