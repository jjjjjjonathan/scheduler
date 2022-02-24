const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find(dayName => dayName.name === day);
  return (selectedDay ? selectedDay.appointments.map(apptId => state.appointments[apptId]) : []);
};

const getInterview = (state, interview) => {
  return (interview ? {
    "student": interview.student,
    "interviewer": {
      "id": state.interviewers[interview.interviewer].id,
      "name": state.interviewers[interview.interviewer].name,
      "avatar": state.interviewers[interview.interviewer].avatar
    }
  } : null);
};

export { getAppointmentsForDay, getInterview };