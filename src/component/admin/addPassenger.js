import React, { useState } from "react";
import * as passengerActions from "../redux/actions/passengerActions";
import { useDispatch } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import ancillaryServices from "../airlineStaff/checkIn/ancillaryServices";
import './index.css'

const AddPassenger = (passengerList) => {
  const [name, setName] = useState(null);
  const [wheelChair, setWheelChair] = useState(false);
  const [infant, setInfant] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [passport, setPassport] = useState(null);
  const [address, setAddress] = useState(null);
  const [service, setService] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = passengerList.length + 1;
    const ancillaryServices = [service];
    const wheelChair = false;
    const infant = false;
    const checkedIn = false;
    dispatch(passengerActions.addPassengers({
        id,
        name,
        ancillaryServices,
        wheelChair,
        infant,
        checkedIn,
        passport,
        address,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="add-passenger-form"  >
        <h2>Add a Passenger</h2>
        <br />
        <label >
            Name:
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </label>
        <br />
        <label>
            Ancillary Services:
            <Select label="abcd" value={service} required onChange={(e) => setService(e.target.value)} className="ancillaryService">
            {ancillaryServices.map((item, index) => (
                <MenuItem key={index} value={item.name}>
                {item.name}
                </MenuItem>
            ))}
            </Select>
        </label>
        <br />
        <label>
            WheelChair:
            <input
            type="checkbox"
            value={wheelChair}
            onChange={(e) => setWheelChair(e.target.value)}
            />
        </label>
        <br />
        <label>
            Infant:
            <input
            type="checkbox"
            value={infant}
            onChange={(e) => setInfant(e.target.value)}
            />
        </label>
        <br />
        <label>
            Check In:
            <input
            type="checkbox"
            value={checkedIn}
            onChange={(e) => setCheckedIn(e.target.value)}
            />
        </label>
        <br />
        <label>
            Passport:
            <input
            type="text"
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            required
            />
        </label>
        <br />
        <label>
            Address:
            <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            />
        </label>
        <br />
        <button type="submit">Add</button>
    </form>
  );
};
export default AddPassenger;
