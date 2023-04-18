import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FilterPassengers = () => {
    const { passengerData } = useSelector((state) => state)
    const [passengers, setPassengers] = useState(null);
    const [showMissing, setShowMissing] = useState(false);
    let filteredPassengers = showMissing? 
        passengers.filter((passenger) => passenger.passport === "" || passenger.address === "" || passenger.dob === "")
        : passengers;

    useEffect(() => {
        setPassengers(passengerData)
    }, [passengerData])
    
      return (
        <div className="filter-passengers-form">
          <label>
            <h2>Filter Passengers</h2>
            Show Missing Mandatory Requirements:
            <input type="checkbox" checked={showMissing} onChange={() => setShowMissing(!showMissing)} />
          </label>
          <ul>
            {filteredPassengers?.map((passenger) => (
              <li key={passenger.id}>
                {passenger.name}
                {showMissing && (
                  <ul>
                    {passenger.passport === "" && <li>Missing Passport</li>}
                    {passenger.address === "" && <li>Missing Address</li>}
                    {passenger.dob === "" && <li>Missing Date of Birth</li>}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default FilterPassengers;