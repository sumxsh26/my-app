import React, { useState } from 'react';
import { Booking } from './types';

interface MiniCalendarProps {
  bookings: Booking[];
}

const getTimeLabel = (time: string) => {
  const [hour, minute] = time.split(':');
  return `${hour}:${minute}`;
};

const MiniCalendar: React.FC<MiniCalendarProps> = ({ bookings }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredBookings = bookings.filter(b => b.date === selectedDate);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mini Calendar</h2>

      {/* Select a date */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filteredBookings.length === 0 && <p>No bookings for {selectedDate}</p>}
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              borderRadius: '8px',
              backgroundColor: booking.status === 'confirmed' ? '#c0f7c0' : '#fdf3c2',
            }}
          >
            <strong>{booking.customerName}</strong> — {booking.service}<br />
            {getTimeLabel(booking.startTime)} to {getTimeLabel(booking.endTime)}<br />
            Status: {booking.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
