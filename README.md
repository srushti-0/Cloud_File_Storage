
# Cloud File Storage

A web application that allows users to upload files, view uploaded files, and download them through a simple interface.

## Features

- Upload files through a web interface
- View the list of uploaded files
- Download uploaded files
- Backend API for file handling
- Basic error handling for upload operations

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **File Uploads:** Multer
- **Other Tools:** Git, GitHub, dotenv, CORS

## Project Structure

```text
Cloud_Project/
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── uploads/
└── Frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

## How to Run the Project

1. Install Node.js.
2. Open a terminal in the `Backend` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the backend:

   ```bash
   node server.js
   ```

5. Open `Frontend/index.html` in your browser.
6. Upload a file and use the refresh and download options.

The backend runs on `http://localhost:5000`.

## Current Status

The application currently stores uploaded files on the local machine. AWS S3 cloud storage integration is a planned enhancement.

## Future Improvements

- Integrate AWS S3 for cloud-based file storage
- Add authentication and access control
- Improve file validation and security
- Deploy the application to a cloud environment