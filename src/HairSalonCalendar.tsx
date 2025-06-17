/*
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { HairSalonScheduleTemplate } from './types'; 

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Sample data (you can fetch or load this dynamically)
const salonTemplate: HairSalonScheduleTemplate = {
  templateName: 'Hair Salon Schedule',
  workingHours: {
    start: '10:00',
    end: '20:00',
  },
  slotDurationMinutes: 15,
  services: [
    { name: 'Haircut', durationMinutes: 30 },
    { name: 'Hair Coloring', durationMinutes: 60 },
  ],
  bookings: [
    {
      id: '1',
      date: '2025-06-18',
      startTime: '11:00',
      endTime: '12:00',
      status: 'confirmed',
      customerName: 'Aiman',
      service: 'Hair Coloring',
      stylist: 'Jessie',
    },
    {
      id: '2',
      date: '2025-06-18',
      startTime: '13:00',
      endTime: '13:30',
      status: 'pending',
      customerName: 'Maya',
      service: 'Haircut',
      stylist: 'Ken',
    },
  ],
};

// Convert bookings to calendar events
const events = salonTemplate.bookings.map((booking) => {
  const start = new Date(`${booking.date}T${booking.startTime}`);
  const end = new Date(`${booking.date}T${booking.endTime}`);
  return {
    title: `${booking.customerName} - ${booking.service} (${booking.status})`,
    start,
    end,
    resource: booking,
  };
});

const HairSalonCalendar: React.FC = () => {
  return (
    <div style={{ height: '600px', margin: '2rem' }}>
      <h2>{salonTemplate.templateName}</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="day"
        views={['day', 'week', 'month']}
        style={{ height: '100%' }}
        defaultDate={new Date('2025-06-18')}
      />
    </div>
  );
};

export default HairSalonCalendar;
*/


import React, { useState } from 'react';
import './HairSalonCalendar.css';
import { HairSalonScheduleTemplate } from './types';

const salonTemplate: HairSalonScheduleTemplate = {
  templateName: 'Hair Salon Schedule',
  workingHours: {
    start: '10:00',
    end: '20:00',
  },
  slotDurationMinutes: 15,
  services: [
    { name: 'Haircut', durationMinutes: 30 },
    { name: 'Hair Coloring', durationMinutes: 60 },
  ],
  bookings: [
    {
      id: '1',
      date: '2025-06-18',
      startTime: '11:00',
      endTime: '12:00',
      status: 'confirmed',
      customerName: 'Aiman',
      service: 'Hair Coloring',
      stylist: 'Jessie',
    },
    {
      id: '2',
      date: '2025-06-18',
      startTime: '13:00',
      endTime: '13:30',
      status: 'pending',
      customerName: 'Maya',
      service: 'Haircut',
      stylist: 'Ken',
    },
  ],
};

const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: number) => {
  const slots: string[] = [];
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const start = new Date();
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  while (start <= end) {
    slots.push(start.toTimeString().slice(0, 5));
    start.setMinutes(start.getMinutes() + intervalMinutes);
  }

  return slots;
};

const HairSalonCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2025-06-18');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [stylist, setStylist] = useState('');

  const timeSlots = generateTimeSlots(
    salonTemplate.workingHours.start,
    salonTemplate.workingHours.end,
    salonTemplate.slotDurationMinutes
  );

  const bookingsForDay = salonTemplate.bookings.filter((b) => b.date === selectedDate);

  const getBookingAtTime = (time: string) => bookingsForDay.find((b) => b.startTime === time);

  const openModal = (slot: string) => {
    setSelectedSlot(slot);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSlot(null);
    setCustomerName('');
    setSelectedService('');
    setStylist('');
  };

  const handleBooking = () => {
    console.log('Booking made:', {
      date: selectedDate,
      time: selectedSlot,
      customerName,
      selectedService,
      stylist,
    });
    closeModal();
  };

  return (
    <div className="hair-salon-container">
      <h2>{salonTemplate.templateName}</h2>

      <label>
        Pick a date:{' '}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <div className="time-slot-container">
        {timeSlots.map((slot) => {
          const booking = getBookingAtTime(slot);
          const statusClass = booking
            ? booking.status === 'confirmed'
              ? 'confirmed'
              : 'pending'
            : 'available';

          return (
            <div key={slot} className={`time-slot ${statusClass}`}>
              <strong>{slot}</strong>
              {booking ? (
                <span>
                  {' '}
                  — {booking.customerName} ({booking.service})
                </span>
              ) : (
                <button className="book-slot-btn" onClick={() => openModal(slot!)}>
                  Book Slot
                </button>
              )}
            </div>
          );
        })}
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h3>Book {selectedSlot} on {selectedDate}</h3>
            <label>
              Name:
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </label>
            <label>
              Service:
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select</option>
                {salonTemplate.services.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Stylist:
              <input
                type="text"
                value={stylist}
                onChange={(e) => setStylist(e.target.value)}
              />
            </label>
            <button className="confirm-button" onClick={handleBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HairSalonCalendar;
