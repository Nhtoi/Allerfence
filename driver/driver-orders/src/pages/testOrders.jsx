import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8080/activeOrders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:8080/activeOrders/${orderId}`);
      // Refresh orders list or update state as needed
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Active Orders</h1>
      <div className="orders">
        {orders.map((order) => (
          <div key={order._id} className="order">
            <h2>Order Number: {order.orderId}</h2>
            {/* Display other order details */}
            <Link to={`/activeOrders/${order._id}`}>View Details</Link>
            <button onClick={() => handleAcceptOrder(order._id)}>Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
