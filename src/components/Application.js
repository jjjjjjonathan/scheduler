import React, { Fragment, useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      const [days, appointments, instructors] = all;

      console.log(days, appointments, instructors);
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data }));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const parsedAppointments = dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />);

  const setDay = day => {
    setState(prev => ({ ...prev, day }));
  };

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        <>
          {parsedAppointments}
          <Appointment key="last" time="5pm" />
        </>
      </section>
    </main>
  );
}
