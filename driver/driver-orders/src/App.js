import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/testOrders";
import OrderDetails from "./pages/OrderDetails";
import GPS from "./pages/GPS.jsx";
import JoinRoom from "./pages/JoinRoom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/activeOrders" element={<Orders />} />
          <Route path="/activeOrders/:id" element={<OrderDetails/>} />
          <Route path="/gps" element={<GPS/>} />
          <Route path="/chat" element={<JoinRoom/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
