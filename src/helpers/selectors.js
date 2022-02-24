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

const getInterviewersForDay = (state, day) => {
  const selectedDay = state.days.find(dayName => dayName.name === day);
  return (selectedDay ? selectedDay.interviewers.map(intId => state.interviewers[intId]) : []);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };