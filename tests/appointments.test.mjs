import test from 'node:test';
import assert from 'node:assert/strict';
import { earliestAppointmentDate, isValidAppointment, appointmentLinks } from '../src/utils/appointments.ts';

test('blocks today and the past while allowing tomorrow at 8 AM', () => {
  const now = new Date('2026-11-02T17:35:00Z'); // 1:35 PM in Aruba
  assert.equal(earliestAppointmentDate(now), '2026-11-03');
  assert.equal(isValidAppointment('2026-11-01', '08:00 AM', now), false);
  assert.equal(isValidAppointment('2026-11-02', '08:00 AM', now), false);
  assert.equal(isValidAppointment('2026-11-02', '04:30 PM', now), false);
  assert.equal(isValidAppointment('2026-11-03', '08:00 AM', now), true);
});

test('uses Aruba midnight and revalidates stale selections', () => {
  const before = new Date('2026-11-03T03:59:59Z');
  const after = new Date('2026-11-03T04:00:00Z');
  assert.equal(earliestAppointmentDate(before), '2026-11-03');
  assert.equal(earliestAppointmentDate(after), '2026-11-04');
  assert.equal(isValidAppointment('2026-11-03', '08:00 AM', before), true);
  assert.equal(isValidAppointment('2026-11-03', '08:00 AM', after), false);
});

test('handles month/year boundaries and leap years', () => {
  assert.equal(earliestAppointmentDate(new Date('2026-12-31T12:00:00Z')), '2027-01-01');
  assert.equal(earliestAppointmentDate(new Date('2028-02-28T12:00:00Z')), '2028-02-29');
  assert.equal(earliestAppointmentDate(new Date('2028-02-29T12:00:00Z')), '2028-03-01');
});

test('rejects missing/invalid dates and unsupported times', () => {
  const now = new Date('2026-11-02T17:35:00Z');
  for (const date of ['', 'garbage', '2026-13-03', '2027-02-30', '2026-2-3']) {
    assert.equal(isValidAppointment(date, '08:00 AM', now), false);
  }
  assert.equal(isValidAppointment('2026-11-03', '', now), false);
  assert.equal(isValidAppointment('2026-11-03', '02:00 AM', now), false);
});

test('both channels include every request detail and encode special characters', () => {
  const request = {
    service: 'Painting & Weatherproofing', date: '2026-11-03', time: '08:00 AM',
    name: 'José & Jane', phone: '+297 123 4567', email: 'jane+home@example.com',
    address: 'House #5, Aruba', description: 'Repair roof & paint\nArea: 50% exterior?',
  };
  const links = appointmentLinks(request);
  const whatsapp = new URL(links.whatsapp);
  const email = new URL(links.email);
  assert.equal(whatsapp.origin, 'https://wa.me');
  assert.equal(whatsapp.pathname, '/2977308583');
  assert.equal(email.pathname, 'm.petronilia@arubahighmaintenance.com');
  const message = whatsapp.searchParams.get('text');
  assert.equal(email.searchParams.get('body'), message);
  for (const value of Object.values(request)) assert.ok(message.includes(value));
  assert.ok(message.includes('(Aruba time)'));
  assert.ok(message.includes('Please confirm availability'));
  assert.ok(email.searchParams.get('subject').includes('Appointment request'));
});
