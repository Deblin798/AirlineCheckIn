import passengerData from "../../airlineStaff/checkIn/passengersData";

export default function passengerDataReducer(state = passengerData, action){
    switch(action.type){
        case "CHANGE_PASSENGERS":
            return [...action.passengerList]
        case "ADD_PASSENGERS":
            return [...state,{...action.passengerList}]
        default: 
            return state;
    }
}