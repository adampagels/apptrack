# App Track

> An app for keeping track of job applications.

## What's In This Document

- [General Info](#general-info)
- [Technologies](#technologies)

## General Info

App Track is a native application created to combat clumsy Excel spreadsheets meant for tracking job applications. Login/Register screen and colour scheme inspired by https://dribbble.com/shots/6371155-Sign-in-Sign-up-UI.

Upon app load, users are brought to a login screen where they can also click a link to register an account.

<p align="center">
  <img  src= "src/assets/loginScreen.jpg" height="600"> <img  src= "src/assets/registerScreen.jpg" height="600'">
</p>

After being authenticated via firebase authentication, the user is taken to the home screen and is shown their jobs. If the user does not have any jobs added they will be prompted to do so.

<p align="center">
  <img  src= "src/assets/noJobs.jpg" height="600"> <img  src= "src/assets/multiJobs.jpg" height="600">
</p>

The user can delete an individual job by sliding the job card left and clicking the hidden "Delete" button.

<p align="center">
  <img  src= "src/assets/slideDeleteButton.jpg" height="600">
</p>

When the user presses the center button of the navbar they will be taken to a form in a modal that they can add a job with the details they submit.

<p align="center">
  <img  src= "src/assets/addJobScreen.jpg" height="600">
</p>

On the Profile screen the user will be shown their email, the date their account was created, and how many jobs they currently have entered. The profile screen also contains two buttons in which the user can delete all of their currently added jobs or deactivate their account. Each button will display an alert when pressed asking the user to confirm their action.

<p align="center">
  <img  src= "src/assets/profileScreen.jpg" height="600">
</p>

## Technologies

App Track is created with:

* React-Native
* CSS
* Redux
* Redux-Redux Hooks
* Redux-thunk
* Firebase
* React-Native-Swipe-List-View
* React-Navigation
* React-Navigation-Stack
* React-Navigation-Tabs
