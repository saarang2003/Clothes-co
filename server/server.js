const express = require("express");
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/product-routes");
const shopProductsRouter = require("./routes/shop/product-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopReviewRouter = require('./routes/shop/review-routes')
const commonFeatureRouter = require("./routes/common/feature-routes");
const shopAddressRouter = require('./routes/shop/address-routes');

const cors = require("cors");
const app = express();

// Apply CORS before any route definitions
app.use(
  cors({
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
  })
);

app.use(express.json());
app.use(cookieParser());

connectToDb;

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use('/api/shop/address' , shopAddressRouter);

app.use("/api/common/feature", commonFeatureRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
