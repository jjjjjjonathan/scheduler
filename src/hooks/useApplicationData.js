import { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { ...appointment })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
        updateSpots(id, -1);
      }
      );
  };

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`api/appointments/${id}`, { ...appointment })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
        updateSpots(id, 1);
      }
      );
  };

  const updateSpots = (id, num) => {
    setState((prev) => ({
      ...prev,
      days: prev.days.map(day => day.appointments.includes(id) ? { ...day, spots: day.spots + num } : day)
    }));
  };

  return { state, setDay, bookInterview, deleteInterview };
};