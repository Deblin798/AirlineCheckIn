export function changePassengers(passengerList){
    return {type: "CHANGE_PASSENGERS",passengerList}
}

export function addPassengers(passengerList){
    return {type: "ADD_PASSENGERS",passengerList}
}