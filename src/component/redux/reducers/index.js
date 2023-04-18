import { combineReducers } from 'redux';
import flightsDataReducer from './flightsDataReducer';
import passengerDataReducer from './passengerDataReducer';
import checkInDataReducer from './checkInDataReducer';

const rootReducer = combineReducers({
    flightsData: flightsDataReducer,
    passengerData: passengerDataReducer,
    checkInDataReducer: checkInDataReducer,
});

export default rootReducer;