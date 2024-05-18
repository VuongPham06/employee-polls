## Dev environment

1. NodeJS version 20
2. React version 18.3.1
3. Vite 5.2.10

## Getting started

1. To get started,install [Nodejs](https://nodejs.org/en), then run following command:
2. `npm install` to build
3. `npm run dev` to run web app
4. `npm test` to run test

## About unit test

1. Two unit tests must be present for _saveQuestion(): App.test.tsx with 'Test save question function'
2. Two unit tests must be present for _saveQuestionAnswer(): App.test.tsx with 'Test save question answer function'
3. One test must call the toMatchSnapshot() function: LoginForm.test.tsx with 'Snapshot test for LoginForm: should match snapshot'

## Project Overview

An application that employees can use internally. In order to improve collaboration and transparency within the company, every employee can access the application and create a poll with two proposed solutions. Employees can then vote on these solutions and see which solutions have the most votes. In addition, HR has requested you have a dashboard that lists every employee ordered by the number of polls they've created and answered. To give employees incentive to use your application, HR will give a prize each quarter for the top employees who have created and answered the most polls.

In the "Employee Polls" Project, An employee create polls for coworkers. The process goes like this: An employee is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is not possible.

Users will be able to answer polls, see which polls they haven’t answered, see how other people have voted, post polls, and see the ranking of users on the leaderboard.

## App Functionality

The person using application should have a way of impersonating/logging in as an existing user. Application should work correctly regardless of which user is selected. Once the user logs in, the home page should be shown.

Information about the logged in user should appear on the page. If someone tries to navigate anywhere by entering the address in the address bar, the user is asked to sign in and then the requested page is shown. The application allows the user to log out and log back in.

Once the user logs in, the user should be able to toggle between his/her answered and unanswered polls on the home page, which is located at the root. The polls in both categories are arranged from the most recently created (top) to the least recently created (bottom). The unanswered polls should be shown by default, and the name of the logged in user should be visible on the page.

What would be the point of seeing answered and unanswered polling questions if we couldn’t actually vote or see the results? Each polling question should link to the details of that poll. The details of each poll should be available at questions/:question_id.

When a poll is clicked on the home page, the following is shown:

Text “Would You Rather”;
Avatar of the user who posted the polling question; and
Two options.
For answered polls, each of the two options contains the following:

Text of the option;
Number of people who voted for that option; and
Percentage of people who voted for that option.
The option selected by the logged-in user should be clearly marked.

The application should show a 404 page if the user is trying to access a poll that does not exist. It should also display a navigation bar so that the user can easily navigate anywhere in the application.

Upon voting in a poll, all of the information of an answered poll should be displayed. The user’s response should be recorded and clearly visible on the poll details page. Users can only vote once per poll; they shouldn’t be allowed to change their answer after they’ve voted -- no cheating allowed! When the user comes back to the home page, the polling question should appear in the “Answered” column.

The form for posting new polling questions should be available at the /add route. The application should show the text “Would You Rather” and have a form for creating two options. Upon submitting the form, a new poll should be created, the user should be taken to the home page, and the new polling question should appear in the correct category on the home page.

The application should have a leaderboard that’s available at the /leaderboard route. Each entry on the leaderboard should contain the following:

User’s name;
User’s picture;
Number of questions the user asked; and
Number of questions the user answered
Users should be ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered. The more questions you ask and answer, the higher up you move.

The user should be able to navigate to the leaderboard, to a specific question, and to the form that allows the user to create a new poll both from within the app and by typing in the address into the address bar. To make sure we’re showing the data that is relevant to the user, the application should require the user to be signed in order to access those pages.

## App Architecture

For this application, most of the application’s state should be managed by Redux. 
Application’s store should be the source of truth, and components should read the necessary state from the store instead of having their own versions of the same state. There should be no direct API calls in components’ lifecycle methods, and updates should be triggered by dispatching action creators.

Application’s code should be structured and organized in a logical way, and components should be modular and reusable.

## Unit Testing

10 unit tests for the project:

1. For the api.ts file, write an async unit test for saveQuestion to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.
2. For the api.ts file, write an async unit test for saveQuestion to verify that an error is returned if incorrect data is passed to the function.
3. For the api.ts file, write an async unit test for saveQuestionAnswer to verify that the saved question answer is returned and all expected fields are populated when correctly formatted data is passed to the function.
4. For the api.ts file, write an async unit test for saveQuestionAnswer to verify that an error is returned if incorrect data is passed to the function.
5. Write snapshot test for LoginForm file.
6. Write DOM test for LoginForm file which uses the fireEvent function. Use fireEvent.change() to add text to an input field or select an option in a dropdown. After doing this, verify the UI changed in some way using the expect() method from jest.
7. On the login page, verify that a user name field, password field, and submit button are present on the page.
8. Verify that a user entering an incorrect username or password and clicking submit will see an error on the page.
9. Verify that the leaderboard is displaying the correct user name, number of questions asked, and number of questions answered.
10. Verify the navigation bar displays all expected links.