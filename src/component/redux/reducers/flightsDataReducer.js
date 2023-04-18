import flightData from "../../airlineStaff/checkIn/flightsData";

export default function flightsDataReducer(state = flightData, action){
    switch(action.type){
        case "SELECT_FLIGHT":
            return [{...action.flightName}]
        default: 
            return state;
    }
}