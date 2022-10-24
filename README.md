# Interview Scheduler

Interview Scheduler is a single-page app (SPA) built with React that allows users to book appointments with available interviewers, on Monday to Friday from 12:00-5:00pm. Users can choose the day and time slot they would like to create an appointment, and they can delete or update appointments with a new name or selecter interviewer.

With Web Sockets, users can also see real-time updates of the schedule when anyone creates, updates, or deletes an appointment. Data is stored on a PostgreSQL database.

October 24, 2022: now coverted to TypeScript!

## Stack

### Front-end

- React
- TypeScript
- Axios
- Sass

### Back-end

- Node.js
- Express
- WebSocket

### Database

- PostgreSQL

### Hosting services

- CircleCI
- Heroku
- Netlify

## Getting Started

### For visitors who want to use the app

- Click [here](https://zealous-montalcini-e57588.netlify.app/) to visit the deployed app on Netlify.

### For developers who want to run it locally

- Clone this repo, and run `npm install` to install dependencies.
- Clone the [scheduler-api repo](https://github.com/lighthouse-labs/scheduler-api) and follow the instructions there to set up the PostgreSQL database.
- Start the scheduler-api server with `npm start`.
- Start the scheduler client with `npm start`.

## Final Product

!["Screenshot of scheduler with appointment creation form"](https://github.com/jjjjjjonathan/scheduler/blob/main/docs/screenshots/scheduler1-home.png)

!["Screenshot of scheduler with delete conformation"](https://github.com/jjjjjjonathan/scheduler/blob/main/docs/screenshots/scheduler2-deleteconformation.png)

!["Screenshot of scheduler with saving transition"](https://github.com/jjjjjjonathan/scheduler/blob/main/docs/screenshots/scheduler3-savingtransition.png)

## Future Plans

- Implement some sort of cookies to only allow users to update or delete their own appointments (anyone can currently update or delete anything they want).
