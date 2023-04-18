import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import checkIn from "./component/airlineStaff/checkIn/checkIn";
import Admin from "./component/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={checkIn} />
        <Route exact path="/admin" Component={Admin} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
