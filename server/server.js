const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDb = require("./dbconfig");
const UserRoutes = require("./routes/UserRoutes");
const WorkerRoutes = require("./routes/WorkerRoutes");
const RequestRoutes = require("./routes/RequestRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const ServiceRoutes = require("./routes/ServiceRouter");
const isAdmin = require("./middleware/isAdmin");
const cron = require("node-cron");
const app = express();

//parse the data
app.use(express.json());

//use cors
app.use(cors({ origin: "*" }));

//config dotenv
dotenv.config();
  
// connect database
ConnectDb();

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/workers", WorkerRoutes);
app.use("/api/v1/request", RequestRoutes);
app.use("/api/v1/services", ServiceRoutes);

// use with middleware
app.use("/api/v1/admin", AdminRoutes);

cron.schedule("*/5 * * * *", () => {
  https.get(RENDER_URL, (res) => {
    console.log(`[${new Date().toISOString()}] Ping successful:`, res.statusCode);
  }).on("error", (err) => {
    console.error(`[${new Date().toISOString()}] Ping failed:`, err.message);
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
