const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/utils", require("./routes/api/utils"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/contacts", require("./routes/api/contacts"));
app.use("/api/messages", require("./routes/api/messages"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});
