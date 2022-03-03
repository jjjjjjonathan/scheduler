import { useEffect, useReducer } from "react";
import axios from "axios";

export default () => {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducers = {
    SET_DAY(state, action) {
      return {
        ...state,
        day: action.day
      };
    },
    SET_APPLICATION_DATA(state, action) {
      return {
        ...state,
        days: action.days.data,
        appointments: action.appointments.data,
        interviewers: action.interviewers.data
      };
    },
    SET_INTERVIEW(state, action) {
      const appointments = {
        ...state.appointments,
        [action.id]: {
          ...state.appointments[action.id],
          interview: (action.interview ? { ...action.interview } : null)
        },
      };
      const updateSpots = (state, appointments, id) => (
        state.days.map(day => day.appointments.includes(id) ? {
          ...day,
          spots: day.appointments.filter(spot => !appointments[spot].interview).length
        } : day)
      );
      return {
        ...state,
        appointments,
        days: updateSpots(state, appointments, action.id)
      };
    }
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers
      });
    });
  }, []);

  const setDay = (day) => {
    dispatch({ type: SET_DAY, day });
  };

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview });
  };

  const deleteInterview = (id) => {

    return axios.delete(`api/appointments/${id}`);
  };



  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onmessage = updateInterview => {
      const appointment = JSON.parse(updateInterview.data);
      if (appointment.type === "SET_INTERVIEW") {
        dispatch({ type: SET_INTERVIEW, id: appointment.id, interview: appointment.interview });
      }
    };
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
};