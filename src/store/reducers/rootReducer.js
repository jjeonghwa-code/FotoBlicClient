import { combineReducers } from "redux";


const initState = {
    photos: [],
    photosBase64: []
}

function getPhotos(state = [], action){


    switch(action.type){
        case "GET_STATE_CALENDAR":
            return action.file;
            
        case "GET_STATE_PUZZLE":
            return action.file;
                    
        case "GET_STATE_PAPPER":
            
            return action.file;

        default: return state;
        
    }
}

function getBase64(state = [], action){
    switch(action.type){

        case "GET_BASE64_PHOTOS":
            return action.photos;

        default: return state;

    }
}



    const rootReducer = combineReducers({
        getPhotos,
        getBase64
     })


export default rootReducer;