# Offboarding

## How to Run

1. **Clone the repository**
    ```sh
    git clone git@github.com:yaahor/offboarding.git
    cd offboarding
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Run the mock server**
    ```sh
    npm run mock-server
    ```

4. **Start the Angular application**
    ```sh
    npm run start
    ```

5. **Open in the browser** [http://localhost:4200](http://localhost:4200)


## Notes

- The project **is not fully styled**; styles can be improved if needed.
- The **mock server has a 2-second delay** to simulate a slow connection.
- For **state management**, **ready-made solutions** can be used if required. In this case, a simple implementation using **BehaviorSubject** has been implemented.
- - **Tests have been added for `UserApiService` and `UserService`** just as an example.


## Description

### Pages:
- **Dashboard Page**
  - A search field allows users to search for employees in the table by name and department.
  - The filtering process uses `toLowerCase()` for **case-insensitive comparison**.
  - A debounce mechanism is implemented to **prevent excessive filtering on each keystroke**.
  - `<a>` tags are used as table rows for **better usability** (e.g., opening in a new tab).
  - **Column sorting** was initially implemented based on a triangle icon in the example screen but was later **removed** as it wasn't required.
  - **Virtual scroll, pagination, or infinite scroll** can be added to the employee table if required.
  - **Loading spinner** is displayed while data is being fetched.
  - **Error message** is shown if there is an issue loading the data.


- **Employee Details Page**
  - Includes a **Back button** that navigates the user back to the **Dashboard Page**.
  - The **Offboard button** is displayed if the user status is **active**.
  - For offboarded users, the button is **hidden**, or instead, the message **"User is offboarded"** is displayed.
  - **Loading spinner** is displayed while data is being fetched.
  - **Error message** is shown if there is an issue loading the data.

## Features

- **Offboarding Dialog**
  - All fields are required and validated, except for the **Notes** field.
  - After pressing the **Confirm** button, a request is sent to offboard the employee.
  - While the request is being processed, a **loading spinner** is displayed.
  - If there is an error, an **error message** is shown.
  - After a successful offboarding, the user is navigated back to the **Dashboard Page**.
  - The **employee list** is updated without the need to reload the page.
  - The offboarding **form is simple** but can be improved if necessary (e.g., adding a **select for countries**, validation depending on already filled fields, etc.).

