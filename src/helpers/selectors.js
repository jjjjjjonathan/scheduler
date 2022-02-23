const getAppointmentsForDay = (state, day) => {
  const correctDay = state.days.find(dayName => dayName.name === day);
  return (correctDay ? correctDay.appointments.map(apptId => state.appointments[apptId]) : []);
};

export { getAppointmentsForDay };