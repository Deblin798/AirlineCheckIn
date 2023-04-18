import React, { useEffect, useState } from "react";

const DisplayPassengers = (props) => {
    const { seat, passengerList, setPassengerList } = props
    const [name, setName] = useState(null);
    const [passport, setPassport] = useState(null);
    const [address, setAddress] = useState(null);
    
    useEffect(()=>{
        setPassengerList(passengerList)
    },[passengerList,setPassengerList])
    const updatePassenger = (updatedPassenger) => {
        const objIndex = passengerList.findIndex((obj) => obj.seat === seat);
        passengerList[objIndex].name = updatedPassenger.name;
        passengerList[objIndex].passport = updatedPassenger.passport;
        passengerList[objIndex].address = updatedPassenger.address;
        setPassengerList(passengerList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updatePassenger({name,
            passport,
            address,seat})
      };

    return (
        <p>
            Passenger Details for seat: {seat}
            {passengerList.map((passenger) => passenger.seat === seat?
            <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
              Passport:
              <input type="text" value={passport} onChange={(e) => setPassport(e.target.value)} />
            </label>
            <br />
            <label>
              Address:
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <br />
            <button type="submit">Update</button>
          </form>
            : '')}
        </p>
    )
}

export default DisplayPassengers;