[Link to the deploy](https://beamish-selkie-b4fbf3.netlify.app/)    

### This project was the final team task of the "Angular Course" from the Rolling Scopes community.

#  Project Management System

**Project management system** is an application that helps an individual in a team or group of developers achieve their goals.

## Application structure

- welcome page
- user login
- projects listing page
- selected project management page
- additional functionality(Filter, sort, toggle view for Boards on Main-page)

## Technical requirements

- localization (at least 2 languages)
- forms contain validation for compliance with the expected type (email, password, etc.)

## Application design requirements

- adaptive layout. The minimum page width of the application is 320px
- interactivity of elements users can interact with, changing the appearance of the element itself and the type of the cursor on hover, using different styles for the active and inactive state of the element, smooth animations
- the unity of styles of all pages of the application - the same fonts, button styles, indents, the same elements on all pages of the application have the same appearance and layout. Item colors and background images may vary. In this case, colors should be from the same palette, and background images from the same collection.

## Description of function blocks

### Welcome page(route)

- The welcome page display general information about the developer, project, and course.
- In the upper right corner there are 2 buttons Login and Sign up
- If there is an unexpired token, the user redirected to the "Main route" of the application automatically.
- When the token expires - the user redirected to the "Welcome page" automatically.
- Pressing the Login / Sign up button redirects the user to the route with the Login / Sign up form automatically.

### Header
- There are buttons in the header for authenticated users: edit profile, logout, create new board, and localization switcher.
- Edit profile redirect the user to a route with a form for edit profile. The requirements for the form are the same as for all forms in the application. There is a 'Delete User' button. In case of this action shown as a  "confirmation modal" then the user logged out, and the user should be removed from the database.
- Create a new board - opens a modal window with a form for creating a board. Requirements for the form are the same as for all forms in the application.

### Login / Sign up

- Form fields implemented in consistency with the backend API of the application. Validation implemented.
- Errors from the BE side - (Not found, unhandled rejection, etc) displayed in a user-friendly format (toast, pop-up, or something like this - up to your decision).
- Upon successful login, the user redirected to the "Main route"

### Main route

- Displays all created boards as a list.
- Boards are displayed with a small preview of the available information (title). By clicking on the element, the user redirects to the board item (Board route). There is a button to remove the board.
- When a user tries to delete the board, he/she receive a confirmation modal to verify if the user wants to delete the board (to avoid deleting the board by mistake). The confirmation modal a generic component (one for the application).
- global search (optional): search for a task by task number, name, users assigned to it, and by the text of the task description.

### Board route

- There is a button to create a column.
- If there is at least one column on the board, display the task creation button.
- To create a column and a task, display a form in the modal window.
- Requirements for the modal window and forms are described before.
- A task cannot be standalone and should be always bound to a column.
- The user can create multiple columns. The user can create an unlimited number of tasks. When overflowing with the number of tasks of the column - display scroll inside the column.
- If all columns do not fit on the screen, the page may have a horizontal scroll.
- The user can swap columns using drag-n-drop.
- The user can change the order of tasks columns using drag-n-drop.
- The user changes the belonging of the task to the column using drag-n-drop.
- By clicking on the task, you should open a modal window with the edit task form. The requirements for the form and window are the same everywhere.
- There is a 'delete task' button on the task. By clicking the 'delete task' the confirmation modal displayed, only after a user confirms the deletion - delete the task.
- At the top of the column displayed the title. When you click on it, it convert text into input, there are 'cancel' and 'submit' buttons to the left of input. After entering text in the input and clicking submit - the title of the column updated with the entered text.
- The column have a 'delete column' button. Clicking on 'delete column' open the confirmation modal, only after the user confirms the deleting - delete the column.
- Deleting a column removes the tasks associated with it from the BD automatically.
- There is a "back" button to return to the main route
