import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  // Mock data (replace with actual API fetch)
  const totalProducts = 12;
  const totalOrders = 4;

  return (
    <div className="container">
      <h1 className="title">Welcome Admin</h1>
      <div className="metricsContainer">
        <div className="metric">
          <Link to="/product" aria-label="View Products">
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </Link>
        </div>
        <div className="metric">
          <Link to="/order" aria-label="View Orders">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </Link>
        </div>
        <div className="metric">
          <Link to="/calendar" aria-label="View Calendar">
            <h3>Calendar View</h3>
            <p>Go to Calendar</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;