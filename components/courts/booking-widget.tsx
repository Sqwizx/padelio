'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const timeSlots = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'];

export function BookingWidget() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [players, setPlayers] = useState('2');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) {
      toast.error('Please select a date and time slot.');
      return;
    }
    toast.success(`Court requested for ${date} at ${time} — we'll confirm shortly!`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-8 flex flex-col gap-5"
      style={{ background: 'white', boxShadow: 'var(--shadow-elevated)' }}
    >
      <h3
        className="text-xl font-bold"
        style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
      >
        Request a Court
      </h3>

      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          Date
        </label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
          style={{ borderColor: 'var(--color-border)' }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          Time Slot
        </label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className="px-2 py-2 rounded-lg text-sm font-medium border transition-all"
              style={{
                borderColor: time === t ? '#3DD68C' : 'var(--color-border)',
                background: time === t ? 'rgba(61,214,140,0.12)' : 'white',
                color: time === t ? '#166534' : 'var(--color-text)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          Players
        </label>
        <select
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'player' : 'players'}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
        style={{ background: '#3DD68C', color: '#1C1C1A' }}
      >
        Request Booking
      </button>
    </form>
  );
}
