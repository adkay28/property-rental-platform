# Property Rental Platform

> Work in Progress

A full-stack web application that allows users to view, create, edit, and delete property rental listings.

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Validation:** Joi(Server-side)
* **Frontend:** EJS(Embedded JavaScript), HTML5, Bootstrap
* **Routing:** RESTful API architecture

## Current Features

### Key Features
* **View Listings:** Search the full database of rental properties with pictures, descriptions and pricing.
* **Detailed Views:** Click on individual properties to see their detailed information.
* **Create:** Add new properties to the database using an interactive form.
* **Update:** Edit existing property details dynamically.
* **Delete:** Remove properties from the database completely.

### Security & Reliability
* **Client-Side Validation:** Form inputs are validated on the browser with Bootstrap’s custom validation styles to ensure required data is present before submitting.
* **Server-Side Validation:**  Any incoming HTTP request is validated with Joi before it reaches the database.
* **Asynchronous Error Handling:** Wrap all database operations with wrapAsync to ensure the server does not crash.
* **Custom Error Routing:** Send the users a custom styled error page for both database errors and invalid route requests.
