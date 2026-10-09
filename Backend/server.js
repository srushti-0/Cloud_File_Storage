const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
    res.send("Cloud File Storage API is running");
});

app.post("/upload", (req, res, next) => {
    upload.single("file")(req, res, (err) => {
        if (err) return next(err);

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        console.log("File received:", req.file.originalname);
        console.log("Saved at:", req.file.path);

        res.json({
            message: "File uploaded successfully",
            filename: req.file.originalname
        });
    });
});

app.use((err, req, res, next) => {
    console.error("Upload error:", err.message);
    res.status(500).json({
        message: "Upload failed: " + err.message
    });
});

const PORT = process.env.PORT || 5000;
app.get("/files", (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({
                message: "Could not retrieve files"
            });
        }

        res.json(files);
    });
});
app.get("/download/:filename", (req, res) => {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    res.download(filePath);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});