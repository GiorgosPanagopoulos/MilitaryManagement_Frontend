
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/el";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../axios";

moment.locale("el");
const localizer = momentLocalizer(moment);

interface TrainingEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

export default function TrainingCalendarPage() {
  const [events, setEvents] = useState<TrainingEvent[]>([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get("/training/calendar");

        const mappedEvents = response.data.map((training: any) => ({
          title: training.title,
          start: new Date(training.start),
          end: new Date(training.end),
          allDay: true,
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Σφάλμα κατά την ανάκτηση των εκπαιδεύσεων για το ημερολόγιο:", error);
      }
    };

    fetchTrainings();
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
