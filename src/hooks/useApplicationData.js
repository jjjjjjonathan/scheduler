import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default () => {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return;
      case SET_APPLICATION_DATA:
        return;
      case SET_INTERVIEW:
        return;
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  };

  const [state, dispatch] = useReducer(reducer, initialState);






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