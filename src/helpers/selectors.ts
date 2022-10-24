import { State, Interview, InterviewBeforeConversion } from "./stateTypes";

const getAppointmentsForDay = (state: State, day: string) => {
  const selectedDay = state.days.find(dayName => dayName.name === day);
  return (selectedDay ? selectedDay.appointments.map(apptId => state.appointments[apptId]) : []);
};

const getInterview = (state: State, interview: InterviewBeforeConversion | null): Interview | null => {
  return (interview ? {
    "student": interview.student,
    "interviewer": {
      "id": state.interviewers[interview.interviewer].id,
      "name": state.interviewers[interview.interviewer].name,
      "avatar": state.interviewers[interview.interviewer].avatar
    }
  } : null);
};

const getInterviewersForDay = (state: State, day: string) => {
  const selectedDay = state.days.find(dayName => dayName.name === day);
  return (selectedDay ? selectedDay.interviewers.map(id => state.interviewers[id]) : []);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };