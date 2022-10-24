import { Interview, InterviewBeforeConversion } from "./stateTypes";

export type SetDayAction = {
  type: string;
  day: string
}

export type SetApplicationDataAction = {
  type: string;
  days: any;
  appointments: any;
  interviewers: any;
}

export type SetInterviewAction = {
  type: string;
  id: number;
  interview: InterviewBeforeConversion | null
}