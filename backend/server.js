const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const app = express();
// Enable CORS
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://adarshapoojary826:Adarsh123@cluster0.f9kxuqx.mongodb.net/cattle-disease?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);


// Routes
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Missing fields");

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).send("User created");
    } catch (err) {
        if (err.code === 11000) return res.status(400).send("Username already exists");
        res.status(500).send("Server error");
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Missing fields");

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid username or password");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("Invalid username or password");

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
    res.json({ token });
});



// upload pages
const upload = multer({ dest: "uploads/" }); // Save uploaded images to 'uploads/' folder

// Endpoint to handle image uploads
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const imagePath = req.file.path; // Path to the uploaded image

        // Prepare the image to send to the Flask API
        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));


        // Make a POST request to the Flask API
        const flaskResponse = await axios.post("http://127.0.0.1:5001/predict", formData, {
            headers: formData.getHeaders(),
        });

        // Return the prediction response from the Flask API
        res.send(flaskResponse.data);
    } catch (error) {
        console.error("Error communicating with Flask API:", error.message);
        res.status(500).send({ error: "Failed to process the image" });
    }
});

// Start the Node.js server
app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
