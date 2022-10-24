import { MouseEventHandler, ReactNode } from "react";
import { Interviewer, Interview, Day } from "./stateTypes";

export type ConfirmProps = {
  message: string;
  onConfirm: Function;
  onCancel: MouseEventHandler;
  id?: number
}

export type EmptyProps = {
  onAdd: MouseEventHandler;
}

export type ErrorProps = {
  message: string;
  onClose: MouseEventHandler
}

export type FormProps = {
  student?: string;
  interviewers?: Interviewer[];
  onSave: Function;
  onCancel: Function;
  interviewer?: number
}

export type HeaderProps = {
  time: string;
}

export type AppointmentProps = {
  time: string;
  interview?: Interview | null;
  interviewers?: Interviewer[];
  bookInterview?: Function;
  id?: number;
  deleteInterview?: Function
}

export type ShowProps = {
  student: string;
  interviewer: Interviewer;
  onEdit: MouseEventHandler;
  onDelete: Function;
  id?: number
}

export type StatusProps = {
  message: string
}

export type ButtonProps = {
  onClick: MouseEventHandler;
  confirm: boolean;
  danger: boolean;
  disabled: boolean;
  children: ReactNode
}

export type DayListProps = {
  days: Day[];
  onChange: Function;
  value: string
}

export type DayListItemProps = {
  selected: boolean;
  spots: number;
  dayName: string;
  setDay: MouseEventHandler
}

export type InterviewerListProps = {
  interviewers?: Interviewer[];
  value: number | null;
  onChange: Function
}

export type InterviewerListItemProps = {
  name: string;
  avatar: string;
  selected: boolean;
  setInterviewer: MouseEventHandler;
}