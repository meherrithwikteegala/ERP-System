import React, { useState } from 'react';
import './Order.css';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

let initialOrders = [
  { id: 1, orderId: 'ORD001', customerName: 'Meher Rithwik', orderDate: '2024-03-19', status: 'Pending', expectedDeliveryDate:'2024-03-29'  },
  { id: 2, orderId: 'ORD002', customerName: 'Akashaya', orderDate: '2024-03-16', status: 'Processing', expectedDeliveryDate: '2024-03-26' },
  { id: 3, orderId: 'ORD003', customerName: 'Teja', orderDate: '2024-03-17', status: 'Delivered', expectedDeliveryDate: '2024-03-27' },
  { id: 4, orderId: 'ORD004', customerName: 'vamsi', orderDate: '2024-03-15', status: 'Pending', expectedDeliveryDate: '2024-03-25' }
];

function Order() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    if (!date) {
      setSelectedOrders(orders); // Set selectedOrders to all orders when no date is selected
      setSelectedDeliveryStatus('');
      return;
    }
  
    setSelectedOrders([]);
    setSelectedDeliveryStatus('In Progress');
  
    setSelectedOrders(orders.filter(order => {
      const expectedDeliveryDate = new Date(order.expectedDeliveryDate);
      return (
        expectedDeliveryDate.getDate() === date.getDate() &&
        expectedDeliveryDate.getMonth() === date.getMonth() &&
        expectedDeliveryDate.getFullYear() === date.getFullYear()
      );
    }));
  };


  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="order-container">
      <h2 className="order-heading">Orders Management</h2>
      <div className="order-content">
         {selectedOrder && (
          <div className="order-details">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            {selectedOrder.shippingDate && <p><strong>Shipping Date:</strong> {new Date(selectedOrder.shippingDate).toDateString()}</p>}
            {selectedOrder.expectedDeliveryDate && <p><strong>Expected Delivery Date:</strong> {new Date(selectedOrder.expectedDeliveryDate).toDateString()}</p>}
            <button onClick={() => setSelectedOrder(null)} className="close-details-button">Close Details</button>
          </div>
        )}
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Customer Name:</strong> {order.customerName}</p>
              <p><strong>Order Date:</strong> {order.orderDate}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button onClick={() => handleViewOrderDetails(order)} className="view-details-button">View Details</button>
              <button onClick={() => handleUpdateOrderStatus(order.orderId, 'Shipped')} className="update-status-button">Ship</button>
              <button onClick={() => handleDeleteOrder(order.orderId)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>

        <div className="dashboard-container">
          <h2>Orders Calendar View</h2>
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
          <div className="selected-orders">
            <h3>Orders for {selectedDate.toDateString()}</h3>
            <ul>
              {selectedOrders.map(order => (
                <li key={order.id}>{order.customerName}</li>
              ))}
            </ul>
            {selectedDeliveryStatus && (
              <p><strong>Delivery Status:</strong> {selectedDeliveryStatus}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;