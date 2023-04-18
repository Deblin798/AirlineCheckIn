import React from "react";
import Dashboard from "./dashboard";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate()
    return(
        <div>
            <Button onClick={() => navigate('/')}>Airline Staff</Button>
            <Dashboard />
        </div>
    )

}

export default Admin;