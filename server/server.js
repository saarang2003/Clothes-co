const express = require('express');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth/auth-routes");
const cors = require('cors');
const app = express();

// Apply CORS before any route definitions
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

connectToDb;

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});