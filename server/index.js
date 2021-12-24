require("dotenv").config();

const express = require("express");
const expressListRoutes = require("express-list-routes");
const app = express();
const cors = require("cors");
const PORT = 3001;

const test = express.Router();

app.use(cors());
// Parsing data to json
app.use(express.json());

const db = require("./models");

// ! Routers
const postRouters = require("./routes/Posts");
app.use("/", postRouters);

const commentsRouters = require("./routes/Comments");
app.use("/comments", commentsRouters);

const usersRouters = require("./routes/Users");
app.use("/", usersRouters);
// ! End routers

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("---------------------------------------------------------");
        console.log(`Server is running on port ${PORT}`);
        expressListRoutes(app);
    });
});
