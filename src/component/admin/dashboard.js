import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import flightData from "../airlineStaff/checkIn/flightsData";
import * as checkInActions from "../redux/actions/checkInActions";
import { Button } from "@mui/material";
import FilterPassengers from "./fliterPassengers";
import AddPassenger from "./addPassenger";
import UpdatePassenger from "./updatePassenger";
import './index.css'

const Dashboard = () => {
  const { passengerData } = useSelector((state) => state);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerList, setPassengerList] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(passengerData.length > 1){
      setPassengerList(passengerData)
    }else{
      setPassengerList(passengerData[0])
    }
  },[passengerData, passengerList])

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setPassengerList(passengerData)
    dispatch(checkInActions.selectFlight(flight));
  };
  
  const handleDelete = (id) => {
    setPassengerList(passengerList?.splice(id))
  }

  const handleDeleteService = (id, service) => {
    const updatedPassengers = passengerList?.map((passenger) => {
        if (passenger.id === id) {
          const updatedServices = passenger.ancillaryServices.filter((item) => item !== service);
          return { ...passenger, ancillaryServices: updatedServices }
        }
        return passenger;
      });
    setPassengerList(updatedPassengers)
  }
  
  return (
    <div>
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Delete Ancillary Services</th>
                <th>Seat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {passengerList?.map((passenger) => (
                <tr key={passenger.id}>
                  <td>{passenger.name}</td>
                  <td>
                    {passenger.ancillaryServices.map((service, index) => (
                      <Button
                        key={index}
                        onClick={() =>
                          handleDeleteService(passenger.id, service)
                        }
                      >
                        {service}
                      </Button>
                    ))}
                  </td>
                  <td>{passenger.seat}</td>
                  <Button
                    key={passenger.id}
                    onClick={() => handleDelete(passenger.id)}
                  >
                    Delete
                  </Button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedFlight && 
        <div>
          <table className="column">
              <td>
                <AddPassenger passengerList={passengerList} />
              </td>
              <td>
                <UpdatePassenger passengerList={passengerList} setPassengerList={setPassengerList} />
              </td>
              <tr>
                <td>
                  <FilterPassengers />
                </td>
              </tr>
          </table>

        </div>
      }
    </div>
  );
};

export default Dashboard;
