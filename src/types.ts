export interface Service {
    name: string;
    durationMinutes: number;
  }
  
  export interface Booking {
    id: string;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show' | 'walk-in';
    customerName: string;
    service: string;
    stylist: string;
  }
  
  export interface HairSalonScheduleTemplate {
    templateName: string;
    workingHours: {
      start: string;
      end: string;
    };
    slotDurationMinutes: number;
    services: Service[];
    bookings: Booking[];
  }
  