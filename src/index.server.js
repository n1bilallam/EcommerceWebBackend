const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const orderUpdateRoute = require("./routes/admin/order.route");

//environment variable
env.config();

//mongodb connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.oldtw.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Db connected -_-");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var whiteList = [
//   process.env.ADMIN_URL,
//   process.env.CLIENT_URL,
//   process.env.PUBLIC_IMG,
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by Admin"));
//     }
//   },
// };

if (process.env.NODE_ENV === "development") {
  app.use(cors());
  app.use(morgan("dev"));
}

//Routes
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", orderUpdateRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
