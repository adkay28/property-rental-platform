# Property Rental Platform(NextStop)

> Work in Progress

A full-stack web application that allows users to view, create, edit, and delete property rental listings, with support for user-generated reviews.

**Live Demo:** https://next-stop-dgbz.onrender.com/

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Validation:** Joi (Server-side)
- **Frontend:** EJS (Embedded JavaScript), HTML5, Bootstrap
- **Authentication:** Passport.js (Local Strategy)
- **Mapping:** MapTiler, Leaflet.js
- **Deployment:** Render

## About the Project

### Key Features

- **Listings Management:** View, create, update, and delete property listings with image support.
- **Reviews System:** Users can submit ratings and reviews for any listing.
- **Interactive Maps:** View Property location on a map using MapTiler and Leaflet.js.
- **Response Alerts:** Used connect-flash and express-session to create alerts for CRUD operations.
- **User Authentication:** Implemented signup and login functionality using Passport.js.
- **Cloud Image Storage:** Uploaded property images are stored securely in the cloud using Cloudinary.
- **Cascading Deletes:** When a property listing is deleted, the server deletes all associated reviews.

### Security

- **Client-Side Validation:** Form inputs are validated in the browser using Bootstrap’s custom validation styles.
- **Server-Side Validation:** All incoming HTTP requests are validated using Joi schemas.
- **Asynchronous Safety:** Used `wrapAsync` globally to manage errors in asynchronous database operations.
- **Custom Error Routing:** Error handler serves EJS error pages for database failures or invalid route requests.

## Local Installation & Setup

To run this project locally on your machine, follow these steps:

**1. Clone the repository:**
```bash
git clone https://github.com/adkay28/property-rental-platform.git
cd property-rental-platform
```

**2. Install dependencies:**

Because of a peer dependency with the Cloudinary storage package, run the install command with the legacy peer dependencies flag:
```bash
npm install --legacy-peer-deps
```

**3. Set up Environment Variables:**

Create a `.env` file in the root directory of the project and add the following keys:
```env
PORT=8080
ATLASDB_URL=<your_mongodb_atlas_url>
SECRET=<your_session_secret>
MAP_API_KEY=<your_maptiler_api_key>
CLOUD_NAME=<your_cloudinary_name>
CLOUD_API_KEY=<your_cloudinary_api_key>
CLOUD_API_SECRET=<your_cloudinary_secret>
```

**4. Run the application:**
```bash
node app.js
```

**5. View in browser:**
Open your browser and go to `http://localhost:8080`.
