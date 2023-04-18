import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as passengerActions from "../redux/actions/passengerActions";
import './index.css'

const UpdatePassenger = (props) => {
    const { passengerList } = props
    const [seat, setSeat] = useState(null);
    const [occupiedSeat, setOccupiedSeat] = useState([]);
    const [name, setName] = useState(null);
    const [passport, setPassport] = useState(null);
    const [address, setAddress] = useState(null);
    const dispatch = useDispatch()
    
    useEffect(() => {
        setOccupiedSeat([(passengerList.map((passenger) => passenger.seat))])
    },[passengerList])

    const renderSeats = () => {
        return occupiedSeat[0]?.map((seatNumber, index) => (
            <button 
                key={index}
                onClick={() => setSeat(seatNumber)}
                className="update-passenger-form-default-button"
            >
                {seatNumber}
            </button>
        ));
      }

      const updatePassenger = (updatedPassenger) => {
        const updatePassengerList = passengerList.map((passenger) => {
            if(passenger.seat === seat){
                return {
                    ...passenger,
                    name: updatedPassenger.name,
                    passport: updatedPassenger.passport,
                    address: updatedPassenger.address
                }
            }
            return passenger;
        })
        dispatch(passengerActions.changePassengers(updatePassengerList))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updatePassenger({name,
            passport,
            address,seat})
      };
    return (
        <div className="update-passenger-form">
            <h2>Update Passenger</h2>
            Select Seat:
            {renderSeats()}
            <br/>
            {seat && 
                <p>
                Passenger Details for seat: {seat}
                {passengerList.map((passenger) => passenger.seat === seat?
                <form onSubmit={handleSubmit} >
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
            }
        </div>
    )
}
export default UpdatePassenger;