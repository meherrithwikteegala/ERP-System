import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

function OrderCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="order-calendar-container">
      <h2 className="order-calendar-heading">Orders Calendar View</h2>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
    </div>
  );
}

export default OrderCalendar;
