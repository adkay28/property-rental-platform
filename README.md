# Property Rental Platform

> Work in Progress

A full-stack web application that allows users to view, create, edit, and delete property rental listings, with support for user-generated reviews.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Validation:** Joi (Server-side)
- **Frontend:** EJS (Embedded JavaScript), HTML5, Bootstrap
- **Authentication:** Passport.js (Local Strategy)

## Current Features

### Key Features

- **Listings Management:** View, create, update, and delete property listings with image support.
- **Reviews System:** Users can submit ratings and reviews for any listing.
- **Cascading Deletes:** When a property listing is deleted, the server deletes all associated reviews.
- **One-to-Many Relationships:** Used Mongoose ObjectId references to link reviews directly to the specific listings.
- **Response Alerts:** Used connect-flash and express-session to create alerts for CRUD operations.
- **User Authentication:** Implemented signup and login functionality using Passport.js.

### Security

- **Client-Side Validation:** Form inputs are validated in the browser using Bootstrap’s custom validation styles.
- **Server-Side Validation:** All incoming HTTP requests are validated using Joi schemas.
- **Asynchronous Safety:** Used `wrapAsync` globally to manage errors in asynchronous database operations.
- **Custom Error Routing:** Error handler serves EJS error pages for database failures or invalid route requests.
