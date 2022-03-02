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
      return {
        ...state,
        appointments: action.appointments,
        days: action.days
      };
    }
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
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
        dispatch({ type: SET_INTERVIEW, appointments, days: updateSpots(state, appointments, id) });
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
        dispatch({ type: SET_INTERVIEW, appointments, days: updateSpots(state, appointments, id) });
      }
      );
  };

  const updateSpots = (state, appointments, id) => (
    state.days.map(day => day.appointments.includes(id) ? {
      ...day,
      spots: day.appointments.filter(spot => !appointments[spot].interview).length
    } : day)
  );

  return { state, setDay, bookInterview, deleteInterview };
};