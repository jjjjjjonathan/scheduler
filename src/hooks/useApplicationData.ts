import { useEffect, useReducer } from "react";
import axios from "axios";
import { SetDayAction, SetApplicationDataAction, SetInterviewAction } from "../helpers/actionTypes";
import { State, Interview, Appointment } from "../helpers/stateTypes";

const useApplicationData = (): { state: State, setDay: Function, bookInterview: Function, deleteInterview: Function } => {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducers: {
    [name: string]: Function
  } = {
    SET_DAY(state: State, action: SetDayAction): State {
      return {
        ...state,
        day: action.day
      };
    },
    SET_APPLICATION_DATA(state: State, action: SetApplicationDataAction): State {
      return {
        ...state,
        days: action.days.data,
        appointments: action.appointments.data,
        interviewers: action.interviewers.data
      };
    },
    SET_INTERVIEW(state: State, action: SetInterviewAction): State {
      const appointments = {
        ...state.appointments,
        [action.id]: {
          ...state.appointments[action.id],
          interview: (action.interview ? { ...action.interview } : null)
        },
      };
      const updateSpots = (state: State, appointments: { [id: number]: Appointment }, id: number) => (
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

  type Action = | SetDayAction | SetApplicationDataAction | SetInterviewAction

  const reducer = (state: State, action: Action): State => {
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

  const setDay = (day: string) => {
    dispatch({ type: SET_DAY, day });
  };

  const bookInterview = (id: number, interview: Interview) => {
    return axios.put(`/api/appointments/${id}`, { interview });
  };

  const deleteInterview = (id: number) => {
    return axios.delete(`api/appointments/${id}`);
  };

  // Real-time updates of schedule using web sockets
  useEffect(() => {
    const wsUrl: string = process.env.REACT_APP_WEBSOCKET_URL as string

    const ws = new WebSocket(wsUrl);
    ws.onmessage = (updateSchedule) => {
      const appointment = JSON.parse(updateSchedule.data);
      if (appointment.type === "SET_INTERVIEW") {
        dispatch({ type: SET_INTERVIEW, id: appointment.id, interview: appointment.interview });
      }
    };
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData