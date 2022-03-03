# Interview Scheduler

Interview Scheduler is a single-page app (SPA) built with React that allows users to book appointments with available interviewers, on Monday to Friday from 12:00-5:00pm. Users can choose the day and time slot they would like to create an appointment, and they can delete or update appointments with a new name or selecter interviewer.

With Web Sockets, users can also see real-time updates of the schedule when anyone creates, updates, or deletes an appointment. Data is stored on a PostgreSQL database.

## Stack

### Front-end

- React
- Axios
- Sass

### Back-end

- Node.js
- Express
- WebSocket

### Database

- PostgreSQL

### Testing

- Jest
- Cypress

### Component design

- Storybook

### Hosting services

- CircleCI
- Heroku
- Netlify

## Getting Started

## Final Product

!["Screenshot of scheduler with appointment creation form"](https://github.com/jjjjjjonathan/scheduler/blob/main/docs/screenshots/scheduler1-home.png)

!["Screenshot of scheduler with delete conformation"](https://github.com/jjjjjjonathan/scheduler/blob/main/docs/screenshots/scheduler2-deleteconformation.png)

!["Screenshot of scheduler with saving transition"](https://github.com/jjjjjjonathan/scheduler/blob/main/docs/screenshots/scheduler3-savingtransition.png)

## Future Plans

- Implement some sort of cookies to only allow users to update or delete their own appointments (anyone can currently update or delete anything they want).
