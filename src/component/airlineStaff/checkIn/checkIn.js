import React, { useEffect, useState } from "react";
import flightData from "./flightsData";
import passengerData from "./passengersData";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import "./checkIn.css";
import { connect, useDispatch } from "react-redux";
import * as checkInActions from '../../redux/actions/checkInActions'
import * as passengerActions from '../../redux/actions/passengerActions'
import ancillaryServices from "./ancillaryServices";
import { useNavigate } from "react-router-dom";

const CheckIn = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerList, setPassengerList] = useState(passengerData);
  const [seat, setSeat] = useState(null);
  const [service, setService] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    dispatch(checkInActions.selectFlight(flight))
  };

  useEffect(() => {
    setPassengerList(passengerList);
  },[passengerList])

  const handleSeatSelect = (seat) => {
    const updatedPassengerList = passengerList.map((passenger) => {
      if (passenger.seat === seat) {
        return {
          ...passenger,
          checkedIn: true,
        };
      }
      return passenger;
    });
    dispatch(passengerActions.changePassengers(updatedPassengerList))
    setPassengerList(updatedPassengerList);
  };

  const handleUndoCheckIn = (seat) => {
    const updatedPassengerList = passengerList.map((passenger) => {
      if (passenger.seat === seat) {
        return {
          ...passenger,
          checkedIn: false,
        };
      }
      return passenger;
    });
    dispatch(passengerActions.changePassengers(updatedPassengerList))
    setPassengerList(updatedPassengerList);
  };

  const handleSeatChange = (seat, newSeat) => {
    const updatedPassengerList = passengerList.map((passenger) => {
      if (passenger.seat === seat) {
        return {
          ...passenger,
          seat: newSeat,
        };
      }
      return passenger;
    });
    dispatch(passengerActions.changePassengers(updatedPassengerList))
    setPassengerList(updatedPassengerList);
  };

  const filterPassengers = (type) => {
    let filteredPassengerList = [];
    if (type === "checkedIn") {
      passengerList.map(
        (item) => item.checkedIn && filteredPassengerList.push(item)
      );
      dispatch(passengerActions.changePassengers(filteredPassengerList))
      setPassengerList(filteredPassengerList);
    } else if (type === "notCheckedIn") {
      passengerList.map(
        (item) => !item.checkedIn && filteredPassengerList.push(item)
      );
      dispatch(passengerActions.changePassengers(filteredPassengerList))
      setPassengerList(filteredPassengerList);
    } else if (type === "wheelChair") {
      passengerList.map(
        (item) => item.wheelChair && filteredPassengerList.push(item)
      );
      dispatch(passengerActions.changePassengers(filteredPassengerList))
      setPassengerList(filteredPassengerList);
    } else if (type === "infant") {
      passengerList.map(
        (item) => item.infant && filteredPassengerList.push(item)
      );
      dispatch(passengerActions.changePassengers(filteredPassengerList))
      setPassengerList(filteredPassengerList);
    } else {
      dispatch(passengerActions.changePassengers(filteredPassengerList))
      setPassengerList(passengerList);
    }
  };

  const renderPassengerList = () => {
    return passengerList.map((passenger) => (
      <tr key={passenger.id}>
        <td>{passenger.name}</td>
        <td>{passenger.ancillaryServices.join(", ")}</td>
        <td>{passenger.seat}</td>
        <td>
          {passenger.checkedIn ? (
            <button onClick={() => handleUndoCheckIn(passenger.seat)}>
              Undo Check-In
            </button>
          ) : (
            <button onClick={() => handleSeatSelect(passenger.seat)}>
              Check-In
            </button>
          )}
        </td>
        <td>
          <Button onClick={() => handleSeatChange(passenger.seat, "new seat")}>
            Change Seat
          </Button>
        </td>
      </tr>
    ));
  };

  const renderSeatMap = () => {
    const { seatMap } = selectedFlight;
    return seatMap.map((seatRow, index) => (
      <div key={index} className="seat-row">
        {seatRow.map((seat) => (
          <button
            key={seat}
            className={`seat ${getSeatColor(seat)}`}
            onClick={() => handleSeatSelect(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
    ));
  };

  const renderSeats = () => {
    const { seatMap } = selectedFlight;
    return seatMap.map((seatRow, index) => (
      <div key={index} className="seat-row">
        {seatRow.map((seat) => (
          <button
            key={seat}
            onClick={() => setSeat(seat)}
            disabled={(passengerList.find((passenger) => passenger.seat === seat))? false: true}
          >
            {seat}
          </button>
        ))}
      </div>
    ));
  }

  const getSeatColor = (seat) => {
    const passenger = passengerList.find(
      (passenger) => passenger.seat === seat
    );
    if (!passenger) {
      return "empty";
    } else if (passenger.wheelChair) {
      return "wheel-chair";
    } else if (passenger.infant) {
      return "infant";
    } else if (passenger.checkedIn) {
      return "checked-in";
    }
    return "default";
  };

  const renderFilterButtons = () => {
    return (
      <div>
        <h2 className="flight head">Filter Options</h2>
        <ul className="filter">
          <li className="filter select">
            <Button onClick={() => filterPassengers("checkedIn")}>
              Checked-In Passengers
            </Button>
          </li>
          <li>
            <Button onClick={() => filterPassengers("notCheckedIn")}>
              Not Checked-In Passengers
            </Button>
          </li>
          <li>
            <Button onClick={() => filterPassengers("wheelChair")}>
              Wheel Chair Passengers
            </Button>
          </li>
          <li>
            <Button onClick={() => filterPassengers("infant")}>
              Infant Passengers
            </Button>
          </li>
        </ul>
      </div>
    );
  };

  const handleAncillaryServiceAddition = (seat, service) => {
    let filteredPassengerList = passengerList.find((passenger) => passenger.seat === seat)
    filteredPassengerList.ancillaryServices = [...filteredPassengerList.ancillaryServices, service]
    let finalPassengerList = passengerList.map(function(passenger){ return passenger.seat === seat? filteredPassengerList : passenger})
    setPassengerList(finalPassengerList);
  };

  const handleSubmit = () => {
    handleAncillaryServiceAddition(seat, service)
  }

  return (
    <div>
      <Button onClick={() => navigate('/admin')} className="admin-button">Admin</Button>
      <h1>Airline Check-In</h1>
      <div className="flight-list">
        <h2>Flights</h2>
        {flightData.map((flight) => (
          <Button key={flight.id} onClick={() => handleFlightSelect(flight)}>
            {flight.name}
          </Button>
        ))}
      </div>
      {selectedFlight && (
        <div className="flight-details">
          <h2>{selectedFlight.name}</h2>
          <div className="seat-map">{renderSeatMap()}</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ancillary Services</th>
                <th>Seat</th>
                <th>Check-In</th>
                <th>Change Seat</th>
              </tr>
            </thead>
            <tbody>{renderPassengerList()}</tbody>
          </table>
          {renderFilterButtons()}
        </div>
      )}
      {selectedFlight && 
      <div>
          <h3>
            Select Seat to add Services
          </h3>
          <div className="seat-map">{renderSeats()}</div>
        <FormControl className="form">
          
          <Select 
            label="label" 
            onChange={(e) => setService(e.target.value)}
          >
            {ancillaryServices.map((item, index) => (
              <MenuItem 
                key={index} 
                value={item.name}>
                  {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" onClick={() => handleSubmit()}>Submit</Button>
      </div>}
    </div>
  );
};

function mapStateToProps(state){
  return {
      passenger: state.passenger
  }
}

export default connect(mapStateToProps)(CheckIn);
