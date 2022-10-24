export type Interviewer = {
  id: number;
  name: string;
  avatar: string
}

export type InterviewBeforeConversion = {
    student: string;
    interviewer: number;
}

export type Interview = {
  student: string;
  interviewer: Interviewer
}

export type Day = {
  id: number;
  name: string;
  appointments: number[];
  interviewers: number[];
  spots: number
}

export type Appointment = {
  id: number;
  time: string;
  interview: InterviewBeforeConversion | null;
}

export type AppointmentAfterConversion = {
  id: number;
  time: string;
  interview: Interview | null
}

export type State = {
  day: string;
  days: Day[];
  appointments: { [id: number]: Appointment };
  interviewers: { [id: number]: Interviewer }
}