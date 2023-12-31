const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expenseRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/expenses",expenseRoutes);

sequelize.sync()
    .then(result => {
        app.listen(4000)
    })
    .catch(err => {
        console.log(err)
    })
