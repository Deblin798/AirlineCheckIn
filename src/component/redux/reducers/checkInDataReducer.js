export default function checkInDataReducer(state = [], action){
    switch(action.type){
        case "SELECT_FLIGHT":
            return [{...action.flightName}]
        default: 
            return state;
    }
}