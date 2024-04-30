import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/activeOrders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const handleMarkAsDelivered = async () => {
    try {
      // Update order status
      await axios.put(`http://localhost:8080/activeOrders/${id}`, { orderStatus: "Delivered" });

      // Navigate back to orders page
      window.location.href ='http://localhost:3000/activeOrders'
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Order Details</h1>
      <div className="order-details">
        <h2>Order ID: {order?.orderId}</h2>
        <p>Customer Name: {order?.customerName}</p>
        <p>Order Status: {order?.status}</p>
        <h3>Items:</h3>
        <ul>
          {order?.items.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price}
            </li>
          ))}
        </ul>
        <p>Total: ${order?.total}</p>
        <p>Type: {order?.type}</p>
        <p>Customer Address: {order?.customerAddress}</p>
        <p>Restaurant Address: {order?.restaurantAddress}</p>
        <p>Special Instructions: {order?.specialInstructions}</p>
        
        {/* Delivered Button */}
        {order?.status !== "Delivered" && (
          <button onClick={handleMarkAsDelivered}>Delivered</button>
        )}
  
        {/* Live Chat Button */}
        <button onClick={() => window.location.href = 'http://localhost:3000/chat'}>Live Chat</button>
        
        {/* GPS Button */}
        <button onClick={() => window.location.href = `http://localhost:3002/?origin=${order?.restaurantAddress}&destination=${order?.customerAddress}`}>GPS</button>
      </div>
    </div>
  );
};

export default OrderDetails;
