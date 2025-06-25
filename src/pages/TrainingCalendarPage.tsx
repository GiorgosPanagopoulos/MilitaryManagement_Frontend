import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/el";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Ρύθμιση ελληνικής γλώσσας
moment.locale("el");
const localizer = momentLocalizer(moment);

// Δημιουργία τύπου για events
interface TrainingEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

export default function TrainingCalendarPage() {
  const [events, setEvents] = useState<TrainingEvent[]>([]);

  useEffect(() => {
    setEvents([
      {
        title: "Βασική Εκπαίδευση",
        start: new Date("2024-01-10"),
        end: new Date("2024-01-20"),
        allDay: true,
      },
      {
        title: "Εξειδίκευση Radar",
        start: new Date("2024-03-01"),
        end: new Date("2024-03-10"),
        allDay: true,
      },
      {
        title: "Σχολείο Ηλεκτρονικού Πολέμου",
        start: new Date("2024-05-15"),
        end: new Date("2024-05-25"),
        allDay: true,
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ημερολόγιο Εκπαιδεύσεων</h2>
      <div className="bg-white p-4 rounded shadow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}
