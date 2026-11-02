export const BUSINESS_WHATSAPP = '2977308583';
export const BUSINESS_EMAIL = 'm.petronilia@arubahighmaintenance.com';
export const APPOINTMENT_TIMES = [
  '08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM',
];

// Bookings follow the business's calendar, even when visitors are overseas.
export function earliestAppointmentDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Aruba', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) => parts.find(item => item.type === type)!.value;
  const tomorrow = new Date(`${part('year')}-${part('month')}-${part('day')}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

export function isValidAppointment(date: string, time: string, now = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
    && date >= earliestAppointmentDate(now) && APPOINTMENT_TIMES.includes(time);
}

interface AppointmentRequest {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

export function appointmentLinks(request: AppointmentRequest) {
  const message = [
    'Appointment request — Aruba High Maintenance',
    `Service: ${request.service}`,
    `Preferred date: ${request.date}`,
    `Preferred time: ${request.time} (Aruba time)`,
    `Name: ${request.name}`, `Phone: ${request.phone}`, `Email: ${request.email}`,
    `Site address: ${request.address}`, `Project details: ${request.description}`,
    '', 'Please confirm availability for this appointment.',
  ].join('\n');
  return {
    whatsapp: `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`,
    email: `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent('Appointment request — Aruba High Maintenance')}&body=${encodeURIComponent(message)}`,
  };
}
