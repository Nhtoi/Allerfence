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
        <h2>Order Number: {order?.orderNumber}</h2>
        <p>Restaurant Location: {order?.restaurantLocation}</p>
        <p>Client Location: {order?.clientLocation}</p>
        <h3>Menu Items:</h3>
        <ul>
          {order?.menuItems.map((item, index) => (
            <li key={index}>
              {item.itemName} - Quantity: {item.quantity} - Price: ${item.price}
            </li>
          ))}
        </ul>
        <p>Restaurant Name: {order?.restaurantName}</p>
        <p>Client Name: {order?.clientName}</p>
        <p>Order Status: {order?.orderStatus}</p>
        
        {/* Delivered Button */}
        {order?.orderStatus !== "Delivered" && (
          <button onClick={handleMarkAsDelivered}>Delivered</button>
        )}

        {/* Live Chat Button */}
        <button onClick={() => window.location.href = 'http://localhost:3000/chat'}>Live Chat</button>
        
        {/* GPS Button */}
        <button onClick={() => window.location.href = `http://localhost:3002/?origin=${order?.restaurantLocation}&destination=${order?.clientLocation}`}>GPS</button>
     
      </div>
    </div>
  );
};

export default OrderDetails;
