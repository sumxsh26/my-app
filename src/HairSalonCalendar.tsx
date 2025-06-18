/*
import React, { useState } from 'react';
import './HairSalonCalendar.css';
import { HairSalonScheduleTemplate } from './types';

const salonTemplate: HairSalonScheduleTemplate = {
  templateName: 'Hair Salon Schedule',
  workingHours: {
    start: '10:00',
    end: '20:00',
  },
  slotDurationMinutes: 30,
  services: [
    { name: 'Haircut', durationMinutes: 30 },
    { name: 'Hair Coloring', durationMinutes: 90 },
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
  //const [status, setStatus] = useState('pending');

  const timeSlots = generateTimeSlots(
    salonTemplate.workingHours.start,
    salonTemplate.workingHours.end,
    salonTemplate.slotDurationMinutes
  );

  //const [bookings, setBookings] = useState(salonTemplate.bookings);
  const [bookings, setBookings] = useState<HairSalonScheduleTemplate['bookings']>(salonTemplate.bookings);


  const bookingsForDay = bookings.filter((b) => b.date === selectedDate);
  
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

  // endTime
  const calculateEndTime = (start: string, serviceName: string): string => {
    const service = salonTemplate.services.find((s) => s.name === serviceName);
    if (!service) return start;
  
    const [h, m] = start.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(h, m);
    startDate.setMinutes(startDate.getMinutes() + service.durationMinutes);
    return startDate.toTimeString().slice(0, 5); // "HH:mm"
  };
  
  // handle booking
  const handleBooking = () => {
    if (!selectedSlot || !customerName || !selectedService || !stylist) {
      alert('Please fill in all fields.');
      return;
    }
  
    // new booking
    const newBooking: HairSalonScheduleTemplate['bookings'][number] = {
      id: `${bookings.length + 1}`, // simple unique id
      date: selectedDate,
      startTime: selectedSlot,
      endTime: calculateEndTime(selectedSlot, selectedService),
      status: 'pending',
      customerName,
      service: selectedService,
      stylist,
    };
  
    setBookings((prev) => [...prev, newBooking]);
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
*/

import { useEffect, useState } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'

 
function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-06-20 00:00',
        end: '2023-06-20 02:00',
      },
    ],
    selectedDate: '2025-06-19',
    plugins: [eventsService]
  })
 
  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default CalendarApp
